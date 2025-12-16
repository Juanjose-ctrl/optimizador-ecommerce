// src/app/page.js - VERSIÓN FINAL PULIDA Y BONITA

'use client';
import { useState } from 'react';
import Link from 'next/link';

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';

import {
  CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign,
  ChevronDown, ChevronUp, Image, Code, FileText
} from 'lucide-react';

const SERVICE_LINKS = [
  { name: "Optimizador WebP", href: "/", icon: Image, description: "Comprime imágenes para Core Web Vitals.", isPrimary: true },
  { name: "Minificador CSS/JS", href: "/minificador-css-js", icon: Code, description: "Acelera tu código eliminando espacios y comentarios.", isPrimary: false },
  { name: "Limpiador de Metadatos", href: "/limpiar-metadatos-imagen", icon: FileText, description: "Protege tu privacidad y reduce el peso al eliminar datos ocultos.", isPrimary: false },
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

// HEADER: con menú desplegable bonito y logo elegante
const Header = ({ onLoginClick }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="header-main">
      <div className="logo">
        <Link href="/" className="flex items-center gap-3">
          <Sun size={32} className="text-[var(--primary-color)]" />
          <span className="text-3xl font-black bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
            OptiCommerce
          </span>
        </Link>
      </div>

      <nav className="flex items-center gap-8">
        <div
          className="relative"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <button className="flex items-center gap-2 px-5 py-3 text-lg font-medium text-[var(--text-color-primary)] rounded-lg hover:bg-[var(--bg-hover)] transition">
            Servicios {isServicesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isServicesOpen && (
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 bg-[var(--bg-card)] rounded-2xl shadow-2xl py-4 z-50 border border-[var(--border-color)]"
              style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              {SERVICE_LINKS.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="flex items-center gap-5 px-6 py-4 text-[var(--text-color-primary)] rounded-xl hover:bg-[var(--bg-page)] transition mx-2"
                >
                  <service.icon size={28} className="text-[var(--primary-color)]" />
                  <div>
                    <div className="font-bold text-lg">{service.name}</div>
                    <div className="text-sm text-[var(--text-color-secondary)] mt-1">{service.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/pricing" className="nav-link text-lg">
          Precios
        </Link>

        <button className="btn btn-primary text-lg" onClick={() => onLoginClick('login')}>
          Iniciar Sesión
        </button>
      </nav>
    </header>
  );
};

// FOOTER: sin el texto extra que no querías
export const Footer = () => (
  <footer className="footer-main">
    <div className="app-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Link href="/" className="flex items-center gap-3">
              <Sun size={28} className="text-[var(--primary-color)]" />
              <h4 className="m-0 text-2xl font-bold text-[var(--primary-color)]">OptiCommerce</h4>
            </Link>
          </div>
          <small className="block mt-6 text-[var(--text-color-secondary)]">
            © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
          </small>
          <small className="block mt-2 text-[var(--text-color-secondary)]">
            Desarrollado por Juan José Guerrero.
          </small>
        </div>

        <div className="footer-section">
          <h4 className="text-lg font-bold mb-4">Nuestros Servicios</h4>
          <div className="flex flex-col gap-3">
            {SERVICE_LINKS.map((service) => (
              <Link key={service.href} href={service.href} className="footer-link text-base">
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="text-lg font-bold mb-4">Información Legal</h4>
          <div className="flex flex-col gap-3">
            <Link href="/terminos" className="footer-link text-base">Términos y Condiciones</Link>
            <Link href="/privacidad" className="footer-link text-base">Política de Privacidad</Link>
            <Link href="/reembolso" className="footer-link text-base">Política de Reembolso</Link>
            <Link href="/cookies" className="footer-link text-base">Política de Cookies</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="text-lg font-bold mb-4">Empresa</h4>
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

// LANDING PAGE
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
      <div className="app-container">
        <Header onLoginClick={handleOpenModal} />

        <main>
          <section className="section-hero">
            <div className="hero-left">
              {/* Título más moderado */}
              <h1 className="hero-title" style={{ fontSize: '3.2rem' }}>
                Optimización de Imágenes <br /> para eCommerce Ecológica y Eficiente
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

          {/* Tus otras secciones (pasos y features) van aquí igual que antes */}
          {/* ... (copia las secciones de pasos y features que tenías) ... */}

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