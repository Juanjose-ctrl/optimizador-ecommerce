// src/app/page.js
'use client'; 
import { useState, useEffect } from 'react';

// 🚨 Define la URL de tu API (¡VERIFICA ESTA URL!)
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Cargando...");
  const [isApiAlive, setIsApiAlive] = useState(false);

  const checkApiStatus = async () => {
    try {
      // Llamada simple GET al endpoint /status
      const response = await fetch(API_URL + "/status"); 
      
      if (response.ok) {
        setIsApiAlive(true);
        const data = await response.json();
        setApiStatus(`API OK: ${data.message} (Server: Render)`);
      } else {
        // Estado 422, que indica que la conexión base está OK
        setIsApiAlive(true); 
        setApiStatus(`¡Conexión OK! (Error: ${response.status}). Listo para Login/Registro.`);
      }
    } catch (error) {
      setIsApiAlive(false);
      setApiStatus(`Error de red: La API de Render no está accesible. Revisa CORS o el servidor.`);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []); 

  return (
    <main className="main-container"> {/* Clase global para centrar contenido */}
      <div className="card-container"> {/* Reutilizamos el estilo del contenedor de tarjetas */}
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
        
        <p style={{ marginTop: '25px', fontSize: '1.1em' }}>
            <a href="/login" style={{ marginRight: '20px' }}>🔑 Iniciar Sesión</a> 
            <a href="/registro">✨ Registrarse (100 créditos Free)</a>
        </p>
      </div>
    </main>
  );
}