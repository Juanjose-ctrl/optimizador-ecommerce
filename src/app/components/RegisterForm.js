// src/app/components/RegisterForm.js - VERSIÓN CORREGIDA FINAL

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { API_URL } from '../../config/api'; // 🚨 CORREGIDO: Ruta correcta

// Asegúrate de que API_URL y Link estén importados, si no lo están, usa:
// import { API_URL } from '../config/api'; // o donde tengas la config
// import Link from 'next/link';

export default function RegisterForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Agregamos la URL si no está importada (reemplaza con tu ruta correcta) 
    const FREE_CREDITS_KEY = 'freeCreditsRemaining'; // Necesario para obtener la clave

    // 🚨 FUNCIÓN CORREGIDA Y UNIFICADA
    const handleRegister = async (e) => {
        e.preventDefault(); // Detener el envío del formulario
        setError('');
        setLoading(true);

        let freeCreditsLeft = null;
        if (typeof window !== 'undefined') {
            // 1. Obtenemos el valor de créditos gratuitos persistente
            freeCreditsLeft = localStorage.getItem(FREE_CREDITS_KEY);
            
            // 2. Si existe (es un string), lo parseamos a INT. Si es '0', será 0. Si no existe, es null.
            freeCreditsLeft = freeCreditsLeft ? parseInt(freeCreditsLeft, 10) : null;
        }

        try {
            // 🚨 ENDPOINT Y PETICIÓN ÚNICOS
            const response = await fetch(`${API_URL}/users/`, { // Usamos el endpoint que tenías funcionando: /users/
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    password,
                    // 3. CAMBIO CLAVE: Enviamos los créditos gratuitos restantes
                    credits_on_register: freeCreditsLeft 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Usamos errorData.detail que es lo que FastAPI/API suele devolver.
                throw new Error(errorData.detail || "Error en el registro. Intenta con otro correo.");
            }

            setSuccess("¡Registro exitoso! Ahora inicia sesión.");
            
            // Si el registro fue exitoso, es buena práctica borrar la huella de créditos gratuitos
            // ya que el usuario ahora tiene una cuenta.
            if (typeof window !== 'undefined') {
                 localStorage.removeItem(FREE_CREDITS_KEY);
            }
            
            if (onSuccess) {
                onSuccess(); 
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Asegúrate de cambiar <Link> a <a> si no estás usando Next.js Router
    // Y de importar 'Link' si estás en Next.js
    
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