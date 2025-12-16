// src/app/page.js - VERSIÓN FINAL: Header full-width + Botón mega menú perfecto

'use client';
import { useState } from 'react';
import Link from 'next/link';

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';

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
      { name: "Optimizador WebP/Imágenes", href: "/", icon: Image, description: "Comprime imágenes de producto para Core Web Vitals (WebP, JPEG, PNG).", isPrimary: true },
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

// REEMPLAZA SOLO EL COMPONENTE Header EN TU page.js

const Header = ({ onLoginClick }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="header-main">
      <div className="flex items-center gap-10">
        {/* LOGO */}
        <div className="logo">
          <Link href="/" className="flex items-center gap-4">
            <Sun size={36} className="text-[var(--primary-color)]" />
            <span className="logo-text text-4xl">OptiCommerce</span>
          </Link>
        </div>

        {/* MENÚ DESPLEGABLE (NO TOCADO) */}
        <div 
          className="services-mega-menu-container relative"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <div className="services-fixed-box cursor-pointer">
            <Menu size={20} className="mr-3" />
            <span className="font-semibold text-lg">Nuestros Servicios</span>
          </div>

          {isServicesOpen && (
            <div className="mega-menu-dropdown is-open">
              <div className="mega-menu-grid">
                {SERVICE_CATEGORIES.map((categoryData, index) => (
                  <div key={index} className="mega-menu-category">
                    <h4 className="category-title flex items-center gap-3 font-bold text-lg mb-5 pb-3 border-b-2" style={{ color: categoryData.color }}>
                      <categoryData.icon size={24} />
                      {categoryData.category}
                    </h4>
                    <div className="category-links">
                      {categoryData.services.map((service) => (
                        <Link 
                          key={service.href} 
                          href={service.href} 
                          className="mega-menu-link block"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="flex items-start gap-4">
                            <service.icon size={22} className="text-[var(--primary-color)] mt-1 flex-shrink-0" />
                            <div>
                              <strong className="block font-semibold text-base">{service.name}</strong>
                              <span className="text-sm text-[var(--text-color-secondary)] block mt-1">{service.description}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== CENTRO: NAVEGACIÓN + BADGE ========== */}
      <div className="flex items-center gap-8 flex-1 justify-center">
        {/* Navegación de links */}
        <nav className="hidden xl:flex items-center gap-6">
          <Link 
            href="/about" 
            className="text-[var(--text-color-primary)] hover:text-[var(--primary-color)] font-medium transition-colors duration-200 text-base"
          >
            Nosotros
          </Link>
          <Link 
            href="/faq" 
            className="text-[var(--text-color-primary)] hover:text-[var(--primary-color)] font-medium transition-colors duration-200 text-base"
          >
            FAQ
          </Link>
          <Link 
            href="/contact" 
            className="text-[var(--text-color-primary)] hover:text-[var(--primary-color)] font-medium transition-colors duration-200 text-base"
          >
            Contacto
          </Link>
        </nav>

        {/* Badge Promocional */}
        <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--accent-color)]/10 rounded-full border border-[var(--primary-color)]/20 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <span className="text-xs font-bold text-[var(--primary-color)] uppercase tracking-wide">
            🚀 Nuevo
          </span>
          <span className="text-sm text-[var(--text-color-primary)] font-medium">
            50% OFF - Primeros 100 usuarios
          </span>
        </div>
      </div>

      {/* DERECHA: Precios + Login (NO TOCADO) */}
      <div className="flex items-center gap-10">
        <Link href="/pricing" className="nav-link text-lg font-medium">
          Precios
        </Link>

        <button className="btn btn-primary text-lg px-8 py-3" onClick={() => onLoginClick('login')}>
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};

// FOOTER (sin cambios, ya estaba bien)
export const Footer = () => (
  <footer className="footer-main">
    <div className="app-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Link href="/" className="flex items-center gap-4">
              <Sun size={30} className="text-[var(--primary-color)]" />
              <span className="logo-text text-3xl">OptiCommerce</span>
            </Link>
          </div>
          <small className="block mt-8 text-[var(--text-color-secondary)]">
            © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
          </small>
          <small className="block mt-4 text-[var(--text-color-secondary)]">
            Desarrollado por Juan José Guerrero.
          </small>
        </div>

        <div className="footer-section">
          <h4 className="font-bold mb-4">Nuestros Servicios</h4>
          <div className="flex flex-col gap-3">
            {SERVICE_CATEGORIES.flatMap(cat => cat.services).map((service) => (
              <Link key={service.href} href={service.href} className="footer-link text-base">
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="font-bold mb-4">Información Legal</h4>
          <div className="flex flex-col gap-3">
            <Link href="/terminos" className="footer-link text-base">Términos y Condiciones</Link>
            <Link href="/privacidad" className="footer-link text-base">Política de Privacidad</Link>
            <Link href="/reembolso" className="footer-link text-base">Política de Reembolso</Link>
            <Link href="/cookies" className="footer-link text-base">Política de Cookies</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="font-bold mb-4">Empresa</h4>
          <div className="flex flex-col gap-3">
            <Link href="/about" className="footer-link text-base">Sobre Nosotros</Link>
            <Link href="/contact" className="footer-link text-base">Contacto</Link>
            <Link href="/faq" className="footer-link text-base">Preguntas Frecuentes (FAQ)</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
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

      {/* Contenido principal centrado en 1200px */}
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

              <button className="btn btn-primary btn-large mt-10" onClick={() => handleOpenModal('register')}>
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

          {/* === SECCIÓN PASOS === */}
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

          {/* === SECCIÓN FEATURES === */}
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