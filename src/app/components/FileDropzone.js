// src/app/components/FileDropzone.js (VERSIÓN CON DROPDOWN DE SERVICIOS)

'use client'; 

import { useState, useRef, useEffect, useMemo } from 'react'; 
import { UploadCloud, FileImage, Trash2, XCircle, Zap, Download, ChevronDown, ChevronUp, Image, Code, FileText } from 'lucide-react'; 
import { API_URL, MAX_FILE_SIZE_MB, MAX_FREE_OPTIMIZATIONS, ALLOWED_MIME_TYPES } from '../../config/api';

// 🚨 IMPORTAMOS LOS LINKS DE SERVICIO EXPORTADOS DE page.js
import { SERVICE_LINKS } from './SharedComponents';


// CONSTANTE PARA LOCALSTORAGE
const FREE_CREDITS_KEY = 'freeCreditsRemaining';

// 🚨 CONFIGURACIÓN DE SERVICIOS Y ENDPOINTS 🚨
const SERVICE_CONFIG = {
    // Servicio 1: Optimización de Imagen
    image: {
        endpoint: '/optimize-batch',
        endpoint_free: '/optimize-batch-free',
        accept: ALLOWED_MIME_TYPES, // ['image/jpeg', 'image/png']
        name: 'Optimizador WebP', 
    },
    // Servicio 2: Minificación de Código (CSS/JS)
    minify: {
        endpoint: '/minify-code', 
        endpoint_free: '/minify-code-free', 
        accept: ['text/css', 'application/javascript', 'text/javascript'],
        name: 'Minificador CSS/JS',
    },
    // Servicio 3: Limpieza de Metadatos
    metadata: {
        endpoint: '/process-metadata', 
        endpoint_free: '/process-metadata-free',
        accept: ALLOWED_MIME_TYPES, 
        name: 'Limpiador de Metadatos (EXIF)',
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


// 🚨 MODIFICACIÓN EN PROPS: Aceptar defaultService (la clave: 'image', 'minify', etc.)
export default function FileDropzone({ isAuthenticated, onLimitReached, userCredits = 5, defaultService = 'image' }) { 
    
    // --- ESTADOS ---
    const [selectedService, setSelectedService] = useState(defaultService);
    // 🚨 NUEVO ESTADO para el dropdown
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    
    const [creditsRemaining, setCreditsRemaining] = useState(isAuthenticated ? userCredits : 0);
    const [isClient, setIsClient] = useState(false); 
    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationResults, setOptimizationResults] = useState([]);

    // 🚨 Sincronizar el estado del servicio al cambiar la prop (es vital para el funcionamiento)
    useEffect(() => {
        // Solo actualizamos si la prop es diferente del estado actual
        if (selectedService !== defaultService) { 
            setSelectedService(defaultService);
            // Limpiamos cola y resultados al cambiar de servicio para evitar bugs
            setFiles([]);
            setFileError('');
            setOptimizationResults([]);
        }
    }, [defaultService]); 


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


    // 🚨 LÓGICA DE DROPDOWN Y NAVEGACIÓN
    const currentServiceLink = useMemo(() => {
        // Busca el objeto completo del link para usar su icono y descripción
        return SERVICE_LINKS.find(s => s.key === selectedService) || SERVICE_LINKS[0];
    }, [selectedService]);

    const handleServiceChange = (key, href) => {
        if (key !== selectedService) {
            // 🚨 FUNCIÓN CRÍTICA: Redirección al seleccionar un servicio diferente
            window.location.href = href; 
        }
        setIsServiceDropdownOpen(false);
    };

    const handleToggleDropdown = () => {
        setIsServiceDropdownOpen(prev => !prev);
    };
    
    const DropdownIcon = isServiceDropdownOpen ? ChevronUp : ChevronDown;
    
    // 🚨 FUNCIÓN CRÍTICA: La validación ahora depende del servicio
    const validateFile = (file) => {
        const config = SERVICE_CONFIG[selectedService];
        const maxFileSize = MAX_FILE_SIZE_MB * 1024 * 1024;
        
        if (!config.accept.includes(file.type)) {
            const allowed = config.accept.map(t => t.split('/')[1].toUpperCase()).join(', ');
            return `Tipo no soportado para ${config.name}: ${file.name}. Solo ${allowed}.`;
        }
        if (file.size > maxFileSize) {
            return `Demasiado grande: ${file.name}. Máx. ${MAX_FILE_SIZE_MB}MB.`;
        }
        return null;
    };
    
    // 🚨 FUNCIÓN CRÍTICA: Manejo de la cola de archivos
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

    // 🚨 FUNCIÓN CRÍTICA: Manejo del Drag & Drop (DragEnter, DragLeave, DragOver)
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    // 🚨 FUNCIÓN CRÍTICA: Manejo del Drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    // 🚨 FUNCIÓN CRÍTICA: Manejo de la selección por clic
    const handleSelectFiles = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    // 🚨 FUNCIÓN CRÍTICA: Remover archivo
    const removeFile = (fileName) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
        setFileError('');
    };

    // 🚨 FUNCIÓN CRÍTICA: Formatear tamaño de archivo
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    // 🚨 FUNCIÓN CRÍTICA: Descarga de la imagen
    const downloadImage = (downloadUrl, filename) => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- LÓGICA DE OPTIMIZACIÓN (Mantenida) ---
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
        
        const config = SERVICE_CONFIG[selectedService]; 
        
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            
            const authHeaders = isAuthenticated ? getAuthHeaders() : {}; 
            
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

    // --- RENDERIZADO ---
    
    const isOverLimit = creditsRemaining !== null && creditsRemaining < files.length;
    
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

    const currentServiceConfig = SERVICE_CONFIG[selectedService];

    return (
        <section className="optimization-section">
            <div className="section-header">
                {/* 🚨 DROPDOWN DE SELECCIÓN DE SERVICIO */}
                <div className="service-dropdown-container">
                    <button 
                        className="service-dropdown-btn"
                        onClick={handleToggleDropdown}
                    >
                        <div className="flex items-center gap-3">
                            {/* Icono del servicio actual */}
                            <currentServiceLink.icon size={24} className="icon-color" />
                            {/* Título del servicio actual */}
                            <h2 className="service-name-title">
                                {currentServiceConfig.name} {isAuthenticated}
                            </h2>
                        </div>
                        <DropdownIcon size={20} className="dropdown-arrow" />
                    </button>

                    {isServiceDropdownOpen && (
                        // Menú Desplegable
                        <div className="service-dropdown-menu">
                            {SERVICE_LINKS.map(service => {
                                const isActive = service.key === selectedService;
                                return (
                                    <button 
                                        key={service.key} 
                                        className={`service-option ${isActive ? 'active' : ''}`}
                                        // 🚨 Llama a handleServiceChange para navegar (window.location.href)
                                        onClick={() => handleServiceChange(service.key, service.href)}
                                        disabled={isActive}
                                    >
                                        <service.icon size={20} className="flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">{service.name}</span>
                                            <p className="description-text">{service.description}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
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
                    accept={currentServiceConfig.accept.join(',')}
                    onChange={handleSelectFiles}
                    style={{ display: 'none' }}
                />
                
                <UploadCloud size={60} color={isDragActive ? 'var(--accent-color)' : 'var(--text-color-secondary)'} />
                <p className="dropzone-text">Arrastra y suelta aquí o haz clic para seleccionar archivos</p>
                <small className="file-info">Servicio: **{currentServiceConfig.name}** | Máx. {MAX_FILE_SIZE_MB}MB</small>
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
                    <h3>✅ {currentServiceConfig.name} Exitosa ({optimizationResults.length} archivos)</h3>
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