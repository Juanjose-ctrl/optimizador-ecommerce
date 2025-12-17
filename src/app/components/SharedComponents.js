// src/components/SharedComponents.js
'use client'; // Necesario para Header ya que usa useState y onLoginClick

import Link from 'next/link';
// Asegúrate de que todos los íconos necesarios estén importados aquí
import { 
    Sun, ArrowLeft, Menu, X, 
    Image as ImageIcon, Palette, 
    Zap, Layers, Trash2, Code 
} from 'lucide-react'; 
import { useState } from 'react';

// ===============================================
// 1. CONSTANTES DE SERVICIO (EXPORTADAS)
// Estas son necesarias para la página principal (page.js)
// ===============================================

export const SERVICE_LINKS = [
    // Diseño y Marca (Diseño)
    { href: '/favicon', label: 'Generador de Favicon', description: 'Crea íconos optimizados para todos los dispositivos.', icon: ImageIcon, category: 'Diseño' },
    { href: '/colors', label: 'Optimizador de Paleta', description: 'Extrae colores clave y genera una paleta web funcional.', icon: Palette, category: 'Diseño' },
    
    // Rendimiento y SEO (Rendimiento)
    { href: '/minificador-css-js', label: 'Minificador CSS/JS', description: 'Reduce el tamaño de tus scripts y hojas de estilo.', icon: Code, category: 'Rendimiento' },
    { href: '/limpiar-metadatos-imagen', label: 'Limpiador de Metadatos', description: 'Elimina datos innecesarios de tus imágenes para mayor privacidad y velocidad.', icon: Trash2, category: 'Rendimiento' },
];

export const SERVICE_CATEGORIES = [
    { name: 'Diseño y Marca', icon: Layers },
    { name: 'Rendimiento y SEO', icon: Zap },
];

// ===============================================
// 2. COMPONENTE FEATURE CARD (EXPORTADO)
// Se utiliza en la Landing Page (page.js)
// ===============================================

export function FeatureCard({ href, title, description, icon: Icon }) {
    return (
        <Link href={href} className="feature-card-link">
            <div className="feature-card bg-[var(--bg-card)] p-6 rounded-xl shadow-md transition hover:shadow-lg hover:border-[var(--accent-color)] border border-[var(--border-color)]">
                {/* Usamos el componente Icon que se pasa como prop */}
                <Icon size={32} className="text-[var(--primary-color)] mb-4" /> 
                <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-2">{title}</h3>
                <p className="text-[var(--text-color-secondary)]">{description}</p>
            </div>
        </Link>
    );
}

// ===============================================
// 3. COMPONENTE HEADER (Tu código actualizado)
// ===============================================

export function Header({ showBackButton = true, onLoginClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Usamos SERVICE_LINKS para tener todos los enlaces centralizados
    // Nota: Aquí solo usamos los enlaces generales, no por categoría.
    const navLinks = SERVICE_LINKS.map(link => ({
        href: link.href, 
        label: link.label, 
        icon: link.icon
    })).concat([
        { href: "/about", label: "Sobre Nosotros" },
        { href: "/contact", label: "Contacto" },
    ]);

    return (
        <header className="header-main">
            <div className="app-container flex items-center justify-between py-6">
                {/* ... (Contenido del Logo y Enlaces de Escritorio) ... */}
                <div className="logo">
                    <Link href="/" className="flex items-center gap-4">
                        <Sun size={36} className="text-[var(--primary-color)]" />
                        <span className="logo-text text-4xl">OptiCommerce</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((item, index) => (
                        <Link key={index} href={item.href} className="nav-link text-lg font-medium text-[var(--text-color-primary)] hover:text-[var(--accent-color)] transition">
                            {item.label}
                        </Link>
                    ))}
                    <button 
                        onClick={() => onLoginClick('login')} 
                        className="btn btn-primary ml-4 px-6 py-2 text-lg"
                    >
                        Acceder
                    </button>
                </nav>

                {/* Botón de Volver (Solo si es necesario) */}
                {showBackButton && (
                    <Link 
                        href="/" 
                        className="hidden lg:flex items-center gap-2 text-[var(--text-color-primary)] font-medium hover:text-[var(--accent-color)] transition"
                    >
                        <ArrowLeft size={20} />
                        Volver al Inicio
                    </Link>
                )}

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-[var(--text-color-primary)]" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu Plegable */}
            {isMenuOpen && (
                <div className="mobile-menu bg-[var(--bg-card)] md:hidden border-t border-[var(--border-color)] p-4 shadow-xl absolute w-full z-10">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.href} 
                                className="mobile-nav-link p-3 rounded-lg text-lg font-semibold text-[var(--text-color-primary)] hover:bg-[var(--bg-hover)] transition flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.icon && <item.icon size={20} className="text-[var(--accent-color)]" />}
                                {item.label}
                            </Link>
                        ))}
                        <button 
                            onClick={() => { onLoginClick('login'); setIsMenuOpen(false); }} 
                            className="btn btn-primary mt-4 px-6 py-3 text-lg"
                        >
                            Acceder
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

// ===============================================
// 4. COMPONENTE FOOTER
// ===============================================

export function Footer() {
    return (
        <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] py-12">
            <div className="app-container text-center">
                <p className="text-[var(--text-color-secondary)] text-lg">
                    © {new Date().getFullYear()} OptiCommerce. Optimiza tu eCommerce con IA.
                </p>
            </div>
        </footer>
    );
}