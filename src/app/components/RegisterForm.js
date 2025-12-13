// src/components/RegisterForm.js - VERSIÓN FINAL

'use client';
import { useState } from 'react';
import Link from 'next/link';

// Asegúrate de que esta URL sea correcta.
const API_URL = "https://fastapi-image-optimizer-1.onrender.com"; 

// Recibe onSuccess para notificar al Modal que cambie a la vista de Login
export default function RegisterForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Si la API devuelve el error de correo duplicado, se mostrará aquí.
                throw new Error(errorData.detail || "Error en el registro. Intenta con otro correo.");
            }

            // Registro exitoso
            setSuccess("¡Registro exitoso! Ahora inicia sesión.");
            
            // Informar al Modal que debe cambiar a la vista de Login
            if (onSuccess) {
                onSuccess(); 
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            {success && <p style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 600 }}>{success}</p>}
            
            <div className="form-group">
                <label htmlFor="register-email">Dirección de correo electrónico</label>
                <input
                    id="register-email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading || success}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="register-password">Contraseña</label>
                <input
                    id="register-password"
                    type="password"
                    placeholder="Contraseña (Mínimo 8 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading || success}
                />
            </div>
            
            <small style={{ display: 'block', marginBottom: '15px', color: 'var(--text-color-secondary)' }}>
                La contraseña debe contener al menos 8 caracteres.
            </small>

            {error && <p style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>{error}</p>}
            
            <button
                type="submit"
                className="btn btn-primary" 
                disabled={loading || success}
                style={{ width: '100%', padding: '15px', marginTop: '10px' }}
            >
                {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            <small style={{ display: 'block', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-color-secondary)' }}>
                Al crear una cuenta, acepta nuestros <Link href="/terminos">Términos y Condiciones</Link> y nuestra <Link href="/privacidad">Política de Privacidad</Link>.
            </small>
        </form>
    );
}