// src/app/dashboard/page.js - VERSIÓN CORREGIDA PARA PLANES DINÁMICOS

'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script'; 
import { UploadCloud, Zap, Code, LogOut, Copy, RefreshCw, AlertTriangle, Package, XCircle, FileImage, Trash2, DollarSign, PackageCheck, Rocket, Landmark } from 'lucide-react'; 

// --- Configuración de la API y Paddle ---
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
const PADDLE_CLIENT_SIDE_TOKEN = "ctm_01kbxtv3hhwg1rhak5rjp83eh7"; 
// NOTA: DEFAULT_PADDLE_PLAN_ID ya no se usará directamente, se usará el plan.paddle_product_id
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

// Mapeo de iconos para planes (opcional, si el backend no los provee)
const PLAN_ICONS = {
    // Usamos el ID de la base de datos (1=Free, 2=Basic, 3=Pro, 4=Enterprise)
    1: <Package size={24} style={{ marginRight: '8px' }} />, // Free
    2: <PackageCheck size={24} style={{ marginRight: '8px' }} />, // Basic
    3: <Rocket size={24} style={{ marginRight: '8px' }} />, // Pro
    4: <Landmark size={24} style={{ marginRight: '8px' }} />, // Enterprise
};

// ---------------------------------------------
// COMPONENTE: PlanCard (NUEVO)
// ---------------------------------------------
const PlanCard = ({ plan, onPurchase }) => {
    // Formatear el precio y la cantidad
    const priceDisplay = plan.price === 0 ? "Gratis" : `$${plan.price.toFixed(2)}/mes`;
    const limitDisplay = plan.image_limit === 50000 ? "Ilimitado*" : `${plan.image_limit} créditos`; // Suponiendo 50000 como "ilimitado"

    return (
        <div className={`plan-card plan-card-${plan.name.toLowerCase()}`}>
            <div className="plan-header">
                {PLAN_ICONS[plan.id]}
                <h3>{plan.name}</h3>
            </div>
            <p className="plan-description">{limitDisplay}</p>
            <div className="plan-price">
                <span className="price">{priceDisplay}</span>
            </div>
            <ul className="plan-features">
                <li><CheckCircle size={16} /> Optimización de alta velocidad</li>
                <li><CheckCircle size={16} /> Soporte WebP/JPEG/PNG</li>
                {plan.id > 1 && <li><CheckCircle size={16} /> Acceso a API Key</li>}
                {plan.id >= 3 && <li><CheckCircle size={16} /> Optimización por Lotes</li>}
            </ul>
            <button 
                className={`btn btn-primary ${plan.id === 1 ? 'btn-secondary' : ''}`}
                onClick={() => onPurchase(plan.paddle_product_id)}
                disabled={plan.id === 1 || !plan.paddle_product_id} // No se compra el plan Free
            >
                {plan.id === 1 ? "Tu Plan Actual" : "Comprar Ahora"}
            </button>
            {plan.image_limit === 50000 && <small className="plan-note">*{plan.name} tiene un límite técnico de {plan.image_limit} imágenes.</small>}
        </div>
    );
};


// ---------------------------------------------
// COMPONENTES EXISTENTES (Mismos que el usuario proporcionó)
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

const FileDropzone = ({ userCredits, onOptimizeStart }) => {
    //... (El contenido de FileDropzone permanece exactamente igual, solo se actualiza en el script FileDropzone.js)
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
// COMPONENTE PRINCIPAL: DashboardPage (MODIFICADO)
// ---------------------------------------------
export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]); // 🚨 NUEVO ESTADO PARA LOS PLANES
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();


    // === FUNCIONES DE SERVICIO REINTEGRADAS ===
    
    const copyApiKey = () => {
        if (typeof window !== 'undefined') {
            const apiKey = localStorage.getItem('apiKey');
            if (apiKey) {
                navigator.clipboard.writeText(apiKey)
                    .then(() => {
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
    
    // 2. Manejar la compra con Paddle (USANDO EL ID DE PRODUCTO REAL)
    const handlePurchase = (paddleProductId) => {
        if (!paddleProductId) {
            alert("Error: ID de producto de Paddle no definido.");
            return;
        }

        if (typeof window !== 'undefined' && window.Paddle) {
            const userEmail = user ? user.email : '';
            const planToPurchase = plans.find(p => p.paddle_product_id === paddleProductId);
            
            window.Paddle.Checkout.open({
                product: paddleProductId, 
                email: userEmail,
                // Usamos passthrough para identificar al usuario en el webhook de Paddle
                passthrough: {
                    user_id: user ? user.id : 'unknown',
                    plan_name: planToPurchase ? planToPurchase.name : 'Unknown Plan',
                },
                successCallback: (data) => {
                    alert('¡Compra exitosa! Actualizando tus créditos y plan...');
                    // Recargar los datos del usuario para reflejar los nuevos créditos/plan
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

    // 🚨 NUEVA FUNCIÓN: Fetch de planes
    const fetchPlans = useCallback(async () => {
        try {
            // Llama al endpoint público /api/plans/ que creamos en el backend
            const response = await fetch(`${API_URL}/plans/`); 
            
            if (response.ok) {
                const fetchedPlans = await response.json();
                // Filtramos el plan Free (ID=1) ya que el dashboard solo debe mostrar planes de pago.
                // Sin embargo, si lo quieres para la sección de precios, podrías dejarlo. 
                // Para el DASHBOARD, generalmente solo se muestran los planes de mejora. 
                // Lo incluiremos, pero lo marcaremos como no comprable.
                setPlans(fetchedPlans);
            } else {
                console.error("Error al cargar los planes:", response.status);
            }
        } catch (err) {
            console.error('Error de conexión al cargar planes:', err);
        }
    }, []);

    const fetchUserData = useCallback(async (accessToken) => {
        //... (función fetchUserData sin cambios)
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
            fetchPlans(); // 🚨 Llamar al fetch de planes
        }
    }, [router, fetchUserData, fetchPlans]); 

    // Función para manejar la finalización de la optimización y actualizar créditos (simulada)
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

    // Obtener el plan actual del usuario
    const currentPlan = plans.find(p => p.id === user.plan_id);
    const planName = currentPlan ? currentPlan.name : "Desconocido";

    const creditStatusClass = user.credits_remaining > 500 ? 'ok' : user.credits_remaining > 50 ? 'warning' : 'low'; // Ajustamos los umbrales

    const isFreePlan = user.plan_id === 1;

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

                {/* --- SECCIÓN DE MÉTRICAS --- */}
                <div className="metric-grid">
                    <MetricCard 
                        icon={Package}
                        title="Plan Activo"
                        value={planName}
                        statusClass={isFreePlan ? 'low' : 'ok'}
                    />
                    
                    <MetricCard 
                        icon={Zap}
                        title="Créditos Restantes"
                        value={user.credits_remaining}
                        statusClass={creditStatusClass}
                        actionButton={
                            <a href="#plans-section" className="btn btn-primary btn-small"> 
                                Ver Planes
                            </a>
                        }
                    />
                    
                    <MetricCard 
                        icon={Code}
                        title="Tu API Key"
                        value={localStorage.getItem('apiKey') ? "Disponible" : "Generar"}
                        statusClass={!isFreePlan ? 'ok' : 'low'}
                        actionButton={
                            <button 
                                onClick={copyApiKey} 
                                className="btn btn-secondary btn-small"
                                disabled={isFreePlan} // Deshabilitar si está en el plan gratuito
                            >
                                <Copy size={16} style={{ marginRight: '5px' }} /> {isFreePlan ? 'Solo planes de pago' : 'Copiar Key'}
                            </button>
                        }
                    />
                </div>
                
                {/* --- SECCIÓN DE OPTIMIZACIÓN --- */}
                <FileDropzone userCredits={user.credits_remaining} onOptimizeStart={handleOptimizeStart} />

                {/* --- SECCIÓN DE PLANES --- */}
                <section id="plans-section" className="section-plans">
                    <h2 className="section-title"><DollarSign size={28} style={{ marginRight: '10px' }} /> Actualiza tu Plan</h2>
                    
                    {plans.length === 0 ? (
                        <p>Cargando planes...</p>
                    ) : (
                        <div className="plans-grid">
                            {plans
                                .filter(p => p.id !== user.plan_id) // 🚨 Filtramos el plan actual
                                .filter(p => p.id !== 1) // 🚨 Filtramos el Plan Free (ID=1)
                                .sort((a, b) => a.image_limit - b.image_limit) // Ordenar por límite de créditos
                                .map(plan => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    onPurchase={handlePurchase}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <p className="footer-note">¿Necesitas ayuda con la integración? Consulta nuestra documentación.</p>
            </div>
        </>
    );
}