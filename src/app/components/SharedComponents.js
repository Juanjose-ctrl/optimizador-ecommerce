// src/app/components/SharedComponents.js

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sun, ChevronDown, ChevronUp, Image, Code, FileText, 
  Zap, Shield, Palette, TrendingUp, Leaf, DollarSign, link2 // Añadimos iconos necesarios para categorías y FeatureCard
} from 'lucide-react';

// --- 1. SERVICE_CATEGORIES (Nueva estructura de Mega Menú) ---
// --- 1. SERVICE_CATEGORIES (Estructura Corregida) ---
export const SERVICE_CATEGORIES = [
  {
    title: "Optimización de Archivos",
    icon: Zap, 
    services: [
      { 
        name: "Optimizador WebP/Imágenes", 
        href: "/", 
        icon: Image, 
        description: "Comprime imágenes de producto para Core Web Vitals (WebP, JPEG, PNG)."
      },
      { 
        name: "Minificador CSS/JS", 
        href: "/minificador-css-js", 
        icon: Code, 
        description: "Acelera tu código eliminando espacios, comentarios y bytes innecesarios."
      },
    ]
  },
  {
    title: "Seguridad y Privacidad",
    icon: Shield, 
    services: [
      { 
        name: "Limpiador de Metadatos", 
        href: "/limpiar-metadatos-imagen", 
        icon: FileText, 
        description: "Protege tu privacidad y reduce el peso al eliminar datos EXIF y ocultos."
      },
    ]
  },
  {
    title: "Marca y Utilidades",
    icon: Palette, 
    services: [
      { 
        name: "Generador de Favicon", 
        href: "/generador-favicon", 
        icon: Image, 
        description: "Crea un paquete completo de favicons optimizados para tu sitio."
      },
      { 
        name: "Optimizador de Paleta", 
        href: "/optimizador-paleta", 
        icon: Palette, 
        description: "Extrae colores clave de tu marca con IA y obtén una paleta HEX."
      },
    ]
  },
  {
    title: "Marketing y Analítica",
    icon: TrendingUp, 
    services: [
      { 
        name: "Generador de Enlaces UTM", 
        href: "/generador-utm", 
        icon: Link2, 
        description: "Crea enlaces rastreables para tus campañas de Google Analytics."
      },
    ]
  },
];


// --- 2. FeatureCard (Se mantiene igual, solo se asegura la exportación) ---
export const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="feature-card">
    <div className="icon-wrapper" style={{ backgroundColor: color }}>
      <Icon size={32} color="white" />
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

// --- 3. Header (CORREGIDO: Alineación Flex y Mega Menú restaurado) ---
export const Header = ({ onLoginClick }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="header-main">
      {/* 🚨 CORRECCIÓN CLAVE: app-container con Flexbox para alinear logo y nav */}
      <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Lado Izquierdo: Logo */}
        <div className="logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sun size={36} style={{ color: 'var(--primary-color)' }} />
            <span className="logo-text">OptiCommerce</span>
          </Link>
        </div>

        {/* Lado Derecho: Navegación y Botón */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          
          {/* Menú Desplegable (Mega Menú) */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Servicios {isServicesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isServicesOpen && (
              <div className="nav-dropdown-menu" style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${SERVICE_CATEGORIES.length}, 1fr)`,
                gap: '24px', 
                minWidth: '700px'
              }}>
                
                {/* ITERAR SOBRE CATEGORÍAS */}
                {SERVICE_CATEGORIES.map((category) => (
                  <div key={category.title} className="category-column">
                    {/* Título de la Categoría */}
                    <h5 style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontWeight: 700, 
                      color: 'var(--primary-color)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-color)',
                      marginBottom: '10px'
                    }}>
                      <category.icon size={20} />
                      {category.title}
                    </h5>
                    
                    {/* Iterar sobre los Servicios de la Categoría */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {category.services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="mega-menu-item" 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '16px', 
                            padding: '10px', 
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <service.icon size={24} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                          <div>
                            <strong style={{ display: 'block', fontWeight: 600, fontSize: '1rem' }}>
                              {service.name}
                            </strong>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-color-secondary)', margin: 0 }}>
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
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

// --- 4. Footer (Corregido para iterar sobre Categorías) ---
export const Footer = () => (
  <footer className="footer-main">
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

        {/* 🚨 Corrección aquí: Iterar sobre SERVICE_CATEGORIES */}
        <div className="footer-section">
          <h4>Nuestros Servicios</h4>
          <div className="flex flex-col gap-3 mt-4">
            {SERVICE_CATEGORIES.map((category) => ( 
              <div key={category.title}>
                <p className="font-semibold text-white mt-2 mb-1">{category.title}</p>
                {category.services.map((service) => (
                  <Link key={service.href} href={service.href} className="footer-link">
                    {service.name}
                  </Link>
                ))}
              </div>
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