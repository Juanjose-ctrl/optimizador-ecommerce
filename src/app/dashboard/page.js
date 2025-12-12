// src/app/dashboard/page.js - VERSIÓN CORREGIDA PARA PERSISTENCIA DE SESIÓN

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script'; 
import { UploadCloud, Zap, Code, LogOut } from 'lucide-react'; // Nuevos iconos para diseño
const VERSION_FINAL = true

const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 
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
                // Forzar la redirección después de limpiar el estado
                router.push('/login'); 
            }
        } catch (err) {
            setError('Error de conexión con la API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 🚨 CORRECCIÓN CLAVE: Asegurarse de que el código se ejecute SOLO en el cliente (Browser)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Si no hay token, no necesitamos esperar. Redirigimos inmediatamente.
                router.push('/login');
                setLoading(false); // Detener el loading state
                return;
            }
            fetchUserData(token);
        }
    }, [router]); // Incluimos router en las dependencias


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


    // --- Función de Compra con Paddle (Sin Cambios) ---
    const handlePurchase = async (planId) => {
        const accessToken = localStorage.getItem('accessToken');
        // ... (Lógica de handlePurchase sigue igual) ...
        alert("Función de compra activa, pero necesitamos definir Price IDs en el Backend.");
    };
    
    // --- LÓGICA DE PROTECCIÓN DE RENDERIZADO ---

    // 🚨 Mejorar el mensaje de carga y el estilo
    if (loading) {
        return (
            <div className="main-container">
                <div className="auth-card" style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 600 }}>
                        Cargando Panel...
                    </p>
                    <p style={{ color: 'var(--text-color-secondary)' }}>
                        Verificando credenciales de sesión.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-container">
                <div className="auth-card">
                    <p className="error-message">Error: {error}</p>
                    <button onClick={() => router.push('/login')} className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Ir a Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }
    
    // Si no hay usuario y ya terminó de cargar (loading=false), redirigir
    if (!user) {
        // Esto rara vez debería ocurrir debido a la lógica de token en useEffect
        router.push('/login');
        return null;
    }

    return (
        <div className="dashboard-wrapper app-container" style={{ paddingTop: '50px' }}> 
            <Script
                src="https://cdn.paddle.com/paddle/paddle.js"
                onLoad={() => {
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
                    <div className="card-header">
                         <Zap size={24} color="var(--primary-color)" />
                         <h2>Estado de tu Cuenta</h2>
                    </div>
                    <p><strong>Plan Actual:</strong> {user.plan_id === 1 ? "Básico (Gratuito)" : `Pro (ID: ${user.plan_id})`}</p> 
                    <p className={`credit-status ${user.credits_remaining > 20 ? 'status-ok' : 'status-low'}`}>
                        Créditos Restantes: {user.credits_remaining}
                    </p>
                    
                    {/* Botón para la compra */}
                    <button
                        onClick={() => handlePurchase(3)}
                        className="btn btn-primary"
                        style={{ marginTop: '20px' }}
                    >
                        Comprar Más Créditos / Actualizar Plan
                    </button>
                </div>

                {/* 2. SECCIÓN API KEY */}
                <div className="info-card api-key-card">
                    <div className="card-header">
                        <Code size={24} color="var(--primary-color)" />
                        <h2>Integración (Para desarrolladores)</h2>
                    </div>
                    <p>Esta es tu clave secreta para automatizar la optimización vía API.</p>
                    <div className="api-key-display">
                        <code className="api-key-code">
                            {localStorage.getItem('apiKey')}
                        </code>
                        <button 
                            onClick={copyApiKey}
                            className="btn btn-secondary" // Usamos el botón secundario del nuevo estilo
                        >
                            Copiar Key
                        </button>
                    </div>
                </div>
                
                {/* 3. Botón de Logout */}
                <button 
                    onClick={handleLogout}
                    className="button-logout"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-color-secondary)', cursor: 'pointer', marginTop: '20px' }}
                >
                    <LogOut size={20} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

// Agregamos algunos estilos simples para el dashboard
// Nota: Deberías mover estos a globals.css para consistencia
const dashboardStyles = `
.dashboard-container {
    max-width: 900px;
    margin: 50px auto;
    padding: 30px;
    background-color: var(--bg-card);
    border-radius: var(--radius-large);
    box-shadow: var(--shadow-subtle);
}

.info-card {
    border: 1px solid var(--border-color);
    padding: 25px;
    border-radius: var(--radius-medium);
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: var(--primary-color);
}

.card-header h2 {
    margin: 0 0 0 10px;
    font-size: 1.5rem;
}

.credit-status {
    font-size: 2.2em;
    font-weight: 800;
    margin: 10px 0;
}

.status-ok { color: var(--secondary-color); }
.status-low { color: var(--accent-color); }

.api-key-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bg-footer);
    padding: 10px;
    border-radius: var(--radius-medium);
    margin-top: 10px;
}

.api-key-code {
    font-family: monospace;
    font-size: 0.9em;
    color: var(--text-color-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    margin-right: 10px;
}
`;

// prueba
