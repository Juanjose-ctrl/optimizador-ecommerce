// src/app/minificador-css-js/page.js
// Página dedicada a la minificación de código (CSS y JS)

'use client';
import { useState } from 'react';
// Importamos Header, Footer y FeatureCard (ahora con export en ../page)
import { Header, Footer, FeatureCard } from '../page'; 
import Link from 'next/link';

// Componentes y íconos
import FileDropzone from '../components/FileDropzone'; 
import AuthModal from '../components/AuthModal';
import { Code, Zap, CheckCircle, UploadCloud } from 'lucide-react';

export default function MinifyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState('login');

    const handleOpenModal = (view) => {
        setModalView(view);
        setIsModalOpen(true);
    };

    const handleFreeLimitReached = () => {
        handleOpenModal('register');
    };
    
    // Simulación de créditos
    const userCredits = 5; 

    return (
        <>
            <Header onLoginClick={handleOpenModal} />

            {/* Contenido principal centrado */}
            <div className="app-container">
                <main>
                    
                    {/* SECCIÓN 1: HERO y ZONA DE ACCIÓN (Minificador) */}
                    <section className="section-hero">
                        <div className="hero-left">
                            <h1 className="hero-title">
                                Minificador de Código CSS y JavaScript
                            </h1>
                            <p className="hero-subtitle">
                                Elimina bytes innecesarios, comentarios y espacios para acelerar tu eCommerce al instante.
                            </p>

                            <div className="benefit-list">
                                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Soporta archivos .CSS y .JS.</p>
                                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Minificación segura sin romper tu lógica.</p>
                                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Mejora tu puntuación en Core Web Vitals.</p>
                            </div>

                            <button className="btn btn-primary btn-large mt-10" onClick={() => handleOpenModal('register')}>
                                Comenzar a Minificar Gratis
                            </button>
                        </div>

                        <div className="hero-right">
                            {/* CONFIGURACIÓN CLAVE: defaultService="minify" */}
                            <FileDropzone 
                                isAuthenticated={false} 
                                onLimitReached={handleFreeLimitReached} 
                                userCredits={userCredits} 
                                defaultService="minify"
                                supportedMimeTypes={['text/css', 'text/javascript', 'application/javascript']}
                            />
                            <p className="text-center text-sm text-[var(--text-color-secondary)] mt-4">
                                Arrastra o sube hasta 10 archivos (.css o .js).
                            </p>
                        </div>
                    </section>

                    {/* SECCIÓN 2: BENEFICIOS ESPECÍFICOS (Reutilizando FeatureCard) */}
                    <section className="section-box">
                        <h2 className="section-title">¿Por qué minificar tu código?</h2>
                        <div className="features-grid">
                            <FeatureCard 
                                icon={Zap} 
                                title="Carga Ultrarrápida" 
                                description="Al reducir el tamaño de tus scripts y estilos, el navegador carga tu sitio más rápido." 
                                color="var(--accent-color)" 
                            />
                            <FeatureCard 
                                icon={Code} 
                                title="Ancho de Banda" 
                                description="Disminuye la cantidad de datos que los usuarios deben descargar, ahorrando en costos de hosting." 
                                color="var(--primary-color)" 
                            />
                            <FeatureCard 
                                icon={UploadCloud} 
                                title="Menos Peticiones HTTP" 
                                description="Minificamos tu código eliminando retornos de carro, comentarios y espacios, reduciendo la transferencia." 
                                color="var(--secondary-color)" 
                            />
                        </div>
                    </section>
                    
                </main>
            </div>

            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialView={modalView}
            />
            
            <Footer />
        </>
    );
}