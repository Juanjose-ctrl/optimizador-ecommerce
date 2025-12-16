// src/app/limpiar-metadatos-imagen/page.js
// Página dedicada a la limpieza de metadatos de imágenes

'use client';
import { useState } from 'react';
// Importamos Header, Footer y FeatureCard (ahora con export en ../page)
import { Header, Footer, FeatureCard } from '../page'; 
import Link from 'next/link';

// Componentes y íconos
import FileDropzone from '../components/FileDropzone'; 
import AuthModal from '../components/AuthModal';
import { FileText, Shield, UserX, CheckCircle, Image } from 'lucide-react';

export default function MetadataCleanerPage() {
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
                    
                    {/* SECCIÓN 1: HERO y ZONA DE ACCIÓN (Limpiador Metadatos) */}
                    <section className="section-hero">
                        <div className="hero-left">
                            <h1 className="hero-title">
                                Limpiador de Metadatos EXIF/IPTC de Imágenes
                            </h1>
                            <p className="hero-subtitle">
                                Protege la privacidad de tus productos y clientes eliminando datos ocultos como GPS, cámara o autor.
                            </p>

                            <div className="benefit-list">
                                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Elimina GPS, derechos de autor y datos de cámara.</p>
                                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Reduce ligeramente el tamaño final del archivo.</p>
                                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Máxima privacidad y seguridad para tu eCommerce.</p>
                            </div>

                            <button className="btn btn-primary btn-large mt-10" onClick={() => handleOpenModal('register')}>
                                Comenzar a Limpiar Gratis
                            </button>
                        </div>

                        <div className="hero-right">
                            {/* CONFIGURACIÓN CLAVE: defaultService="metadata" */}
                            <FileDropzone 
                                isAuthenticated={false} 
                                onLimitReached={handleFreeLimitReached} 
                                userCredits={userCredits} 
                                defaultService="metadata"
                                supportedMimeTypes={['image/jpeg', 'image/png', 'image/webp']}
                            />
                            <p className="text-center text-sm text-[var(--text-color-secondary)] mt-4">
                    </p>
                        </div>
                    </section>

                    {/* SECCIÓN 2: BENEFICIOS ESPECÍFICOS (Reutilizando FeatureCard) */}
                    <section className="section-box">
                        <h2 className="section-title">¿Qué información oculta eliminamos?</h2>
                        <div className="features-grid">
                            <FeatureCard 
                                icon={Shield} 
                                title="Ubicación GPS" 
                                description="Borra coordenadas geográficas que podrían revelar dónde se tomó la foto de tu producto." 
                                color="var(--primary-color)" 
                            />
                            <FeatureCard 
                                icon={UserX} 
                                title="Datos del Propietario" 
                                description="Elimina información personal o de derechos de autor incrustada en el archivo." 
                                color="var(--accent-color)" 
                            />
                            <FeatureCard 
                                icon={Image} 
                                title="Detalles de Cámara" 
                                description="Retira datos técnicos de la cámara (modelo, exposición, lentes) que son innecesarios en un eCommerce." 
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