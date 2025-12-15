'use client'; 

import { useState, useRef, useEffect } from 'react'; 
import { UploadCloud, FileImage, Trash2, XCircle, Zap, Download } from 'lucide-react'; 
import { API_URL, MAX_FILE_SIZE_MB, ALLOWED_MIME_TYPES } from '../../config/api';

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

export default function FileDropzone({ isAuthenticated, onLimitReached, userCredits = 5 }) { 
    
    // 🔧 CORRECCIÓN: Función que obtiene créditos REALES del servidor
    const fetchCreditsFromBackend = async () => {
        try {
            const res = await fetch(`${API_URL}/config/free-credits`, {
                // 🚨 CRÍTICO: Incluir credentials para enviar/recibir cookies
                credentials: 'include'
            });
            
            if (!res.ok) throw new Error(`Server status: ${res.status}`);

            const data = await res.json();
            return data.credits_remaining; 

        } catch (error) {
            console.error("Error al obtener créditos del backend:", error);
            return 0; // Fallback seguro
        }
    };
    
    // Estado: null significa "cargando", número significa "valor conocido"
    const [creditsRemaining, setCreditsRemaining] = useState(null);
    const [isClient, setIsClient] = useState(false); 

    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationResults, setOptimizationResults] = useState([]);

    // 🚀 Lógica de Carga de Créditos (CORREGIDA)
    useEffect(() => {
        const loadCredits = async () => {
            if (isAuthenticated) {
                // Usuario autenticado: usar créditos desde props
                setCreditsRemaining(userCredits);
            } else {
                // Usuario NO autenticado: consultar al servidor
                const credits = await fetchCreditsFromBackend();
                setCreditsRemaining(credits);
            }
            setIsClient(true);
        };

        loadCredits();
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
            setFiles(prevFiles => [...prevFiles, ...validFiles].slice(0, 10));
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
    
    // 🔧 LÓGICA DE OPTIMIZACIÓN (CORREGIDA)
    const handleOptimize = async () => {
        if (files.length === 0 || isOptimizing || creditsRemaining === null) return; 
        
        const filesToOptimize = files.length;
        
        // Verificación de créditos
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
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: authHeaders,
                body: formData,
                // 🚨 CRÍTICO: Incluir credentials para cookies
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setOptimizationResults(data.results);
                
                // 🔧 CORRECCIÓN: Actualizar créditos desde la respuesta del servidor
                if (data.credits_remaining !== undefined) {
                    setCreditsRemaining(data.credits_remaining);
                } else {
                    // Fallback: restar localmente si el servidor no envía el valor
                    setCreditsRemaining(prev => Math.max(0, prev - filesToOptimize));
                }

            } else if (response.status === 401) {
                setFileError("No autorizado. Por favor, vuelve a iniciar sesión.");
                if (isClient) { 
                    localStorage.removeItem('accessToken'); 
                }

            } else if (response.status === 402) {
                setFileError("¡Límite de créditos alcanzado! Regístrate para obtener más.");
                
                // 🔧 CORRECCIÓN: Re-sincronizar con el servidor después del error 402
                if (!isAuthenticated) {
                    const updatedCredits = await fetchCreditsFromBackend();
                    setCreditsRemaining(updatedCredits);
                }
                
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
            setFiles([]);
        }
    };

    const downloadImage = (downloadUrl, filename) => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isOverLimit = creditsRemaining !== null && creditsRemaining < files.length;
    
    // Mostrar estado de carga mientras se obtienen los créditos
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
            
            {optimizationResults.length > 0 && (
                <div className="optimization-results">
                    <h3>✅ Optimización Exitosa ({optimizationResults.length} archivos)</h3>
                    {optimizationResults.map((res, index) => (
                        <div key={index} className="result-item">
                            <div className="result-info">
                                <span className="result-filename">{res.original_filename}</span>
                                {res.status === 'success' && (
                                    <span className="result-savings">
                                        Ahorro: <strong>{res.savings_percent}%</strong> ({formatFileSize(res.original_size)} → {formatFileSize(res.optimized_size)})
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