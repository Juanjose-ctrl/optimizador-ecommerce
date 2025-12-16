// src/app/components/SharedComponents.js

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sun, Shield, TrendingUp, Leaf, DollarSign,
  ChevronDown, ChevronUp, Image, Code, FileText 
} from 'lucide-react';

// Se exporta SERVICE_LINKS para que todas las páginas puedan usarlo
export const SERVICE_LINKS = [
  { name: "Optimizador WebP", href: "/", icon: Image, description: "Comprime imágenes para Core Web Vitals.", isPrimary: true },
  { name: "Minificador CSS/JS", href: "/minificador-css-js", icon: Code, description: "Acelera tu código eliminando espacios y comentarios.", isPrimary: false },
  { name: "Limpiador de Metadatos", href: "/limpiar-metadatos-imagen", icon: FileText, description: "Protege tu privacidad y reduce el peso al eliminar datos ocultos.", isPrimary: false },
];

// Se exporta FeatureCard
export const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="feature-card">
    <div className="icon-wrapper" style={{ backgroundColor: color }}>
      <Icon size={32} color="white" />
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

// Se exporta Header (CON CORRECCIÓN DE DISEÑO APLICADA)
export const Header = ({ onLoginClick }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="header-main">
      {/* 🚨 CORRECCIÓN DEFINITIVA DE DISEÑO: Envuelve el contenido en app-container */}
      <div className="app-container flex justify-between items-center"> 
        <div className="logo">
          <Link href="/" className="flex items-center gap-3">
            <Sun size={36} className="text-[var(--primary-color)]" />
            <span className="logo-text">OptiCommerce</span>
          </Link>
        </div>

        <nav className="flex items-center gap-10">
          {/* Menú desplegable usando tus clases originales */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="nav-link flex items-center gap-2">
              Servicios {isServicesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isServicesOpen && (
              <div className="nav-dropdown-menu">
                {SERVICE_LINKS.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-center gap-5"
                  >
                    <service.icon size={28} className="text-[var(--primary-color)]" />
                    <div>
                      <strong className="block font-semibold text-lg">{service.name}</strong>
                      <p className="text-sm text-[var(--text-color-secondary)] m-0">{service.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/pricing" className="nav-link">
            Precios
          </Link>

          <button className="btn btn-primary" onClick={() => onLoginClick('login')}>
            Iniciar Sesión
          </button>
        </nav>
      </div> 
    </header>
  );
};

// Se exporta Footer
export const Footer = () => (
  <footer className="footer-main">
    {/* Nota: el Footer ya usaba app-container, lo cual es correcto */}
    <div className="app-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Link href="/" className="flex items-center gap-3">
              <Sun size={28} className="text-[var(--primary-color)]" />
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
          <h4>Nuestros Servicios</h4>
          <div className="flex flex-col gap-3 mt-4">
            {SERVICE_LINKS.map((service) => (
              <Link key={service.href} href={service.href} className="footer-link">
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4>Información Legal</h4>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/terminos" className="footer-link">Términos y Condiciones</Link>
            <Link href="/privacidad" className="footer-link">Política de Privacidad</Link>
            <Link href="/reembolso" className="footer-link">Política de Reembolso</Link>
            <Link href="/cookies" className="footer-link">Política de Cookies</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Empresa</h4>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/about" className="footer-link">Sobre Nosotros</Link>
            <Link href="/contact" className="footer-link">Contacto</Link>
            <Link href="/faq" className="footer-link">Preguntas Frecuentes (FAQ)</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);