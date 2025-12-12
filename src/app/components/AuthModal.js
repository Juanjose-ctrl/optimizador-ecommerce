// src/components/AuthModal.js

'use client';

import { useState } from 'react';
import Link from 'next/link';

// Importa los componentes de Login y Registro que ya tienes (los crearemos a continuación)
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// Componente de modal genérico y lógica de navegación entre Login/Registro
const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    // 'login' o 'register'
    const [currentView, setCurrentView] = useState(initialView); 
    
    if (!isOpen) return null;

    // Título dinámico
    const title = currentView === 'login' ? "¿Qué bien verte de nuevo!" : "¿Nuevo usuario? ¡Regístrate!";
    
    // Título para cambiar la vista
    const switchTitle = currentView === 'login' ? "Regístrate" : "Inicia Sesión";
    
    // Botón para cambiar la vista (usado en el header del modal)
    const handleSwitchView = () => {
        setCurrentView(currentView === 'login' ? 'register' : 'login');
    };


    return (
        // Overlay de fondo (clic afuera cierra el modal)
        <div className="modal-overlay" onClick={onClose}>
            {/* Contenedor del Modal (onClick con stopPropagation para que no cierre al hacer clic adentro) */}
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                
                {/* Header del Modal */}
                <div className="modal-header">
                    <p className="modal-new-user">
                        {currentView === 'login' ? "¿Nuevo usuario?" : "¿Ya tienes cuenta?"} 
                        <a onClick={handleSwitchView} className="switch-link">
                            {switchTitle}
                        </a>
                    </p>
                    <button className="modal-close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <h2 className="modal-title">{title}</h2>
                
                {/* Contenido principal (Login o Registro) */}
                <div className="modal-content">
                    
                    {/* Botón de Google (Simulado) */}
                    <button className="btn btn-google">
                        <img src="/google-icon.svg" alt="Google" width="20" height="20" style={{ marginRight: '10px' }} />
                        Continuar con Google
                    </button>
                    <div className="modal-separator">o</div>
                    
                    {/* Renderiza el formulario activo */}
                    {currentView === 'login' ? (
                        <LoginForm onSuccess={() => { 
                            onClose(); // Cerrar al iniciar sesión con éxito
                            window.location.href = '/dashboard'; // Redirigir al dashboard
                        }} />
                    ) : (
                        <RegisterForm onSuccess={() => {
                            setCurrentView('login'); // Mostrar login tras registro exitoso
                        }} />
                    )}

                </div>
            </div>
        </div>
    );
};

export default AuthModal;