'use client'; 

import { useState, useRef, useEffect } from 'react'; 
import { UploadCloud, FileImage, Trash2, XCircle, Zap, Download } from 'lucide-react'; 
import { API_URL, MAX_FILE_SIZE_MB, MAX_FREE_OPTIMIZATIONS, ALLOWED_MIME_TYPES } from '../../config/api';


// CONSTANTE PARA LOCALSTORAGE
const FREE_CREDITS_KEY = 'freeCreditsRemaining';

// 🚨 NUEVOS TIPOS DE ARCHIVO SEGÚN EL SERVICIO
const SERVICE_CONFIG = {
    // Servicio 1: Optimización de Imagen (el que ya tenías)
    image: {
        endpoint: '/optimize-batch',
        endpoint_free: '/optimize-batch-free',
        accept: ALLOWED_MIME_TYPES, // ['image/jpeg', 'image/png']
        name: 'Optimizar Imagen (WebP)',
    },
    // Servicio 2: Minificación de Código (CSS/JS)
    minify: {
        endpoint: '/minify-code', // Asumiendo que crearás este endpoint en Render
        endpoint_free: '/minify-code-free', 
        accept: ['text/css', 'application/javascript', 'text/javascript'],
        name: 'Minificar CSS/JS',
    },
    // Servicio 3: Limpieza de Metadatos
    metadata: {
        endpoint: '/process-metadata', // Asumiendo que crearás este endpoint en Render
        endpoint_free: '/process-metadata-free',
        accept: ALLOWED_MIME_TYPES, // JPEG/PNG son los que suelen tener EXIF
        name: 'Limpiar Metadatos (EXIF)',
    },
};

// Función auxiliar para obtener el token de autenticación
const getAuthHeaders = () => {
    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return {
                'Authorization': `Bearer ${accessToken}`,
            };
        }
    }
    return {};
};

// Función para inicializar o leer los créditos gratuitos desde localStorage.
const initializeFreeCredits = () => {
    if (typeof window !== 'undefined') {
        const storedCredits = localStorage.getItem(FREE_CREDITS_KEY);
        
        if (storedCredits === null) {
            localStorage.setItem(FREE_CREDITS_KEY, MAX_FREE_OPTIMIZATIONS.toString());
            return MAX_FREE_OPTIMIZATIONS; 
        }
        
        const parsedCredits = parseInt(storedCredits, 10);
        
        if (!isNaN(parsedCredits) && parsedCredits >= 0) {
            return parsedCredits;
        }

        localStorage.setItem(FREE_CREDITS_KEY, MAX_FREE_OPTIMIZATIONS.toString());
        return MAX_FREE_OPTIMIZATIONS;
    }
    return 0; 
};


export default function FileDropzone({ isAuthenticated, onLimitReached, userCredits = 5 }) { 
    
    // 🛑 CAMBIO 1: Nuevo estado para el servicio seleccionado (imagen por defecto)
    const [selectedService, setSelectedService] = useState('image');
    
    // 🛑 CAMBIO 2: Eliminamos fetchCreditsFromBackend y usamos solo localStorage
    
    const [creditsRemaining, setCreditsRemaining] = useState(
        isAuthenticated ? userCredits : 0
    );

    const [isClient, setIsClient] = useState(false); 
    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationResults, setOptimizationResults] = useState([]);

    // 3. Lógica de Carga de Créditos en el Cliente
    useEffect(() => {
        if (isAuthenticated) {
            setCreditsRemaining(userCredits);
            if (typeof window !== 'undefined') {
                localStorage.removeItem(FREE_CREDITS_KEY);
            }
        } else {
            // Cargar del localStorage (5 o el valor gastado)
            setCreditsRemaining(initializeFreeCredits());
        }
        setIsClient(true); 
    }, [isAuthenticated, userCredits]);


    // 🚨 CAMBIO 4: Adaptar la validación según el servicio seleccionado
    const validateFile = (file) => {
        const config = SERVICE_CONFIG[selectedService];

        if (!config.accept.includes(file.type)) {
            // Mensaje de error más descriptivo
            const allowed = config.accept.map(t => t.split('/')[1].toUpperCase()).join(', ');
            return `Tipo no soportado para ${config.name}: ${file.name}. Solo ${allowed}.`;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `Demasiado grande: ${file.name}. Máx. ${MAX_FILE_SIZE_MB}MB.`;
        }
        return null;
    };
    
    // ... (handleFiles, handleDrag, handleDrop, handleSelectFiles, removeFile, formatFileSize - Se mantienen) ...
    
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
            if (!files.some(f => f.name === file.name && f.size === file.size)) {
                validFiles.push(file);
            }
        }
    
        if (!hasError) {
            setFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, 10)); // Límite a 10 archivos
        }
    };
    
    // ... (El resto de funciones de manejo de archivos se mantiene) ...

    // LÓGICA DE OPTIMIZACIÓN
    const handleOptimize = async () => {
        if (files.length === 0 || isOptimizing || creditsRemaining === null) return; 
        
        const filesToOptimize = files.length;
        
        if (creditsRemaining < filesToOptimize) {
            setFileError(`¡Créditos insuficientes! Necesitas ${filesToOptimize} créditos.`);
            
            if (!isAuthenticated && onLimitReached && isClient) { 
                setTimeout(onLimitReached, 1500);
            }
            return;
        }
        
        setIsOptimizing(true);
        setFileError('');
        setOptimizationResults([]);
        
        const config = SERVICE_CONFIG[selectedService]; // 🚨 Obtenemos la configuración actual
        
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            
            const authHeaders = isAuthenticated ? getAuthHeaders() : {}; 
            
            // 🚨 CAMBIO 5: Determinar el endpoint dinámicamente
            const endpointSuffix = isAuthenticated ? config.endpoint : config.endpoint_free;
            const endpoint = `${API_URL}${endpointSuffix}`;
            
            if (isAuthenticated && Object.keys(authHeaders).length === 0) {
                console.warn("Usuario autenticado sin token. Intentando endpoint autenticado sin cabecera Auth.");
            }
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: authHeaders, 
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setOptimizationResults(data.results);
                
                let newCredits;

                if (isAuthenticated) {
                    newCredits = data.credits_remaining !== undefined 
                        ? data.credits_remaining 
                        : creditsRemaining - filesToOptimize;

                } else {
                    newCredits = data.credits_remaining !== undefined 
                        ? data.credits_remaining 
                        : creditsRemaining - filesToOptimize;
                    
                    if (typeof window !== 'undefined') {
                        // Persistimos el valor en localStorage
                        localStorage.setItem(FREE_CREDITS_KEY, newCredits.toString());
                    }
                }
                
                setCreditsRemaining(newCredits);

            } else if (response.status === 402) {
                setFileError("¡Límite de créditos alcanzado! Regístrate para obtener más.");
                if (!isAuthenticated && onLimitReached && isClient) {
                    setTimeout(onLimitReached, 1500);
                }
            } // ... (manejo de otros errores 401, 500) ...
            
        } catch (error) {
            console.error('Error de red/API:', error);
            setFileError('Error de conexión con el servidor. Intenta de nuevo.');
        } finally {
            setIsOptimizing(false);
            setFiles([]); 
        }
    };

    // ... (downloadImage) ...
    
    const isOverLimit = creditsRemaining !== null && creditsRemaining < files.length;
    
    // 4. Protección de Renderizado (Muestra estado de carga si creditsRemaining es null)
    if (!isClient || creditsRemaining === null) {
        return (
            <section className="optimization-section">
                <div className="dropzone-loading">
                    <Zap size={40} className="spinner" />
                    <p>Cargando estado de optimizaciones...</p>
                </div>
            </section>
        );
    }

    // 5. Renderizado Final
    const limitMessage = !isAuthenticated && (
        <small className="info-text">
            {creditsRemaining} optimizaciones gratuitas restantes.
        </small>
    );

    const currentServiceConfig = SERVICE_CONFIG[selectedService];

    return (
        <section className="optimization-section">
            <div className="section-header">
                <h2>
                    <UploadCloud size={24} style={{ marginRight: '10px' }} /> 
                    {currentServiceConfig.name} {isAuthenticated ? "" : "Gratis"}
                </h2>
                {limitMessage}
            </div>

            {/* 🚨 CAMBIO 6: Selector de Servicio (Pestañas) */}
            <div className="service-tabs">
                {Object.keys(SERVICE_CONFIG).map(key => (
                    <button
                        key={key}
                        className={`service-tab-button ${selectedService === key ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedService(key);
                            setFiles([]); // Limpiar la cola al cambiar de servicio
                            setFileError('');
                            setOptimizationResults([]);
                        }}
                    >
                        {SERVICE_CONFIG[key].name}
                    </button>
                ))}
            </div>
            
            {/* ZONA DE DROPZONE */}
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
                    // 🚨 CAMBIO 7: Usar el 'accept' del servicio seleccionado
                    accept={currentServiceConfig.accept.join(',')}
                    onChange={handleSelectFiles}
                    style={{ display: 'none' }}
                />
                
                <UploadCloud size={60} color={isDragActive ? 'var(--accent-color)' : 'var(--text-color-secondary)'} />
                <p className="dropzone-text">Arrastra y suelta aquí o haz clic para seleccionar archivos</p>
                <small className="file-info">Servicio: **{currentServiceConfig.name}** | Máx. {MAX_FILE_SIZE_MB}MB</small>
            </div>
            
            {/* ... (Resto del JSX) ... */}
            
            {fileError && (
                <div className="file-error-message">
                    <XCircle size={20} style={{ marginRight: '8px' }} />
                    {fileError}
                </div>
            )}
            
            {/* RESULTADOS DE OPTIMIZACIÓN */}
            {optimizationResults.length > 0 && (
                <div className="optimization-results">
                    <h3>✅ {currentServiceConfig.name} Exitosa ({optimizationResults.length} archivos)</h3>
                    {optimizationResults.map((res, index) => (
                        <div key={index} className="result-item">
                            {/* Adaptar la visualización del resultado según el servicio, si es necesario */}
                            <div className="result-info">
                                <span className="result-filename">{res.original_filename}</span>
                                {res.status === 'success' && (
                                    // 🚨 NOTA: Para Minify/Metadata, estas métricas pueden cambiar.
                                    // Asumo que el backend devolverá 'savings_percent' para todos.
                                    <span className="result-savings">
                                        Ahorro: <strong>{res.savings_percent}%</strong> ({formatFileSize(res.original_size)} → {formatFileSize(res.optimized_size)}
                                    </span>
                                )}
                                {res.status === 'error' && (
                                    <span className="result-error">Error: {String(res.error) || 'Error desconocido'}</span>
                                )}
                            </div>
                            {res.status === 'success' && (
                                <button 
                                    className="btn-download"
                                    onClick={() => downloadImage(res.download_url, res.optimized_filename)}
                                >
                                    <Download size={16} style={{ marginRight: '5px' }} />
                                    Descargar
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            
            {/* COLA DE ARCHIVOS Y BOTÓN DE OPTIMIZACIÓN */}
            {files.length > 0 && (
                <div className="file-queue-container">
                    <h3>Cola de {currentServiceConfig.name} ({files.length} archivos)</h3>
                    <ul className="file-list">
                        {files.map((file) => (
                            <li key={file.name} className="file-item"> 
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
                            <span><Zap size={20} className="spinner" /> Procesando...</span>
                        ) : (
                            <span>{currentServiceConfig.name} Ahora ({files.length} Créditos)</span>
                        )}
                    </button>
                    {isOverLimit && 
                        <small className="credit-alert">Necesitas **{files.length - creditsRemaining}** créditos adicionales.</small>
                    }
                </div>
            )}

        </section>
    );
}