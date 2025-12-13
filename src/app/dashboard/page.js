// src/app/dashboard/page.js - VERSIÓN CORREGIDA PARA PLANES DINÁMICOS

'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script'; 
import { 
    UploadCloud, Zap, Code, LogOut, Copy, RefreshCw, AlertTriangle, 
    Package, XCircle, FileImage, Trash2, DollarSign, PackageCheck, 
    Rocket, Landmark, CheckCircle // 🚨 Agregado CheckCircle
} from 'lucide-react'; 

// 🚨 CRÍTICO: Importamos el Wrapper de cliente para cargar el FileDropzone
import ClientDropzoneWrapper from '../components/ClientDropzoneWrapper'; 

// --- Configuración de la API y Paddle ---
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
const PADDLE_CLIENT_SIDE_TOKEN = "ctm_01kbxtv3hhwg1rhak5rjp83eh7"; 
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

// Mapeo de iconos para planes
const PLAN_ICONS = {
    1: <Package size={24} style={{ marginRight: '8px' }} />, // Free
    2: <PackageCheck size={24} style={{ marginRight: '8px' }} />, // Basic
    3: <Rocket size={24} style={{ marginRight: '8px' }} />, // Pro
    4: <Landmark size={24} style={{ marginRight: '8px' }} />, // Enterprise
};

// ---------------------------------------------
// COMPONENTE: PlanCard
// ---------------------------------------------
const PlanCard = ({ plan, onPurchase }) => {
    // Formatear el precio y la cantidad
    const priceDisplay = plan.price === 0 ? "Gratis" : `$${plan.price.toFixed(2)}/mes`;
    const limitDisplay = plan.image_limit === 50000 ? "Ilimitado*" : `${plan.image_limit} créditos`; 

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
                <li><CheckCircle size={16} style={{ marginRight: '5px' }} /> Optimización de alta velocidad</li>
                <li><CheckCircle size={16} style={{ marginRight: '5px' }} /> Soporte WebP/JPEG/PNG</li>
                {plan.id > 1 && <li><CheckCircle size={16} style={{ marginRight: '5px' }} /> Acceso a API Key</li>}
                {plan.id >= 3 && <li><CheckCircle size={16} style={{ marginRight: '5px' }} /> Optimización por Lotes</li>}
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
// COMPONENTES EXISTENTES
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

// 🚨 ELIMINADO EL CÓDIGO DE FileDropzone: 
// La lógica de cliente (useState, handleDrag, etc.) fue movida a 
// './components/FileDropzone.js' para evitar errores de prerender en Next.js.
// El FileDropzone debe ser importado y usado a través de un Client Wrapper.


// ---------------------------------------------
// COMPONENTE PRINCIPAL: DashboardPage
// ---------------------------------------------
export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]); 
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
        
    // Manejar la compra con Paddle
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
                passthrough: {
                    user_id: user ? user.id : 'unknown',
                    plan_name: planToPurchase ? planToPurchase.name : 'Unknown Plan',
                },
                successCallback: (data) => {
                    alert('¡Compra exitosa! Actualizando tus créditos y plan...');
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

    // Fetch de planes
    const fetchPlans = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/plans/`); 
            
            if (response.ok) {
                const fetchedPlans = await response.json();
                setPlans(fetchedPlans);
            } else {
                console.error("Error al cargar los planes:", response.status);
            }
        } catch (err) {
            console.error('Error de conexión al cargar planes:', err);
        }
    }, []);

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
            fetchPlans(); 
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

    const creditStatusClass = user.credits_remaining > 500 ? 'ok' : user.credits_remaining > 50 ? 'warning' : 'low'; 

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
                                disabled={isFreePlan} 
                            >
                                <Copy size={16} style={{ marginRight: '5px' }} /> {isFreePlan ? 'Solo planes de pago' : 'Copiar Key'}
                            </button>
                        }
                    />
                </div>
                
                {/* --- SECCIÓN DE OPTIMIZACIÓN (Usando el Client Wrapper) --- */}
                <ClientDropzoneWrapper 
                    userCredits={user.credits_remaining} 
                    onOptimizeStart={handleOptimizeStart}
                    // Asegúrate de pasar todas las props que necesita FileDropzone
                />

                {/* --- SECCIÓN DE PLANES --- */}
                <section id="plans-section" className="section-plans">
                    <h2 className="section-title"><DollarSign size={28} style={{ marginRight: '10px' }} /> Actualiza tu Plan</h2>
                    
                    {plans.length === 0 ? (
                        <p>Cargando planes...</p>
                    ) : (
                        <div className="plans-grid">
                            {plans
                                .filter(p => p.id !== user.plan_id) 
                                .filter(p => p.id !== 1) // Filtramos el Plan Free (ID=1) de la venta
                                .sort((a, b) => a.image_limit - b.image_limit) 
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