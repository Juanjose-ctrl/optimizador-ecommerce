// src/app/components/FileDropzone.js - COMPONENTE FUNCIONAL DE OPTIMIZACIÓN

'use client'; 
import { useState, useRef } from 'react';
import { UploadCloud, FileImage, Trash2, XCircle, CheckCircle, Package } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

// --- Configuración de la API y Límites ---
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];


/**
 * Componente Dropzone para la carga y optimización de archivos.
 * * @param {boolean} isAuthenticated - Indica si el usuario está logueado (true en Dashboard, false en Landing).
 * @param {function} onLimitReached - Callback a ejecutar si se recibe un error 402 (solo para Landing Page).
 * @param {number} initialCredits - Créditos iniciales (Free Tier: 5) para mostrar en la Landing.
 * @param {function} onOptimizeStart - Callback para actualizar créditos en el Dashboard (opcional).
 */
export default function FileDropzone({ 
    isAuthenticated = false, 
    onLimitReached = () => {}, 
    initialCredits = 0,
    onOptimizeStart = () => {} 
}) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState('');
    const [optimizationResult, setOptimizationResult] = useState(null); // Para almacenar el resultado de la optimización
    const fileInputRef = useRef(null);
    const router = useRouter();

    // Determina los créditos restantes a mostrar (solo visible en Landing)
    const [freeCreditsRemaining, setFreeCreditsRemaining] = useState(isAuthenticated ? initialCredits : 5);


    // --- Utilidades ---

    const validateFile = (file) => {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return `Tipo no soportado: ${file.name}. Solo JPEG y PNG.`;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `Archivo demasiado grande: ${file.name}. Máximo ${MAX_FILE_SIZE_MB}MB.`;
        }
        return null;
    };
    
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // --- Manejo de archivos y Drag/Drop ---

    const handleFiles = (newFiles) => {
        setFileError('');
        setOptimizationResult(null); // Limpiar resultado anterior
        let validFiles = [];
        let hasError = false;

        for (const file of newFiles) {
            const validationError = validateFile(file);
            if (validationError) {
                setFileError(validationError);
                hasError = true;
                break; 
            }
            if (!files.some(f => f.name === file.name)) {
                validFiles.push(file);
            }
        }

        if (!hasError) {
            // Permitir solo 1 archivo si no está logueado y solo si usa el Free Tier
            const limit = isAuthenticated ? 10 : 1; 
            setFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, limit)); 
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleSelectFiles = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const removeFile = (fileName) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
        setFileError('');
        setOptimizationResult(null);
    };

    // --- Lógica de Optimización (CRÍTICA) ---
    
    const handleOptimize = async () => {
        if (files.length === 0) return;
        setFileError('');
        setOptimizationResult(null);

        const fileToOptimize = files[0]; // Por ahora, solo optimizamos uno a la vez en la cola

        const formData = new FormData();
        formData.append('file', fileToOptimize);

        // 🚨 LÓGICA CLAVE: ELEGIR ENDPOINT Y HEADERS 🚨
        let endpoint, headers = {};
        let accessToken = null;

        if (isAuthenticated) {
            // Modo Dashboard (Usuario logueado)
            endpoint = `${API_URL}/api/optimize/`;
            accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setFileError("Error de autenticación. Por favor, inicia sesión de nuevo.");
                return;
            }
            headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
            onOptimizeStart(1); // Actualiza créditos del Dashboard inmediatamente (simulado)
        } else {
            // Modo Landing (Free Tier por Cookie)
            endpoint = `${API_URL}/public/optimize/`;
            // No se requiere encabezado de autorización, el backend leerá la cookie
            if (freeCreditsRemaining <= 0) {
                 setFileError("Se agotaron las optimizaciones gratuitas (5). Por favor, regístrate para continuar.");
                 onLimitReached(); // Activa el modal de registro
                 return;
            }
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: formData,
            });

            if (response.ok) {
                // 1. Manejar la respuesta del Blob (archivo optimizado)
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                // 2. Intentar leer la metadata del JSON si es posible (solo para mostrar el ahorro)
                const contentDisposition = response.headers.get('Content-Disposition');
                const filenameMatch = contentDisposition ? contentDisposition.match(/filename="(.+?)"/) : null;
                const optimizedFileName = filenameMatch ? filenameMatch[1] : `optimized_${fileToOptimize.name}`;

                // 3. Crear el resultado para la UI
                setOptimizationResult({
                    url: url,
                    filename: optimizedFileName,
                    originalSize: fileToOptimize.size,
                    optimizedSize: blob.size,
                    savePercentage: (1 - (blob.size / fileToOptimize.size)) * 100,
                });
                
                // 4. Si es Free Tier, actualizar el contador local
                if (!isAuthenticated) {
                    setFreeCreditsRemaining(prev => prev - 1);
                }

                // 5. Limpiar la cola de subida
                setFiles([]); 
                
            } else if (response.status === 402) {
                // Límite alcanzado, requiere pago o registro (Error 402)
                const errorData = await response.json();
                setFileError(errorData.detail || "Has alcanzado el límite de optimizaciones. Regístrate o recarga créditos.");
                
                if (!isAuthenticated) {
                    onLimitReached(); // Activa el modal de registro/pago
                }
                
            } else if (response.status === 401) {
                 setFileError("Token inválido o expirado. Por favor, inicia sesión de nuevo.");
                 if (isAuthenticated) {
                    router.push('/'); // Redirigir al login si el token falla en el Dashboard
                 }
            } else {
                const errorText = await response.text();
                setFileError(`Error de optimización (${response.status}): ${errorText.substring(0, 100)}...`);
            }
        } catch (error) {
            console.error("Error de red durante la optimización:", error);
            setFileError("Error de conexión con el servidor. Intenta de nuevo.");
        }
    };
    
    // --- Renderizado del Resultado ---
    const renderResult = () => {
        if (!optimizationResult) return null;

        const { url, filename, originalSize, optimizedSize, savePercentage } = optimizationResult;

        // Función para descargar el archivo (se llama al hacer clic)
        const handleDownload = () => {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return (
            <div className="optimization-result-card">
                <div className="result-header">
                    <CheckCircle size={32} color="#4CAF50" />
                    <h3>¡Optimización Exitosa!</h3>
                    <button onClick={() => setOptimizationResult(null)} className="btn-close-result"><XCircle size={20} /></button>
                </div>
                
                <div className="stats-grid">
                    <div className="stat-item">
                        <small>Tamaño Original</small>
                        <span>{formatFileSize(originalSize)}</span>
                    </div>
                    <div className="stat-item">
                        <small>Tamaño Optimizado</small>
                        <span className="optimized-value">{formatFileSize(optimizedSize)}</span>
                    </div>
                    <div className="stat-item saved-item">
                        <small>Ahorro Total</small>
                        <span className="save-percentage">
                            {savePercentage.toFixed(2)}%
                        </span>
                    </div>
                </div>

                <button 
                    onClick={handleDownload} 
                    className="btn btn-primary btn-large download-btn"
                    style={{ marginTop: '20px' }}
                >
                    Descargar {filename}
                </button>
            </div>
        );
    };

    // --- Renderizado Principal ---
    
    // Si hay un resultado, mostramos solo la tarjeta de resultado
    if (optimizationResult) {
        return (
            <section className="optimization-section">
                {renderResult()}
            </section>
        );
    }

    // Si no hay resultado, mostramos el Dropzone
    const creditDisplay = !isAuthenticated 
        ? <span className="info-text free-credit-info"><Package size={16} style={{ marginRight: '5px' }} /> {freeCreditsRemaining} optimizaciones gratuitas restantes</span>
        : <span className="info-text">1 archivo = 1 crédito</span>;

    const optimizeButtonText = files.length > 0 
        ? `Optimizar Ahora (${files.length} Crédito${files.length > 1 ? 's' : ''})`
        : 'Optimizar Ahora';
    
    const isOptimizeDisabled = files.length === 0 || (!isAuthenticated && freeCreditsRemaining <= 0);


    return (
        <section className="optimization-section">
            <div className="section-header">
                <h2><UploadCloud size={24} style={{ marginRight: '10px' }} /> Optimiza tu Imagen</h2>
                {creditDisplay}
            </div>

            {/* DROPZONE */}
            <div 
                className={`dropzone-area ${isDragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} 
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={isAuthenticated} // Permitir múltiples solo si está autenticado
                    accept={ALLOWED_MIME_TYPES.join(',')}
                    onChange={handleSelectFiles}
                    style={{ display: 'none' }}
                />
                
                <UploadCloud size={60} color={isDragActive ? 'var(--accent-color)' : 'var(--text-color-secondary)'} />
                <p className="dropzone-text">Arrastra y suelta aquí o **haz clic** para seleccionar archivo</p>
                <small className="file-info">Soporte: JPEG, PNG | Máx. {MAX_FILE_SIZE_MB}MB por archivo</small>
            </div>
            
            {/* MENSAJES DE ERROR */}
            {fileError && (
                <div className="file-error-message">
                    <XCircle size={20} style={{ marginRight: '8px' }} />
                    {fileError}
                </div>
            )}
            
            {/* COLA DE ARCHIVOS / BOTÓN DE OPTIMIZACIÓN */}
            {files.length > 0 && (
                <div className="file-queue-container">
                    <h3>Archivo para Optimizar ({files.length} cargado)</h3>
                    <ul className="file-list">
                        {files.map((file, index) => (
                            <li key={index} className="file-item">
                                <FileImage size={20} style={{ marginRight: '10px', color: 'var(--primary-color)' }} />
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{formatFileSize(file.size)}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.name); }}
                                    className="btn-remove-file"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={handleOptimize}
                        className="btn btn-primary btn-large optimize-btn"
                        disabled={isOptimizeDisabled}
                    >
                        {optimizeButtonText}
                    </button>
                    {!isAuthenticated && freeCreditsRemaining <= 0 && 
                        <small className="credit-alert">Regístrate para continuar optimizando.</small>
                    }
                </div>
            )}

        </section>
    );
}