// src/app/components/FileDropzone.js

'use client'; 
// Asegúrate de que este archivo esté en src/app/components/

import { useState, useRef } from 'react';
import { UploadCloud, FileImage, Trash2, XCircle, Zap } from 'lucide-react'; 

// --- Configuración (DEBE SER LA MISMA QUE EN Dashboard) ---
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
const MAX_FREE_OPTIMIZATIONS = 5; 

// ---------------------------------------------
// COMPONENTE: FileDropzone (ÚNICO)
// ---------------------------------------------
// Nota: Este componente ahora acepta props para manejar ambos casos (público y dashboard)
export default function FileDropzone({ isAuthenticated, onLimitReached, userCredits = 5 }) { 
    
    // Si no está autenticado, siempre usamos el límite de prueba inicial
    const initialCredits = isAuthenticated ? userCredits : MAX_FREE_OPTIMIZATIONS;

    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');
    const [creditsRemaining, setCreditsRemaining] = useState(initialCredits);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationResults, setOptimizationResults] = useState([]);


    const validateFile = (file) => {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return `Tipo no soportado: ${file.name}. Solo JPEG y PNG.`;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `Demasiado grande: ${file.name}. Máx. ${MAX_FILE_SIZE_MB}MB.`;
        }
        return null;
    };
    
    const handleFiles = (newFiles) => {
        setFileError('');
        let validFiles = [];
        let hasError = false;

        for (const file of newFiles) {
            const validationError = validateFile(file);
            if (validationError) {
                setFileError(validationError);
                hasError = true;
                break; 
            }
            // Evitar duplicados
            if (!files.some(f => f.name === file.name && f.size === file.size)) {
                validFiles.push(file);
            }
        }

        if (!hasError) {
            setFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, 10)); // Limitar a 10 archivos en cola
        }
    };

    // --- Lógica de Drag and Drop (La que causaba el error de ReferenceError) ---
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
    // --------------------------------------------------------------------------

    const handleSelectFiles = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const removeFile = (fileName) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
        setFileError('');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    // 🚨 LÓGICA DE OPTIMIZACIÓN REAL 🚨
    const handleOptimize = async () => {
        if (files.length === 0 || isOptimizing) return;
        
        const filesToOptimize = files.length;
        
        if (creditsRemaining < filesToOptimize) {
            setFileError(`¡Créditos insuficientes! Necesitas ${filesToOptimize} créditos.`);
            
            // Si no está autenticado y agota el límite público, disparamos el modal de registro.
            if (!isAuthenticated && onLimitReached) {
                setTimeout(onLimitReached, 1500); // Dar tiempo para leer el error
            }
            return;
        }
        
        setIsOptimizing(true);
        setFileError('');
        setOptimizationResults([]);
        
        try {
            // Preparamos el formulario de datos para la API
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            
            // Si está autenticado, añade el token de acceso
            const accessToken = isAuthenticated ? localStorage.getItem('accessToken') : null;
            
            const response = await fetch(`${API_URL}/optimize-batch${isAuthenticated ? '' : '-free'}`, {
                method: 'POST',
                headers: {
                    // Nota: No se puede adjuntar Content-Type: multipart/form-data
                    // manualmente con FormData, el navegador lo hace automáticamente.
                    // Solo adjuntamos la autorización si existe
                    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setOptimizationResults(data.results);
                
                // Actualizar créditos
                setCreditsRemaining(prev => prev - filesToOptimize);
                
                // Si la respuesta incluye los créditos restantes reales (solo en el Dashboard), podrías usarlos:
                // if (data.credits_remaining) setCreditsRemaining(data.credits_remaining);

            } else if (response.status === 402 && !isAuthenticated) {
                // Código 402: Límite de pago requerido / Límite de prueba gratuito alcanzado
                setFileError("¡Límite de prueba gratuito alcanzado! Regístrate para obtener más créditos.");
                if (onLimitReached) {
                    setTimeout(onLimitReached, 1500);
                }
            } else {
                setFileError(`Error al optimizar: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error de red/API:', error);
            setFileError('Error de conexión con el servidor. Intenta de nuevo.');
        } finally {
            setIsOptimizing(false);
            setFiles([]); // Limpiar cola
        }
    };


    const isQueueEmpty = files.length === 0;
    const isOverLimit = creditsRemaining < files.length;
    
    // Solo mostrar el mensaje de límite si no está autenticado
    const limitMessage = !isAuthenticated && (
        <small className="info-text">
            {creditsRemaining} optimizaciones gratuitas restantes.
        </small>
    );

    return (
        <section className="optimization-section">
            <div className="section-header">
                <h2>
                    <UploadCloud size={24} style={{ marginRight: '10px' }} /> 
                    Optimiza tu Imagen {isAuthenticated ? "" : "Gratis"}
                </h2>
                {limitMessage}
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
                    multiple
                    accept={ALLOWED_MIME_TYPES.join(',')}
                    onChange={handleSelectFiles}
                    style={{ display: 'none' }}
                />
                
                <UploadCloud size={60} color={isDragActive ? 'var(--accent-color)' : 'var(--text-color-secondary)'} />
                <p className="dropzone-text">Arrastra y suelta aquí o **haz clic** para seleccionar archivos</p>
                <small className="file-info">Soporte: JPEG, PNG | Máx. {MAX_FILE_SIZE_MB}MB</small>
            </div>
            
            {/* MENSAJES DE ERROR */}
            {fileError && (
                <div className="file-error-message">
                    <XCircle size={20} style={{ marginRight: '8px' }} />
                    {fileError}
                </div>
            )}
            
            {/* RESULTADOS DE OPTIMIZACIÓN (Simulados para la landing, aquí deberías mostrar enlaces de descarga) */}
            {optimizationResults.length > 0 && (
                <div className="optimization-results">
                    <h3>✅ Optimización Exitosa ({optimizationResults.length} archivos)</h3>
                    {optimizationResults.map((res, index) => (
                        <div key={index} className="result-item">
                            <span>{res.original_filename}</span> 
                            {/* Aquí va el enlace de descarga */}
                            <a href={res.download_url} download={res.optimized_filename} className="btn-download">Descargar</a>
                        </div>
                    ))}
                </div>
            )}
            
            {/* COLA DE ARCHIVOS */}
            {files.length > 0 && (
                <div className="file-queue-container">
                    <h3>Cola de Optimización ({files.length} archivos)</h3>
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
                        disabled={isOverLimit || isOptimizing}
                    >
                        {isOptimizing ? (
                            <span><Zap size={20} className="spinner" /> Optimizando...</span>
                        ) : (
                            <span>Optimizar Ahora ({files.length} Créditos)</span>
                        )}
                    </button>
                    {isOverLimit && 
                        <small className="credit-alert">Necesitas {files.length - creditsRemaining} créditos adicionales.</small>
                    }
                </div>
            )}

        </section>
    );
}