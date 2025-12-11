// src/app/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// 🚨 Importar Script de Next.js para cargar el SDK de Paddle
import Script from 'next/script'; 

const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

// 🚨 CRÍTICO: Token de Cliente de Paddle (Clave Pública)
const PADDLE_CLIENT_SIDE_TOKEN = "ctm_01kbxtv3hhwg1rhak5rjp83eh7"; 

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchUserData = async (accessToken) => {
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
                setError('Sesión expirada. Por favor, inicia sesión de nuevo.');
                router.push('/login'); 
            }
        } catch (err) {
            setError('Error de conexión con la API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchUserData(token);
    }, []); 

    const copyApiKey = () => {
        const apiKey = localStorage.getItem('apiKey');
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            alert("¡API Key copiada al portapapeles!");
        }
    };
    
    const handleLogout = () => {
        localStorage.clear(); 
        router.push('/login');
    };


    // --- NUEVA FUNCIÓN: Manejar la Compra con Paddle ---
    const handlePurchase = async (planId) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            alert("Sesión no válida. Por favor, inicia sesión.");
            router.push('/login');
            return;
        }

        try {
            // 1. Llamar a tu API (Render) para generar la URL de checkout segura
            const response = await fetch(`${API_URL}/api/plans/checkout/${planId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`, 
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || "Error al obtener el enlace de pago.");
            }

            const data = await response.json();
            const checkoutUrl = data.checkout_url;

            // 2. Abrir el modal de Paddle (Se requiere que Paddle.js esté cargado)
            if (typeof window.Paddle === 'undefined') {
                alert("El SDK de Paddle no se ha cargado. Espera un momento y vuelve a intentarlo.");
                return;
            }

            window.Paddle.Checkout.open({
                url: checkoutUrl,
                successCallback: (data) => {
                    alert("¡Compra exitosa! Actualiza tu dashboard en unos segundos para ver los créditos.");
                    // Forzar una recarga suave de datos del usuario
                    fetchUserData(accessToken); 
                },
                closeCallback: () => {
                    console.log("Modal de compra cerrado por el usuario.");
                }
            });

        } catch (error) {
            console.error("Error en el proceso de compra:", error);
            alert(`Fallo en la compra: ${error.message}`);
        }
    };
    
    // --- LÓGICA DE PROTECCIÓN DE RENDERIZADO (CORRECCIÓN) ---

    if (loading) {
        return <p className="loading-message">Cargando Panel...</p>;
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }
    
    // 🚨 CORRECCIÓN CLAVE: Si ya no está cargando y no hay error, pero 'user' es null,
    // significa que algo falló o que estamos esperando la hidratación en el cliente.
    // Aunque el error de Vercel fue por pre-renderizado, esto protege el código
    // de intentar acceder a 'user.email' si no existe.
    if (!user) {
        // En el servidor (pre-render), esto evita el fallo.
        // En el cliente, esto asegura que 'user' tiene datos válidos.
        return <p className="error-message">Error: No se pudo cargar la información del usuario.</p>;
    }

    return (
        // 🚨 PASO 1. Cargar el SDK de Paddle ANTES que el resto del contenido
        <div className="dashboard-wrapper"> 
            <Script
                src="https://cdn.paddle.com/paddle/paddle.js"
                onLoad={() => {
                    // 🚨 PASO 2. Inicializar Paddle.js (Setup)
                    if (typeof window.Paddle !== 'undefined') {
                        window.Paddle.Setup({ token: PADDLE_CLIENT_SIDE_TOKEN });
                        console.log("Paddle.js inicializado.");
                    }
                }}
            />

            <div className="dashboard-container">
                <h1>👋 ¡Bienvenido, {user.email}!</h1>
                
                {/* 1. SECCIÓN DE CRÉDITOS Y PLAN */}
                <div className="info-card credit-card">
                    <h2>Estado de tu Cuenta</h2>
                    <p><strong>Plan Actual:</strong> Plan ID {user.plan_id}</p> 
                    <p className={`credit-status ${user.credits_remaining > 0 ? 'status-ok' : 'status-low'}`}>
                        Créditos Restantes: {user.credits_remaining}
                    </p>
                    
                    {/* 🚨 Conectar el botón a la función handlePurchase */}
                    <button
                        onClick={() => handlePurchase(3)}
                        className="button-buy"
                    >
                        Comprar Más Créditos (¡Actualizar a Plan Pro!)
                    </button>
                </div>

                {/* 2. SECCIÓN API KEY */}
                <div className="info-card api-key-card">
                    <h2>Integración (Para desarrolladores)</h2>
                    <p>Esta es tu clave secreta para automatizar la optimización.</p>
                    <div className="api-key-display">
                        <code className="api-key-code">
                            {localStorage.getItem('apiKey')}
                        </code>
                        <button 
                            onClick={copyApiKey}
                            className="button-primary"
                        >
                            Copiar Key
                        </button>
                    </div>
                </div>
                
                {/* 3. Botón de Logout */}
                <button 
                    onClick={handleLogout}
                    className="button-logout"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}