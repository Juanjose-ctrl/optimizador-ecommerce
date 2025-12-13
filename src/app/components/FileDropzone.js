// src/app/components/FileDropzone.js - COMPONENTE FUNCIONAL DE OPTIMIZACIÓN

'use client'; 
import { useState, useRef } from 'react';
import { UploadCloud, FileImage, Trash2, XCircle, CheckCircle, Package, Loader2 } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

// --- Configuración de la API y Límites ---
// Usa la variable de entorno para ser más flexible en diferentes entornos
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://fastapi-image-optimizer-1.onrender.com"; 
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']; // Añadimos webp

/**
 * Componente Dropzone para la carga y optimización de archivos.
 * @param {boolean} isAuthenticated - Indica si el usuario está logueado (true en Dashboard, false en Landing).
 * @param {string} accessToken - El token JWT del usuario logueado (solo si isAuthenticated es true).
 * @param {function} onLimitReached - Callback a ejecutar si se recibe un error 402 (para mostrar modal de Login/Pago).
 * @param {number} initialCredits - Créditos iniciales. Usado para inicializar freeCreditsRemaining en Landing.
 * @param {function} onCreditsUpdated - Callback para actualizar el balance de créditos en el Dashboard (recibe el nuevo balance).
 */
export default function FileDropzone({ 
    isAuthenticated = false, 
    accessToken = null, // 🚨 NUEVA PROP: Obtener el token directamente de props/contexto
    onLimitReached = () => {}, 
    initialCredits = 0,
    onCreditsUpdated = () => {} // 🚨 NOMBRE CLARIFICADO
}) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState('');
    const [optimizationResult, setOptimizationResult] = useState(null); 
    const [isOptimizing, setIsOptimizing] = useState(false); // Estado de carga
    const fileInputRef = useRef(null);
    const router = useRouter();

    // Determina los créditos restantes a mostrar (Free Tier solo tiene sentido en la Landing)
    // El valor se ajusta con el contador del backend via cookie
    const [freeCreditsRemaining, setFreeCreditsRemaining] = useState(isAuthenticated ? 0 : 5);


    // --- Utilidades ---

    const validateFile = (file) => {
        // ... (Tu lógica de validación es correcta, la mantengo) ...
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return `Tipo no soportado: ${file.name}. Solo JPEG, PNG y WEBP.`;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `Archivo demasiado grande: ${file.name}. Máximo ${MAX_FILE_SIZE_MB}MB.`;
        }
        return null;
    };
    
    const formatFileSize = (bytes) => {
        // ... (Tu lógica de formato es correcta, la mantengo) ...
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // --- Manejo de archivos y Drag/Drop (Sin Cambios) ---
    // ... (handleFiles, handleDrag, handleDrop, handleSelectFiles, removeFile son correctos) ...
    const handleFiles = (newFiles) => {
        setFileError('');
        setOptimizationResult(null); 
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
            // Permitir solo 1 archivo en Free Tier, hasta 10 si está autenticado.
            const limit = isAuthenticated ? 10 : 1; 
            setFiles(validFiles.slice(0, limit)); // Reemplazamos la cola si es Free Tier
        }
    };
    
    // ... (handleDrag, handleDrop, handleSelectFiles - Sin cambios funcionales) ...

    const removeFile = (fileName) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
        setFileError('');
        setOptimizationResult(null);
    };


    // --- Lógica de Optimización (CRÍTICA - CONECTANDO AL BACKEND) ---
    
    const handleOptimize = async () => {
        if (files.length === 0) return;
        setFileError('');
        setOptimizationResult(null);
        setIsOptimizing(true); // Activar estado de carga

        const fileToOptimize = files[0]; // Optimizar solo el primer archivo por simplicidad
        
        // Asumiendo valores por defecto de calidad y formato
        const quality = 80;
        const targetFormat = 'webp'; 

        const formData = new FormData();
        formData.append('file', fileToOptimize);
        // Enviamos calidad y formato como Form data (como requiere el backend)
        formData.append('quality', quality.toString());
        formData.append('target_format', targetFormat);


        // 🚨 LÓGICA CLAVE: ELEGIR ENDPOINT Y HEADERS 🚨
        let endpoint, headers = {};
        
        if (isAuthenticated) {
            // Modo Dashboard (Usuario logueado)
            endpoint = `${API_BASE_URL}/api/optimize`; 
            if (!accessToken) {
                setFileError("Error de autenticación. Por favor, inicia sesión de nuevo.");
                setIsOptimizing(false);
                router.push('/'); 
                return;
            }
            headers = {
                // Notar que el Content-Type no se establece, FormData lo hace automáticamente
                'Authorization': `Bearer ${accessToken}`,
            };
        } else {
            // Modo Landing (Free Tier por Cookie)
            endpoint = `${API_BASE_URL}/public/optimize/`;
            // No se requiere encabezado de autorización, el backend leerá/escribirá la cookie
            // Importante: No validamos localmente los créditos aquí, el backend (402) es la fuente de verdad.
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
                
                // 2. Obtener metadatos para la descarga y el ahorro
                const contentDisposition = response.headers.get('Content-Disposition');
                let optimizedFileName = `optimized_${fileToOptimize.name.split('.').slice(0, -1).join('.')}.${targetFormat}`;

                // Intentar obtener el nombre del header (si el backend lo envía)
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
                    if (filenameMatch && filenameMatch[1]) {
                        optimizedFileName = filenameMatch[1];
                    }
                }

                // 3. Crear el resultado para la UI
                setOptimizationResult({
                    url: url,
                    filename: optimizedFileName,
                    originalSize: fileToOptimize.size,
                    optimizedSize: blob.size,
                    savePercentage: (1 - (blob.size / fileToOptimize.size)) * 100,
                });
                
                // 4. Actualizar créditos
                if (isAuthenticated) {
                    // Actualizar créditos del Dashboard leyendo el header
                    const remainingCredits = response.headers.get('X-Credits-Remaining');
                    if (remainingCredits !== null) {
                        onCreditsUpdated(parseInt(remainingCredits, 10));
                    }
                } else {
                    // Actualizar la visualización local del Free Tier (solo para UX inmediata)
                    // El contador real se lee de la cookie
                    setFreeCreditsRemaining(prev => Math.max(0, prev - 1));
                }

                // 5. Limpiar la cola de subida
                setFiles([]); 
                
            } else if (response.status === 402) {
                // 🚨 Límite alcanzado, requiere pago o registro (Error 402 del Backend)
                const errorData = await response.json();
                setFileError(errorData.detail || "Has alcanzado el límite de optimizaciones. Regístrate o recarga créditos.");
                
                // Activar el modal de registro/pago sin importar si está logueado (pudo agotar créditos pagados)
                onLimitReached(); 
                
            } else if (response.status === 401) {
                // Token inválido o expirado
                setFileError("Token inválido o expirado. Por favor, inicia sesión de nuevo.");
                if (isAuthenticated) {
                    router.push('/login'); // Redirigir al login si el token falla en el Dashboard
                }
            } else {
                // Otros errores del servidor (500, 400, etc.)
                const errorText = await response.text();
                setFileError(`Error de optimización (${response.status}): ${errorText.substring(0, 100)}...`);
            }
        } catch (error) {
            console.error("Error de red durante la optimización:", error);
            setFileError("Error de conexión con el servidor. Intenta de nuevo.");
        } finally {
            setIsOptimizing(false); // Desactivar estado de carga
        }
    };
    
    // --- Renderizado del Resultado y Componentes (Casi sin cambios) ---
    // ... (Tu lógica de renderResult y handleDownload es correcta) ...

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

    const optimizeButtonText = isOptimizing
        ? <><Loader2 size={20} className="animate-spin mr-2" /> Optimizando...</>
        : files.length > 0 
        ? `Optimizar Ahora (${files.length} Crédito${files.length > 1 ? 's' : ''})`
        : 'Optimizar Ahora';
    
    const isOptimizeDisabled = files.length === 0 || isOptimizing;


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
                    multiple={isAuthenticated} 
                    accept={ALLOWED_MIME_TYPES.join(',')}
                    onChange={handleSelectFiles}
                    style={{ display: 'none' }}
                />
                
                <UploadCloud size={60} color={isDragActive ? 'var(--accent-color)' : 'var(--text-color-secondary)'} />
                <p className="dropzone-text">Arrastra y suelta aquí o **haz clic** para seleccionar archivo</p>
                <small className="file-info">Soporte: JPEG, PNG, WEBP | Máx. {MAX_FILE_SIZE_MB}MB por archivo</small>
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
                    {!isAuthenticated && freeCreditsRemaining <= 0 && fileError && // Mostrar solo si el error es relevante
                        <small className="credit-alert">Regístrate para continuar optimizando.</small>
                    }
                </div>
            )}

        </section>
    );
}
