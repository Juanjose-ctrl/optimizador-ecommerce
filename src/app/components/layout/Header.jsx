// src/components/layout/Header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Sun, Zap, Shield, Image, Code, FileText } from 'lucide-react';

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

export default function Header({ onLoginClick }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="header-main">
      <div className="flex items-center gap-10">
        <div className="logo">
          <Link href="/" className="flex items-center gap-4">
            <Sun size={36} className="text-[var(--primary-color)]" />
            <span className="logo-text text-4xl">OptiCommerce</span>
          </Link>
        </div>

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
}