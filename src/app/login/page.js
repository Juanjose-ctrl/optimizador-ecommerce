// src/app/login/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    // 1. Preparar FormData (NO JSON) para el endpoint /token
    const formData = new URLSearchParams();
    formData.append('username', email); 
    formData.append('password', password);

    try {
      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (response.ok) {
        // 🚨 ¡CRÍTICO! Guardar las claves en el navegador
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('apiKey', data.api_key);
        
        alert("¡Sesión iniciada! Redirigiendo al Panel del Cliente.");
        router.push('/dashboard'); // Redirige a la página que crearemos a continuación
      } else {
        alert(`Fallo en el Login: ${data.detail || 'Error desconocido'}`);
      }
    } catch (error) {
      alert("Hubo un problema de red. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // app/login/page.js (Parte del return, con className en lugar de style)

// ...
  return (
    <div className="card-container"> {/* Estilo base para el formulario */}
      <h1>Acceso al Panel de Cliente</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Iniciando...' : 'Ingresar'}
        </button>
        <p className="link-text">
            ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}