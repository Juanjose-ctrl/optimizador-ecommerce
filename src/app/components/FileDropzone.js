'use client'; 

import { useState, useRef, useEffect } from 'react'; 
import { UploadCloud, FileImage, Trash2, XCircle, Zap, Download } from 'lucide-react'; 
import { API_URL, MAX_FILE_SIZE_MB, MAX_FREE_OPTIMIZATIONS, ALLOWED_MIME_TYPES } from '../../config/api';


// CONSTANTE PARA LOCALSTORAGE
const FREE_CREDITS_KEY = 'freeCreditsRemaining';

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

// Función para inicializar o leer los créditos gratuitos desde localStorage
const initializeFreeCredits = () => {
    if (typeof window !== 'undefined') {
        const storedCredits = localStorage.getItem(FREE_CREDITS_KEY);
        
        if (storedCredits === null) {
            // Si la clave no existe, devolvemos 0 para que el servidor decida o
            // para que se inicie un nuevo conteo. Evita el valor MAX inicial.
            return 0;
        }
        
        const parsedCredits = parseInt(storedCredits, 10);
        
        if (isNaN(parsedCredits) || parsedCredits < 0) {
            // Si es corrupto, lo reseteamos a MAX para un nuevo intento.
            localStorage.setItem(FREE_CREDITS_KEY, MAX_FREE_OPTIMIZATIONS.toString());
            return MAX_FREE_OPTIMIZATIONS;
        }

        return parsedCredits;
    }
    return 0; // Valor seguro para SSR
};


export default function FileDropzone({ isAuthenticated, onLimitReached, userCredits = 5 }) { 
    
    // 🚨 CORRECCIÓN 1: Nueva función asíncrona para manejar errores y fallbacks.
    const fetchCreditsFromBackend = async () => {
        try {
            const res = await fetch(`${API_URL}/config/free-credits`);
            
            if (!res.ok) {
                // Si el servidor falla (ej: 404 o 500) pero la red está bien
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            // Actualiza el estado con el valor REAL de la cookie del servidor
            setCreditsRemaining(data.credits_remaining); 

        } catch (error) {
            console.error("Error al obtener créditos gratuitos del backend o falla de red.", error);
            
            // 🚨 FALLBACK: Si falla, leemos el valor de localStorage.
            setCreditsRemaining(initializeFreeCredits()); 
        }
    };
    
    // 🛑 CORRECCIÓN 2: Inicializamos a NULL si NO está autenticado. 
    // Esto evita mostrar el '5' mientras se espera la respuesta del backend.
    const [creditsRemaining, setCreditsRemaining] = useState(
        isAuthenticated ? userCredits : null
    );

    // Estado para saber si ya hemos cargado la versión del cliente
    const [isClient, setIsClient] = useState(false); 

    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationResults, setOptimizationResults] = useState([]);

    // 3. 🚀 Carga de Créditos en el Cliente (Lógica de sincronización limpia)
    useEffect(() => {
        if (isAuthenticated) {
            // Usuario autenticado: Usa SIEMPRE los créditos del prop (del backend)
            setCreditsRemaining(userCredits);
            
            // LIMPIEZA: Aseguramos que la clave de créditos gratuitos se borre
            if (typeof window !== 'undefined') {
                localStorage.removeItem(FREE_CREDITS_KEY);
            }
        } else {
            // Usuario no autenticado: Lee el valor REAL del servidor (cookie)
            fetchCreditsFromBackend();
        }
        setIsClient(true); 
    }, [isAuthenticated, userCredits]);


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
            if (!files.some(f => f.name === file.name && f.size === file.size)) {
                validFiles.push(file);
            }
        }

        if (!hasError) {
            setFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, 10)); // Límite a 10 archivos
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
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    // LÓGICA DE OPTIMIZACIÓN
    const handleOptimize = async () => {
        // Protección adicional: solo procede si creditsRemaining tiene un valor cargado.
        if (files.length === 0 || isOptimizing || creditsRemaining === null) return; 
        
        const filesToOptimize = files.length;
        
        // 1. Verificación de créditos (Usa el estado que ya fue hidratado en useEffect)
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
        
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            
            const authHeaders = isAuthenticated ? getAuthHeaders() : {}; 
            
            const endpoint = isAuthenticated 
                ? `${API_URL}/optimize-batch` 
                : `${API_URL}/optimize-batch-free`;
            
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
                    // 2. Lógica Autenticada: Obtiene del backend (prioridad) o calcula (fallback)
                    newCredits = data.credits_remaining !== undefined 
                        ? data.credits_remaining 
                        : creditsRemaining - filesToOptimize;

                } else {
                    // 3. Lógica No Autenticada: Calcula y persiste localmente
                    newCredits = creditsRemaining - filesToOptimize;
                    
                    if (isClient) { // Protección para el acceso a localStorage
                        localStorage.setItem(FREE_CREDITS_KEY, newCredits.toString());
                    }
                }
                
                setCreditsRemaining(newCredits);

            } else if (response.status === 401) {
                setFileError("No autorizado. Por favor, vuelve a iniciar sesión.");
                if (isClient) { 
                    localStorage.removeItem('accessToken'); 
                }

            } else if (response.status === 402) {
                setFileError("¡Límite de créditos alcanzado! Regístrate para obtener más.");
                if (!isAuthenticated && onLimitReached && isClient) {
                    setTimeout(onLimitReached, 1500);
                }
            } else {
                const errorText = await response.text();
                setFileError(`Error: ${response.status} - ${errorText.substring(0, 100) || 'Error desconocido'}`);
            }

        } catch (error) {
            console.error('Error de red/API:', error);
            setFileError('Error de conexión con el servidor. Intenta de nuevo.');
        } finally {
            setIsOptimizing(false);
            setFiles([]); // Limpiar la cola de archivos después de la optimización/intento
        }
    };

    // FUNCIÓN PARA DESCARGAR IMÁGENES
    const downloadImage = (downloadUrl, filename) => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isOverLimit = creditsRemaining !== null && creditsRemaining < files.length;
    
    // 4. 🛡️ Protección de Renderizado (Muestra estado de carga si creditsRemaining es null)
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

    return (
        <section className="optimization-section">
            <div className="section-header">
                <h2>
                    <UploadCloud size={24} style={{ marginRight: '10px' }} /> 
                    Optimiza tu Imagen {isAuthenticated ? "" : "Gratis"}
                </h2>
                {limitMessage}
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
                    accept={ALLOWED_MIME_TYPES.join(',')}
                    onChange={handleSelectFiles}
                    style={{ display: 'none' }}
                />
                
                <UploadCloud size={60} color={isDragActive ? 'var(--accent-color)' : 'var(--text-color-secondary)'} />
                <p className="dropzone-text">Arrastra y suelta aquí o haz clic para seleccionar archivos</p>
                <small className="file-info">Soporte: JPEG, PNG | Máx. {MAX_FILE_SIZE_MB}MB</small>
            </div>
            
            {fileError && (
                <div className="file-error-message">
                    <XCircle size={20} style={{ marginRight: '8px' }} />
                    {fileError}
                </div>
            )}
            
            {/* RESULTADOS DE OPTIMIZACIÓN */}
            {optimizationResults.length > 0 && (
                <div className="optimization-results">
                    <h3>✅ Optimización Exitosa ({optimizationResults.length} archivos)</h3>
                    {optimizationResults.map((res, index) => (
                        <div key={index} className="result-item">
                            <div className="result-info">
                                <span className="result-filename">{res.original_filename}</span>
                                {res.status === 'success' && (
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
                    <h3>Cola de Optimización ({files.length} archivos)</h3>
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
                            <span><Zap size={20} className="spinner" /> Optimizando...</span>
                        ) : (
                            <span>Optimizar Ahora ({files.length} Créditos)</span>
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