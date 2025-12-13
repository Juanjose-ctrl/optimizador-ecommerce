// src/app/dashboard/page.js - VERSIÓN FINAL PROFESIONAL, CORREGIDA Y CON ESTILO

'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script'; 
import { UploadCloud, Zap, Code, LogOut, Copy, RefreshCw, AlertTriangle, Package } from 'lucide-react'; 

// --- Configuración de la API y Paddle ---
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
const PADDLE_CLIENT_SIDE_TOKEN = "ctm_01kbxtv3hhwg1rhak5rjp83eh7"; 
// Plan ID de ejemplo (debe ser el ID real de tu producto en Paddle)
const DEFAULT_PADDLE_PLAN_ID = 'pri_01h6t465fgq8h4r37t9m0l1u5v'; 


// ---------------------------------------------
// COMPONENTE: DashboardHeader (Barra superior fija y limpia)
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
// COMPONENTE: Card de Métricas
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
// COMPONENTE PRINCIPAL: DashboardPage
// ---------------------------------------------
export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    // Función para cerrar sesión y redirigir
    const handleLogout = () => {
        localStorage.clear(); 
        router.push('/'); // Redirigimos a la Landing Page principal
    };

    // Función para obtener los datos del usuario
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
                // Si la API rechaza el token (expirado, inválido)
                localStorage.clear(); 
                setError('Sesión expirada o no válida. Por favor, inicia sesión.');
                router.replace('/'); // Usamos replace para evitar el historial
            }
        } catch (err) {
            setError('Error de conexión con la API. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }, [router]);


    useEffect(() => {
        // CORRECCIÓN CLAVE: Verificación de sesión al montar
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


    // --- Funciones de Utilidad ---
    const copyApiKey = () => {
        const apiKey = localStorage.getItem('apiKey');
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            alert("¡API Key copiada al portapapeles!");
        }
    };
    
    // Función de Compra con Paddle (ACTUALIZADA)
    const handlePurchase = async (priceId) => {
        // Esto solo funciona si ya cargaste el script de Paddle.js
        if (typeof window.Paddle === 'undefined') {
            alert("Paddle no está inicializado. Recarga la página.");
            return;
        }

        // Abrir el Checkout de Paddle
        window.Paddle.Checkout.open({
            product: priceId, 
            customer: {
                email: user.email, // Pasamos el email del usuario
                // Paddle identificará a este cliente si ya existía.
            },
            passthrough: {
                user_id: user.id, // ID interno de tu usuario para seguimiento
                // otros_datos_relevantes: '...'
            }
            // Agrega más opciones si es necesario (ej. plan de suscripción)
        });
    };
    
    // --- LÓGICA DE RENDERIZADO ---

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
    
    if (!user) return null; // Debe ser atrapado por loading o error, pero es una seguridad

    // --- RENDERIZADO DEL DASHBOARD ---
    
    const planName = user.plan_id === 1 ? "Básico (Gratuito)" : `Pro (ID: ${user.plan_id})`;
    const creditStatusClass = user.credits_remaining > 50 ? 'ok' : user.credits_remaining > 10 ? 'warning' : 'low';


    return (
        <>
            {/* INICIALIZACIÓN DE PADDLE.JS */}
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

                {/* FILA DE MÉTRICAS */}
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
                                onClick={() => handlePurchase(DEFAULT_PADDLE_PLAN_ID)}
                                className="btn btn-primary btn-small"
                            >
                                Recargar
                            </button>
                        }
                    />
                    
                    <MetricCard 
                        icon={Code}
                        title="Tu API Key"
                        value={user.apiKey ? "Disponible" : "Generar"}
                        statusClass={user.apiKey ? 'ok' : 'low'}
                        actionButton={
                            <button 
                                onClick={copyApiKey}
                                className="btn btn-secondary btn-small"
                            >
                                <Copy size={16} style={{ marginRight: '5px' }} /> Copiar Key
                            </button>
                        }
                    />
                </div>
                
                {/* SECCIÓN PRINCIPAL DE OPTIMIZACIÓN */}
                <section className="optimization-section">
                    <div className="section-header">
                        <h2><UploadCloud size={24} style={{ marginRight: '10px' }} /> Optimiza tu Imagen</h2>
                        <span className="info-text">1 archivo = 1 crédito</span>
                    </div>

                    {/* ZONA DE DROPZONE (Mockup Limpio) */}
                    <div className="dropzone-area">
                        <UploadCloud size={60} color="var(--text-color-secondary)" />
                        <p className="dropzone-text">Arrastra y suelta aquí tu imagen de producto</p>
                        <button className="btn btn-primary btn-large">Subir y Optimizar</button>
                        <small className="file-info">Soporte: JPEG, PNG | Máx. 10MB</small>
                    </div>

                    {/* FUTURAS GRÁFICAS Y ESTADÍSTICAS AQUÍ */}
                </section>

                <p className="footer-note">¿Necesitas ayuda con la integración? Consulta nuestra documentación.</p>
            </div>
        </>
    );
}