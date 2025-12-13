// src/app/dashboard/page.js - VERSIÓN FINAL UNIFICADA Y CORREGIDA

'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script'; 
import { UploadCloud, Zap, Code, LogOut, Copy, RefreshCw, AlertTriangle, Package, XCircle, FileImage, Trash2 } from 'lucide-react'; 

// --- Configuración de la API y Paddle ---
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
const PADDLE_CLIENT_SIDE_TOKEN = "ctm_01kbxtv3hhwg1rhak5rjp83eh7"; 
const DEFAULT_PADDLE_PLAN_ID = 'pri_01h6t465fgq8h4r37t9m0l1u5v'; 
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];


// ---------------------------------------------
// COMPONENTE: DashboardHeader (Sin cambios)
// ---------------------------------------------
const DashboardHeader = ({ userEmail, onLogout }) => (
    <header className="dashboard-header">
        <div className="logo-text">OptiCommerce Panel</div>
        <div className="user-info">
            <span className="user-email">{userEmail}</span>
            <button onClick={onLogout} className="btn-logout" title="Cerrar Sesión">
                <LogOut size={20} />
            </button>
        </div>
    </header>
);

// ---------------------------------------------
// COMPONENTE: Card de Métricas (Sin cambios)
// ---------------------------------------------
const MetricCard = ({ icon: Icon, title, value, statusClass, actionButton }) => (
    <div className="metric-card">
        <div className="card-top">
            <Icon size={32} className={`icon-${statusClass}`} />
            <span className="card-title">{title}</span>
        </div>
        <div className="card-bottom">
            <p className={`card-value ${statusClass}`}>{value}</p>
            {actionButton && <div className="card-action">{actionButton}</div>}
        </div>
    </div>
);


// ---------------------------------------------
// COMPONENTE: FileDropzone (Sin cambios)
// ---------------------------------------------
const FileDropzone = ({ userCredits, onOptimizeStart }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileError, setFileError] = useState('');

    const validateFile = (file) => {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return `Tipo de archivo no soportado: ${file.name}. Solo JPEG y PNG.`;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `Archivo demasiado grande: ${file.name}. Máximo ${MAX_FILE_SIZE_MB}MB.`;
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
            if (!files.some(f => f.name === file.name)) {
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
    
    const handleOptimize = () => {
        if (files.length === 0) return;
        if (userCredits < files.length) {
            setFileError("¡Créditos insuficientes! Necesitas " + files.length + " créditos.");
            return;
        }
        
        // Aquí iría la llamada real a la API 
        console.log(`Iniciando optimización de ${files.length} archivos.`);
        
        // Simular el inicio de la optimización y el uso de créditos
        onOptimizeStart(files.length); 
        setFiles([]); // Limpiar cola tras el 'inicio'
    };

    return (
        <section className="optimization-section">
            <div className="section-header">
                <h2><UploadCloud size={24} style={{ marginRight: '10px' }} /> Optimiza tu Imagen</h2>
                <span className="info-text">1 archivo = 1 crédito</span>
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
                <small className="file-info">Soporte: JPEG, PNG | Máx. {MAX_FILE_SIZE_MB}MB por archivo</small>
            </div>
            
            {/* MENSAJES DE ERROR */}
            {fileError && (
                <div className="file-error-message">
                    <XCircle size={20} style={{ marginRight: '8px' }} />
                    {fileError}
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
                        disabled={userCredits < files.length}
                    >
                        Optimizar Ahora ({files.length} Créditos)
                    </button>
                    {userCredits < files.length && 
                        <small className="credit-alert">Necesitas {files.length - userCredits} créditos adicionales.</small>
                    }
                </div>
            )}

        </section>
    );
}

// ---------------------------------------------
// COMPONENTE PRINCIPAL: DashboardPage (FUNCIONES REINTEGRADAS)
// ---------------------------------------------
export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();


    // === FUNCIONES DE SERVICIO REINTEGRADAS ===
    
    // 1. Copiar API Key (FALTA y causa el error)
    const copyApiKey = () => {
        if (typeof window !== 'undefined') {
            const apiKey = localStorage.getItem('apiKey');
            if (apiKey) {
                navigator.clipboard.writeText(apiKey)
                    .then(() => {
                        // Idealmente, usar un toast o un estado temporal para dar feedback
                        alert('API Key copiada al portapapeles!');
                    })
                    .catch(err => {
                        console.error('Error al copiar:', err);
                        alert('No se pudo copiar la API Key.');
                    });
            } else {
                alert('No se encontró ninguna API Key. Por favor, inicia sesión de nuevo.');
            }
        }
    };
    
    // 2. Manejar la compra con Paddle (FALTA)
    const handlePurchase = (planId) => {
        if (typeof window !== 'undefined' && window.Paddle) {
            // El email debe obtenerse del estado del usuario si está disponible
            const userEmail = user ? user.email : '';

            window.Paddle.Checkout.open({
                product: planId, // Usamos el ID del plan de ejemplo
                email: userEmail,
                // Parámetros opcionales para seguimiento o webhooks
                passthrough: {
                    user_id: user ? user.id : 'unknown',
                    plan_name: 'Pro Credits Top-up',
                },
                successCallback: (data) => {
                    // Después de una compra exitosa, debes actualizar los créditos del usuario
                    alert('¡Compra exitosa! Actualizando tus créditos...');
                    // Recargar los datos del usuario para reflejar los nuevos créditos
                    fetchUserData(localStorage.getItem('accessToken')); 
                }
            });
        } else {
            alert('Paddle no está cargado. Intenta recargar la página.');
        }
    };
    // === FIN FUNCIONES DE SERVICIO ===


    const handleLogout = () => {
        localStorage.clear(); 
        router.push('/'); 
    };

    const fetchUserData = useCallback(async (accessToken) => {
        try {
            const response = await fetch(`${API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`, 
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.clear(); 
                setError('Sesión expirada o no válida. Por favor, inicia sesión.');
                router.replace('/'); 
            }
        } catch (err) {
            setError('Error de conexión con la API. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }, [router]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.replace('/'); 
                setLoading(false); 
                return;
            }
            fetchUserData(token);
        }
    }, [router, fetchUserData]); 

    // Función para manejar la finalización de la optimización y actualizar créditos
    const handleOptimizeStart = (creditsUsed) => {
        if (user) {
             setUser(prevUser => ({
                ...prevUser,
                credits_remaining: prevUser.credits_remaining - creditsUsed
            }));
        }
        alert(`Optimización iniciada. ${creditsUsed} créditos usados (simulado).`);
    };
    
    // --- Lógica de renderizado de loading/error ---
    if (loading) {
        return (
            <div className="full-screen-center">
                <div className="loading-state">
                    <RefreshCw size={40} className="spinner" />
                    <p>Verificando sesión. Un momento...</p>
                </div>
            </div>
        );
    }

    if (error) {
         return (
            <div className="full-screen-center">
                <div className="error-state">
                    <AlertTriangle size={40} color="#FF7F50" />
                    <p className="error-message">{error}</p>
                    <button onClick={() => router.replace('/')} className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Ir al Inicio
                    </button>
                </div>
            </div>
        );
    }
    
    if (!user) return null; 

    // --- RENDERIZADO DEL DASHBOARD ---
    
    const planName = user.plan_id === 1 ? "Básico (Gratuito)" : `Pro (ID: ${user.plan_id})`;
    const creditStatusClass = user.credits_remaining > 50 ? 'ok' : user.credits_remaining > 10 ? 'warning' : 'low';


    return (
        <>
            <Script
                src="https://cdn.paddle.com/paddle/paddle.js"
                onLoad={() => {
                    if (typeof window.Paddle !== 'undefined') {
                        window.Paddle.Setup({ token: PADDLE_CLIENT_SIDE_TOKEN });
                        console.log("Paddle.js inicializado.");
                    }
                }}
            />

            <DashboardHeader userEmail={user.email} onLogout={handleLogout} />

            <div className="dashboard-wrapper app-container"> 
                <h1 className="main-title">Panel de Control</h1>

                <div className="metric-grid">
                    <MetricCard 
                        icon={Package}
                        title="Plan Activo"
                        value={planName}
                        statusClass={creditStatusClass}
                    />
                    
                    <MetricCard 
                        icon={Zap}
                        title="Créditos Restantes"
                        value={user.credits_remaining}
                        statusClass={creditStatusClass}
                        actionButton={
                            <button
                                onClick={() => handlePurchase(DEFAULT_PADDLE_PLAN_ID)} // LLAMADA REINTEGRADA
                                className="btn btn-primary btn-small"
                            >
                                Recargar
                            </button>
                        }
                    />
                    
                    <MetricCard 
                        icon={Code}
                        title="Tu API Key"
                        value={localStorage.getItem('apiKey') ? "Disponible" : "Generar"}
                        statusClass={localStorage.getItem('apiKey') ? 'ok' : 'low'}
                        actionButton={
                            <button 
                                onClick={copyApiKey} // LLAMADA REINTEGRADA
                                className="btn btn-secondary btn-small"
                            >
                                <Copy size={16} style={{ marginRight: '5px' }} /> Copiar Key
                            </button>
                        }
                    />
                </div>
                
                <FileDropzone userCredits={user.credits_remaining} onOptimizeStart={handleOptimizeStart} />

                <p className="footer-note">¿Necesitas ayuda con la integración? Consulta nuestra documentación.</p>
            </div>
        </>
    );
}