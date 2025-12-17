// src/components/SharedComponents.js
import Link from 'next/link';
import { Sun, ArrowLeft, Menu, X, Image as ImageIcon, Palette } from 'lucide-react';
import { useState } from 'react'; // Necesitas useState para el menú plegable/móvil

// Asegúrate de que tu componente Header sea 'use client' si usa hooks o props como onLoginClick
// Si SharedComponents.js no tiene 'use client' y Header usa hooks, deberás mover 'use client' a este archivo.

export function Header({ showBackButton = true, onLoginClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/favicon", label: "Generador de Favicon", icon: ImageIcon }, // Nuevo enlace
        { href: "/colors", label: "Optimizador de Paleta", icon: Palette }, // Nuevo enlace
        { href: "/about", label: "Sobre Nosotros" },
        { href: "/contact", label: "Contacto" },
    ];

    return (
        <header className="header-main">
            <div className="app-container flex items-center justify-between py-6">
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

// (El componente Footer permanece sin cambios, justo debajo de Header)
export function Footer() {
    return (
        <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] py-12">
            {/* ... Contenido del Footer ... */}
            <div className="app-container text-center">
                <p className="text-[var(--text-color-secondary)] text-lg">
                    © {new Date().getFullYear()} OptiCommerce. Optimiza tu eCommerce con IA.
                </p>
            </div>
        </footer>
    );
}