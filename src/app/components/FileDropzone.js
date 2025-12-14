'use client'; 

import { useState, useRef, useEffect } from 'react'; 
import { UploadCloud, FileImage, Trash2, XCircle, Zap, Download } from 'lucide-react'; 
import { API_URL, MAX_FILE_SIZE_MB, MAX_FREE_OPTIMIZATIONS, ALLOWED_MIME_TYPES } from '../../config/api';


// CONSTANTE PARA LOCALSTORAGE
const FREE_CREDITS_KEY = 'freeCreditsRemaining';
// 🚨 Nota: La clave 'hasRegistered' se elimina de aquí ya que simplificamos la lógica de inicialización.

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

// Función para inicializar o leer los créditos gratuitos desde localStorage (SIMPLIFICADA)
const initializeFreeCredits = () => {
    if (typeof window !== 'undefined') {
        const storedCredits = localStorage.getItem(FREE_CREDITS_KEY);
        const parsedCredits = parseInt(storedCredits, 10);
        
        // 🚨 LÓGICA CLAVE SIMPLIFICADA
        if (storedCredits === null || isNaN(parsedCredits) || parsedCredits < 0) { 
            // Si no existe, no es un número, o es negativo, lo inicializamos al máximo.
            // Esto cubre: 
            // 1. Nuevo visitante. 
            // 2. Usuario que se registró y borró la clave (simulando un reset).
            localStorage.setItem(FREE_CREDITS_KEY, MAX_FREE_OPTIMIZATIONS.toString());
            return MAX_FREE_OPTIMIZATIONS;
        }
        
        // Si existe y es válido, lo leemos.
        return parsedCredits;
    }
    // Para renderizado del lado del servidor (SSR)
    return MAX_FREE_OPTIMIZATIONS;
};

export default function FileDropzone({ isAuthenticated, onLimitReached, userCredits = 5 }) { 
    
    // 1. 🛑 CORRECCIÓN DE HYDRATION: Inicializamos el estado de manera segura (SSR-safe)
    const [creditsRemaining, setCreditsRemaining] = useState(
        isAuthenticated ? userCredits : MAX_FREE_OPTIMIZATIONS
    );

    // Estado para saber si ya hemos cargado la versión del cliente
    const [isClient, setIsClient] = useState(false); 

    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationResults, setOptimizationResults] = useState([]);

    // 2. 🚀 Carga de Créditos en el Cliente: Usamos useEffect para acceder a localStorage
    useEffect(() => {
        // Este código solo se ejecuta una vez en el cliente, después de la hidratación inicial
        if (isAuthenticated) {
            // Usuario autenticado: Usa SIEMPRE los créditos del prop (del backend)
            setCreditsRemaining(userCredits);
            
            // 🚨 LIMPIEZA ADICIONAL: Aseguramos que la clave de créditos gratuitos se borre
            // por si el usuario se autenticó sin pasar por el formulario de registro.
            if (typeof window !== 'undefined') {
                 localStorage.removeItem(FREE_CREDITS_KEY);
            }
        } else {
            // Usuario no autenticado: Lee el valor persistente de localStorage
            const persistedCredits = initializeFreeCredits();
            setCreditsRemaining(persistedCredits);
        }
        setIsClient(true); // Marcamos que el componente está "hidratado" en el cliente
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
        if (files.length === 0 || isOptimizing) return;
        
        const filesToOptimize = files.length;
        
        // Verificación de créditos (debe usar el estado actualizado del cliente)
        if (creditsRemaining < filesToOptimize) {
            setFileError(`¡Créditos insuficientes! Necesitas ${filesToOptimize} créditos.`);
            
            // Solo llama a onLimitReached si no está autenticado Y ya se ejecutó el useEffect (isClient)
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
                    // Obtiene créditos actualizados del backend o calcula la diferencia como fallback
                    newCredits = data.credits_remaining !== undefined 
                        ? data.credits_remaining 
                        : creditsRemaining - filesToOptimize;

                } else {
                    // Actualiza y persiste los créditos gratuitos en localStorage (solo si es cliente)
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

    const isOverLimit = creditsRemaining < files.length;
    
    // 3. 🛡️ Protección de Renderizado: Solo mostramos el mensaje si es cliente y no está autenticado
    const limitMessage = !isAuthenticated && isClient && (
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
                                        Ahorro: **{res.savings_percent}%** ({formatFileSize(res.original_size)} → {formatFileSize(res.optimized_size)})
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