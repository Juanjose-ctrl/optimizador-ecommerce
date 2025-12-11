// src/app/dashboard/page.js (¡CÓDIGO MODIFICADO!)
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// 🚨 Importar Script de Next.js para cargar el SDK de Paddle
import Script from 'next/script'; 

const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

// 🚨 CRÍTICO: Token de Cliente de Paddle (Clave Pública)
// Reemplaza 'TEST_PUB_XXXXXX' con tu clave pública de Paddle
const PADDLE_CLIENT_SIDE_TOKEN = "ctm_01kbxtv3hhwg1rhak5rjp83eh7"; 

export default function DashboardPage() {
    // ... (Estados y useEffect sin cambios hasta aquí) ...
    // ... (fetchUserData, copyApiKey, handleLogout sin cambios) ...

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
                // Opcional: Callback de éxito (la asignación de créditos la hace el Webhook, no el frontend)
                successCallback: (data) => {
                    alert("¡Compra exitosa! Actualiza tu dashboard en unos segundos para ver los créditos.");
                    // Forzar una recarga suave de datos del usuario
                    fetchUserData(accessToken); 
                },
                // Opcional: Callback de cierre
                closeCallback: () => {
                    console.log("Modal de compra cerrado por el usuario.");
                }
            });

        } catch (error) {
            console.error("Error en el proceso de compra:", error);
            alert(`Fallo en la compra: ${error.message}`);
        }
    };
    // ... (Resto del código: if (loading), if (error) sin cambios) ...

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
                    {/* CRÍTICO: Si la respuesta de /users/me no incluye plan_name, usa plan_id */}
                    <p><strong>Plan Actual:</strong> Plan ID {user.plan_id}</p> 
                    <p className={`credit-status ${user.credits_remaining > 0 ? 'status-ok' : 'status-low'}`}>
                        Créditos Restantes: {user.credits_remaining}
                    </p>
                    
                    {/* 🚨 PASO 3. Conectar el botón a la función handlePurchase */}
                    {/* Asumiendo que Plan Pro es el ID 3 (según models.py) */}
                    <button
                        onClick={() => handlePurchase(3)}
                        className="button-buy"
                    >
                        Comprar Más Créditos (¡Actualizar a Plan Pro!)
                    </button>
                </div>
                {/* ... (Resto del Dashboard: API Key y Logout) ... */}
            </div>
        </div>
    );
}