// src/app/page.js

'use client';
import { useState } from 'react';
import Link from 'next/link';

// 🚨 1. IMPORTAR COMPONENTES COMPARTIDOS Y ENLACES DESDE LA NUEVA UBICACIÓN
import { 
  Header, 
  Footer, 
  FeatureCard, 
  SERVICE_LINKS 
} from './components/SharedComponents'; 

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';

// 🚨 2. SOLO MANTENER LOS ICONOS QUE SE USAN FUERA DE LOS COMPONENTES COMPARTIDOS
import {
  CheckCircle, Shield, TrendingUp, Leaf, DollarSign
} from 'lucide-react'; 
// Los iconos de Header y Footer (Sun, Code, etc.) se movieron a SharedComponents.js

// 🚨 3. SE ELIMINARON LAS DEFINICIONES DE SERVICE_LINKS, FeatureCard, Header, y Footer.

// LANDING PAGE (Esta sigue siendo la exportación default)
export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  const handleOpenModal = (view) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  const handleFreeLimitReached = () => {
    handleOpenModal('register');
  };

  return (
    <>
      {/* 🚨 Header y Footer se llaman fuera del div.app-container para que su fondo sea de ancho completo */}
      <Header onLoginClick={handleOpenModal} /> 

      <div className="app-container">
        <main>
          <section className="section-hero">
            <div className="hero-left">
              <h1 className="hero-title">
                Optimización de Imágenes para eCommerce Ecológica y Eficiente
              </h1>
              <p className="hero-subtitle">
                Reduce el peso de tus imágenes de producto hasta un 70% sin perder calidad.
              </p>

              <div className="benefit-list">
                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Prueba gratuita de 5 optimizaciones.</p>
                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Compatible con WEBP, JPEG y PNG.</p>
                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Compresión sin pérdida de calidad.</p>
              </div>

              <button className="btn btn-primary btn-large mt-8" onClick={() => handleOpenModal('register')}>
                Comenzar a Optimizar Gratis
              </button>
            </div>

            <div className="hero-right">
              <FileDropzone
                isAuthenticated={false}
                onLimitReached={handleFreeLimitReached}
                userCredits={5}
                defaultService="image"
              />
            </div>
          </section>

          {/* SECCIÓN PASOS */}
          <section className="section-box">
            <h2 className="section-title">¿Cómo funciona OptiCommerce?</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <p><strong>Prueba Gratuita.</strong> Sube tu primera imagen ahora, no requiere registro (Máximo 5).</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <p><strong>Sube tu Imagen.</strong> Arrastra el archivo de tu producto (PNG o JPEG) a la zona de carga.</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <p><strong>Optimiza y Ahorra.</strong> Nuestro motor de IA comprime y convierte a formatos modernos de forma automática.</p>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <p><strong>Regístrate para Continuar.</strong> Al alcanzar el límite, te pediremos registrarte o comprar un plan.</p>
              </div>
            </div>
          </section>

          {/* SECCIÓN FEATURES */}
          <section className="section-box">
            <h2 className="section-title">¿Por qué OptiCommerce es la mejor opción?</h2>
            <div className="features-grid">
              <FeatureCard icon={Shield} title="Seguridad de Datos" description="Tus datos y archivos están protegidos con encriptación HTTPS. Total tranquilidad para tu negocio." color="#008080" />
              <FeatureCard icon={TrendingUp} title="Rendimiento Web Superior" description="Aumenta tu puntuación de PageSpeed y reduce tu tasa de rebote gracias a la velocidad de carga." color="#10B981" />
              <FeatureCard icon={Leaf} title="Conciencia Ecológica" description="Archivos más pequeños significan menos consumo de energía en transferencia de datos. Optimización sostenible." color="#40B5AD" />
              <FeatureCard icon={DollarSign} title="Ahorro en Hosting" description="Menos ancho de banda utilizado por tus visitantes se traduce en menores costos mensuales de alojamiento." color="#1A202C" />
            </div>
          </section>
        </main>
      </div>

      <Footer /> {/* Footer se llama aquí, y maneja su propio app-container interno */}

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialView={modalView}
      />
    </>
  );
}