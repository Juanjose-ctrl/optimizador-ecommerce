// src/app/page.js - VERSIÓN FINAL PROFESIONAL Y PULIDA

'use client';
import { useState } from 'react';
import Link from 'next/link';

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';

import {
  CheckCircle, Sun, Shield, TrendingUp, Leaf, DollarSign,
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

// HEADER: logo con gradiente + menú desplegable hermoso
const Header = ({ onLoginClick }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="header-main">
      <div className="logo">
        <Link href="/" className="flex items-center gap-4">
          <Sun size={36} className="text-[var(--primary-color)]" />
          <span className="text-4xl font-black bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
            OptiCommerce
          </span>
        </Link>
      </div>

      <nav className="flex items-center gap-10">
        <div
          className="relative"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-[var(--text-color-primary)] rounded-xl hover:bg-[var(--bg-hover)] transition">
            Servicios {isServicesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isServicesOpen && (
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[420px] bg-[var(--bg-card)] rounded-3xl shadow-2xl py-6 px-4 z-50 border border-[var(--border-color)]"
              style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              {SERVICE_LINKS.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="flex items-center gap-6 px-6 py-5 mb-3 rounded-2xl hover:bg-[var(--bg-hover)] transition-all duration-200 last:mb-0"
                >
                  <service.icon size={32} className="text-[var(--primary-color)] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-lg text-[var(--text-color-primary)]">{service.name}</div>
                    <div className="text-sm text-[var(--text-color-secondary)] mt-1">{service.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/pricing" className="nav-link text-lg font-medium">
          Precios
        </Link>

        <button className="btn btn-primary text-lg px-8 py-3" onClick={() => onLoginClick('login')}>
          Iniciar Sesión
        </button>
      </nav>
    </header>
  );
};

// FOOTER: frases separadas con espacio correcto
export const Footer = () => (
  <footer className="footer-main">
    <div className="app-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Link href="/" className="flex items-center gap-4">
              <Sun size={30} className="text-[var(--primary-color)]" />
              <h4 className="m-0 text-3xl font-bold text-[var(--primary-color)]">OptiCommerce</h4>
            </Link>
          </div>
          <small className="block mt-8 text-[var(--text-color-secondary)] text-base">
            © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
          </small>
          <small className="block mt-4 text-[var(--text-color-secondary)] text-base">
            Desarrollado por Juan José Guerrero.
          </small>
        </div>

        <div className="footer-section">
          <h4 className="text-xl font-bold mb-6">Nuestros Servicios</h4>
          <div className="flex flex-col gap-4">
            {SERVICE_LINKS.map((service) => (
              <Link key={service.href} href={service.href} className="footer-link text-base hover:text-[var(--primary-color)] transition">
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="text-xl font-bold mb-6">Información Legal</h4>
          <div className="flex flex-col gap-4">
            <Link href="/terminos" className="footer-link text-base hover:text-[var(--primary-color)] transition">Términos y Condiciones</Link>
            <Link href="/privacidad" className="footer-link text-base hover:text-[var(--primary-color)] transition">Política de Privacidad</Link>
            <Link href="/reembolso" className="footer-link text-base hover:text-[var(--primary-color)] transition">Política de Reembolso</Link>
            <Link href="/cookies" className="footer-link text-base hover:text-[var(--primary-color)] transition">Política de Cookies</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="text-xl font-bold mb-6">Empresa</h4>
          <div className="flex flex-col gap-4">
            <Link href="/about" className="footer-link text-base hover:text-[var(--primary-color)] transition">Sobre Nosotros</Link>
            <Link href="/contact" className="footer-link text-base hover:text-[var(--primary-color)] transition">Contacto</Link>
            <Link href="/faq" className="footer-link text-base hover:text-[var(--primary-color)] transition">Preguntas Frecuentes (FAQ)</Link>
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
              <h1 className="hero-title">
                Optimización de Imágenes para eCommerce Ecológica y Eficiente
              </h1>
              <p className="hero-subtitle">
                Reduce el peso de tus imágenes de producto hasta un 70% sin perder calidad.
              </p>

              <div className="benefit-list">
                <p><CheckCircle size={22} className="inline mr-3 text-[var(--primary-color)]" /> Prueba gratuita de 5 optimizaciones.</p>
                <p><CheckCircle size={22} className="inline mr-3 text-[var(--primary-color)]" /> Compatible con WEBP, JPEG y PNG.</p>
                <p><CheckCircle size={22} className="inline mr-3 text-[var(--primary-color)]" /> Compresión sin pérdida de calidad.</p>
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

          {/* === SECCIÓN DE PASOS === */}
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

          {/* === SECCIÓN DE FEATURES === */}
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