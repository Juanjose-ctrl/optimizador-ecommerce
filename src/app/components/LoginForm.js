// src/components/LoginForm.js - VERSIÓN FINAL CORREGIDA

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Asegúrate de que esta URL sea correcta.
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

// Recibe onSuccess como prop del Modal para saber qué hacer después del éxito
export default function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('username', email); // FastAPI espera 'username'
        formData.append('password', password);

        try {
            const response = await fetch(`${API_URL}/token`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Credenciales inválidas.");
            }

            const data = await response.json();
            
            // 🚨 CORRECCIÓN CLAVE PARA EL ERROR FATAL DE CLIENTE:
            if (typeof window !== 'undefined') {
                // 1. Almacenar tokens de forma segura en el cliente
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('apiKey', data.api_key); // Asumiendo que el endpoint /token devuelve también la API Key
            }

            // 2. Ejecutar la función de éxito que cierra el modal y redirige
            if (onSuccess) {
                onSuccess(); 
            } else {
                // Fallback si no se pasó onSuccess (solo para seguridad)
                router.push('/dashboard');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="login-email">Dirección de correo electrónico</label>
                <input
                    id="login-email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                    id="login-password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
            
            <a href="#" className="forgot-password-link">Olvidé mi contraseña</a>

            {error && <p style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>{error}</p>}
            
            <button
                type="submit"
                className="btn btn-secondary" 
                disabled={loading}
                style={{ width: '100%', padding: '15px', marginTop: '10px' }}
            >
                {loading ? 'Iniciando Sesión...' : 'Iniciar sesión'}
            </button>

            <small style={{ display: 'block', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-color-secondary)' }}>
                Al crear una cuenta, acepta nuestros <Link href="/terminos">Términos y Condiciones</Link> y nuestra <Link href="/privacidad">Política de Privacidad</Link>.
            </small>
        </form>
    );
}