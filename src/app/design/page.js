// src/app/design/page.js
'use client'; // Necesario porque contiene componentes de cliente (Header/Footer tienen 'use client' indirecto)

import { useState } from 'react';

// Importamos los componentes base
import { Header, Footer } from '../components/SharedComponents';
import AuthModal from '../components/AuthModal';

// Importamos los nuevos servicios
import ColorOptimizer from '../components/ColorOptimizer';
import FaviconGenerator from '../components/FaviconGenerator';

export default function DesignToolsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState('login');

    const handleOpenModal = (view) => {
        setModalView(view);
        setIsModalOpen(true);
    };

    // Usamos el mismo patrón de Header/Footer que en la Landing Page
    return (
        <>
            <Header onLoginClick={handleOpenModal} />
            
            <div className="app-container">
                <main className="py-12">
                    <h1 className="text-4xl font-extrabold mb-10 text-[var(--text-color-primary)]">
                        🛠️ Herramientas de Marca y Diseño Web
                    </h1>
                    
                    {/* Sección 1: Generador de Favicon */}
                    <section className="section-box mb-12">
                        <FaviconGenerator />
                    </section>
                    
                    {/* Sección 2: Optimizador de Colores */}
                    <section className="section-box">
                        <ColorOptimizer />
                    </section>
                    
                </main>
            </div>

            <Footer />

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialView={modalView}
            />
        </>
    );
}