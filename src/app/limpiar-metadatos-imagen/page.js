// src/app/limpiar-metadatos-imagen/page.js
// Página dedicada a la limpieza de metadatos de imágenes

'use client';
import { useState } from 'react';
import { Header, Footer } from '../page'; // Importamos componentes Header y Footer del layout principal
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
    
    // Simulación de créditos (esto debería venir del estado de usuario real)
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
                            {/* 🚨 CONFIGURACIÓN CLAVE: defaultService="metadata" */}
                            <FileDropzone 
                                isAuthenticated={false} 
                                onLimitReached={handleFreeLimitReached} 
                                userCredits={userCredits} 
                                defaultService="metadata"
                                supportedMimeTypes={['image/jpeg', 'image/png', 'image/webp']}
                            />
                            {/* Información adicional visible en el Dropzone */}
                            <p className="text-center text-sm text-[var(--text-color-secondary)] mt-4">
                                Arrastra o sube imágenes (JPEG, PNG, WEBP).
                            </p>
                        </div>
                    </section>

                    {/* SECCIÓN 2: BENEFICIOS ESPECÍFICOS */}
                    <section className="section-box section-features">
                        <h2 className="section-title">¿Qué información oculta eliminamos?</h2>
                        <div className="features-grid">
                            <FeatureCard icon={Shield} title="Ubicación GPS" description="Borra coordenadas geográficas que podrían revelar dónde se tomó la foto de tu producto." color="var(--primary-color)" />
                            <FeatureCard icon={UserX} title="Datos del Propietario" description="Elimina información personal o de derechos de autor incrustada en el archivo." color="var(--accent-color)" />
                            <FeatureCard icon={Image} title="Detalles de Cámara" description="Retira datos técnicos de la cámara (modelo, exposición, lentes) que son innecesarios en un eCommerce." color="var(--secondary-color)" />
                        </div>
                    </section>

                    {/* SECCIÓN 3: CTA - Enlace al otro servicio de optimización */}
                    <section className="section-box text-center">
                        <h2 className="section-title" style={{ marginBottom: '20px' }}>
                            ¿Necesitas optimizar el peso de tus archivos?
                        </h2>
                        <p className="hero-subtitle" style={{ marginBottom: '30px' }}>
                            Usa nuestro minificador para CSS y JS o nuestro optimizador para imágenes.
                        </p>
                        <Link href="/minificador-css-js" className="btn btn-secondary btn-large" style={{ marginRight: '20px' }}>
                            Ir al Minificador de Código
                        </Link>
                        <Link href="/" className="btn btn-primary btn-large">
                            Ir al Optimizador de Imágenes
                        </Link>
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

// Igual que antes, asumo que Header y Footer se exportan desde ../page.js.