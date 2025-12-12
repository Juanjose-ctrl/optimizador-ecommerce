// src/app/page.js
'use client'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter para redirección

// 🚨 Define la URL de tu API (¡VERIFICA ESTA URL!)
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Cargando...");
  const [isApiAlive, setIsApiAlive] = useState(false);
  const router = useRouter(); // Inicializar el router

  const checkApiStatus = async () => {
    try {
      // 🚨 CORRECCIÓN CLAVE: Usar el endpoint /health (si lo agregaste al Backend)
      const response = await fetch(API_URL + "/health"); 
      
      if (response.ok) {
        setIsApiAlive(true);
        const data = await response.json();
        // Si la conexión es OK, redirigir inmediatamente
        router.push('/login'); 
        setApiStatus(`API OK: ${data.service} - Listo para iniciar sesión.`);

      } else {
        // Si la conexión devuelve cualquier otro código (404, 500, etc.)
        setIsApiAlive(false); 
        setApiStatus(`¡API Inaccesible! Código: ${response.status}. Revisa CORS o el Backend.`);
      }
    } catch (error) {
      // Fallo total de red o CORS
      setIsApiAlive(false);
      setApiStatus(`Error de red: La API de Render no está accesible. Revisa CORS o el servidor.`);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []); 
  
  // 🚨 REDIRECCIÓN RÁPIDA: Si isApiAlive cambia a true, significa que la verificación tuvo éxito,
  // pero el router.push() dentro de checkApiStatus() ya se encargó de la redirección.
  // Mantenemos el return para mostrar el estado mientras carga.

  return (
    <main className="main-container"> 
      <div className="card-container"> 
        <h1 style={{ marginBottom: '10px' }}>Portal de Optimización eCommerce</h1>
        
        <div className="info-card credit-card">
          <h2>Estado de la Plataforma</h2>
          <p style={{ fontWeight: 'normal', fontSize: '1em', color: 'var(--text-color)' }}>
            Verificando la conexión con el servidor de Backend (FastAPI en Render)...
          </p>
          <p className={`credit-status ${isApiAlive ? 'status-ok' : 'status-low'}`} style={{ marginTop: '15px' }}>
            {apiStatus}
          </p>
        </div>
        
        {/* Los enlaces solo se muestran si la API no está viva o aún está cargando */}
        {!isApiAlive && apiStatus !== "Cargando..." && (
            <p style={{ marginTop: '25px', fontSize: '1.1em' }}>
                <a href="/login" style={{ marginRight: '20px' }}>🔑 Iniciar Sesión</a> 
                <a href="/registro">✨ Registrarse (100 créditos Free)</a>
            </p>
        )}
      </div>
    </main>
  );
}