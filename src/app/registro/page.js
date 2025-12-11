// src/app/registro/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      if (response.ok) {
        alert("¡Registro exitoso! Ahora inicia sesión.");
        router.push('/login'); 
      } else {
        const data = await response.json();
        alert(`Error de registro: ${data.detail || 'Error desconocido'}`);
      }
    } catch (error) {
      alert("Hubo un problema de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container"> 
      <h1>Registro de Nuevo Cliente</h1>
      <p>Obtén 100 créditos gratis al registrarte.</p>
      <form onSubmit={handleRegister}>
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
          className="button-register" // Clase del botón de registro
        >
          {loading ? 'Registrando...' : 'Crear Cuenta Free'}
        </button>
        <p className="link-text">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  );
}