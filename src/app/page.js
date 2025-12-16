// src/app/page.js - VERSIÓN FINAL: Header full-width + Botón mega menú perfecto

'use client';
import { useState } from 'react';
import Link from 'next/link';

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import {
  CheckCircle, Sun, Shield, TrendingUp, Leaf, DollarSign,
  Image, Code, FileText, Menu, Zap
} from 'lucide-react';

const SERVICE_CATEGORIES = [
  {
    category: "Optimización de Archivos",
    icon: Zap,
    color: "var(--accent-color)",
    services: [
      { name: "Optimizador WebP/Imágenes", href: "/limpiar-metadatos-imagen", icon: Image, description: "Comprime imágenes de producto para Core Web Vitals (WebP, JPEG, PNG).", isPrimary: true },
      { name: "Minificador CSS/JS", href: "/minificador-css-js", icon: Code, description: "Acelera tu código eliminando espacios, comentarios y bytes innecesarios.", isPrimary: false },
    ]
  },
  {
    category: "Seguridad y Privacidad",
    icon: Shield,
    color: "var(--primary-color)",
    services: [
      { name: "Limpiador de Metadatos", href: "/limpiar-metadatos-imagen", icon: FileText, description: "Protege tu privacidad y reduce el peso al eliminar datos EXIF y ocultos.", isPrimary: false },
    ]
  },
];

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="feature-card">
    <div className="icon-wrapper" style={{ backgroundColor: color }}>
      <Icon size={32} color="white" />
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

// LANDING PAGE: Header full-width + contenido centrado
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
    {/* Header full-width */}
    <Header onLoginClick={handleOpenModal} />

    {/* Contenido principal centrado */}
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
              <p>
                <CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" />
                Prueba gratuita de 5 optimizaciones.
              </p>
              <p>
                <CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" />
                Compatible con WEBP, JPEG y PNG.
              </p>
              <p>
                <CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" />
                Compresión sin pérdida de calidad.
              </p>
            </div>

            <button
              className="btn btn-primary btn-large mt-10"
              onClick={() => handleOpenModal("register")}
            >
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
          <h2 className="section-title">¿Cómo funciona nuestro optimizador?</h2>
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
            <FeatureCard
              icon={Shield}
              title="Seguridad de Datos"
              description="Tus datos y archivos están protegidos con encriptación HTTPS. Total tranquilidad para tu negocio."
              color="#008080"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Rendimiento Web Superior"
              description="Aumenta tu puntuación de PageSpeed y reduce tu tasa de rebote gracias a la velocidad de carga."
              color="#10B981"
            />
            <FeatureCard
              icon={Leaf}
              title="Conciencia Ecológica"
              description="Archivos más pequeños significan menos consumo de energía en transferencia de datos. Optimización sostenible."
              color="#40B5AD"
            />
            <FeatureCard
              icon={DollarSign}
              title="Ahorro en Hosting"
              description="Menos ancho de banda utilizado por tus visitantes se traduce en menores costos mensuales de alojamiento."
              color="#1A202C"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>

    <AuthModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      initialView={modalView}
    />
  </>
); 
}