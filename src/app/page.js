// src/app/page.js - VERSIÓN FINAL Y COMPILABLE

'use client';
import { useState } from 'react';
import Link from 'next/link';

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';
// Asumiendo que estos componentes existen
// Nota: Si Header y Footer son internos a page.js, no necesitan importación,
// pero si están en archivos separados, deben ser importados aquí.
// Asumimos que los tienes definidos más abajo o importados de otro archivo.

import {
  CheckCircle, Sun, Shield, TrendingUp, Leaf, DollarSign, Zap,
  ChevronDown, ChevronUp, Image, Code, FileText // Asegúrate de importar Zap
} from 'lucide-react';

// 🚨 EXPORTAMOS LA LISTA DE SERVICIOS (Con la propiedad 'key' restaurada)
export const SERVICE_LINKS = [
  { key: "image", name: "Optimizador WebP", href: "/", icon: Image, description: "Comprime imágenes para Core Web Vitals.", isPrimary: true },
  { key: "minify", name: "Minificador CSS/JS", href: "/minificador-css-js", icon: Code, description: "Acelera tu código eliminando espacios y comentarios.", isPrimary: false },
  { key: "metadata", name: "Limpiador de Metadatos", href: "/limpiar-metadatos-imagen", icon: FileText, description: "Protege tu privacidad y reduce el peso al eliminar datos ocultos.", isPrimary: false },
];

// 🚨 DEFINICIÓN AÑADIDA PARA SOLUCIONAR EL ERROR DE REFERENCIA EN VERCEL
export const SERVICE_CATEGORIES = [
  {
    name: "Herramientas de Optimización Web",
    links: SERVICE_LINKS,
  }
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

// HEADER (Con chequeo de nulidad para evitar el TypeError en Vercel)
const Header = ({ onLoginClick }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    
    const toggleServicesMenu = () => setIsServicesOpen(!isServicesOpen);
    const CloseIcon = isServicesOpen ? ChevronUp : ChevronDown;

    return (
        <header className="header-main">
            <div className="app-container">
                <nav className="header-nav">
                    <Link href="/" className="logo">
                        OptiCommerce <Zap size={24} color="#008080" />
                    </Link>

                    <div className="nav-menu">
                        <div className="services-dropdown">
                            <button onClick={toggleServicesMenu} className="dropdown-toggle">
                                Servicios <CloseIcon size={18} />
                            </button>
                            {isServicesOpen && (
                                <div className="dropdown-menu">
                                    {SERVICE_CATEGORIES.map((category, catIndex) => (
                                        <div key={catIndex} className="category-group">
                                            {SERVICE_CATEGORIES.length > 1 && <h4 className="category-title">{category.name}</h4>} 
                                            <div className="category-links">
                                                {category.links.map(link => (
                                                    // 🚨 CHEQUEO CRÍTICO: link && para prevenir el error 'href'
                                                    link && (
                                                        <Link 
                                                            key={link.key} 
                                                            href={link.href} 
                                                            className="dropdown-link" 
                                                            onClick={() => setIsServicesOpen(false)}
                                                        >
                                                            <link.icon size={20} />
                                                            <div>
                                                                <span className="link-name">{link.name}</span>
                                                                <p className="link-description">{link.description}</p>
                                                            </div>
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <Link href="/precios" className="nav-link">Precios</Link>
                        <button onClick={onLoginClick} className="btn btn-secondary">
                            Iniciar Sesión
                        </button>
                    </div>

                    <div className="mobile-menu-toggle">
                        <button onClick={onLoginClick} className="btn btn-secondary">
                            <Sun size={20} />
                        </button>
                    </div>

                </nav>
            </div>
        </header>
    );
};

// FOOTER (Chequeo similar para el Footer)
const Footer = () => (
    <footer className="footer-main">
        <div className="app-container">
            <div className="footer-content">
                <div className="footer-section footer-brand">
                    <Link href="/" className="logo">
                        OptiCommerce <Zap size={24} color="#FFFFFF" />
                    </Link>
                    <p>Optimización web profesional para Core Web Vitals.</p>
                </div>
                
                <div className="footer-section">
                    <h4>Servicios</h4>
                    <ul>
                        {SERVICE_LINKS.map(link => (
                            // 🚨 CHEQUEO SIMILAR PARA EL FOOTER
                            link && <li key={link.key}><Link href={link.href}>{link.name}</Link></li>
                        ))}
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Empresa</h4>
                    <ul>
                        <li><Link href="/precios">Precios</Link></li>
                        <li><a href="mailto:soporte@opticomerce.com">Contacto</a></li>
                        <li><Link href="/legal">Términos y Condiciones</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.</p>
                <div className="social-links">
                    {/* Iconos de redes sociales */}
                </div>
            </div>
        </div>
    </footer>
);


export default function Home({ initialService = 'image' }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState('login'); 

    const handleLimitReached = () => {
        setModalView('register');
        setIsModalOpen(true);
    };

    const handleLoginClick = () => {
        setModalView('login');
        setIsModalOpen(true);
    };
    
    // Obtiene la clave del servicio de la URL actual para el FileDropzone
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const currentLink = SERVICE_LINKS.find(link => link.href === currentPath) || SERVICE_LINKS[0];
    const currentServiceKey = currentLink.key;

    return (
        <>
            <Header onLoginClick={handleLoginClick} />

            <div className="main-content-wrapper">
                <main className="app-container">

                    {/* SECCIÓN PRINCIPAL DE OPTIMIZACIÓN */}
                    <section className="section-hero">
                        <div className="hero-left">
                            <h1 className="hero-title">Acelera tu Tienda Shopify con <span className="highlight">Optimización Inteligente</span></h1>
                            <p className="hero-subtitle">OptiCommerce reduce el tamaño de tus archivos web automáticamente para mejorar tus Core Web Vitals y posicionamiento SEO.</p>
                            <Link href="#optimization-section" className="btn btn-primary btn-cta">
                                Empezar Gratis <Zap size={20} style={{ marginLeft: '5px' }} />
                            </Link>
                        </div>
                        <div className="hero-right">
                            <img 
                                src="/images/hero-image-placeholder.webp" 
                                alt="Dashboard de optimización web" 
                                className="hero-image"
                            />
                        </div>
                    </section>
                    
                    <a id="optimization-section"></a> 

                    <FileDropzone 
                        isAuthenticated={false} 
                        onLimitReached={handleLimitReached} 
                        // 🚨 Usamos la clave del servicio obtenida de la URL, o 'image' por defecto
                        defaultService={currentServiceKey} 
                    />

                    {/* SECCIÓN HOW IT WORKS */}
                    <section className="section-box section-steps">
                        <h2 className="section-title">¿Cómo funciona?</h2>
                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <p><strong>Selecciona tu Servicio.</strong> Escoge entre Optimizador WebP, Minificador CSS/JS o Limpiador de Metadatos.</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <p><strong>Sube tus Archivos.</strong> Arrastra y suelta tus imágenes o código. Aceptamos múltiples archivos a la vez.</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <p><strong>Optimización Automática.</strong> Nuestro motor procesa tus archivos en segundos.</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">4</div>
                                <p><strong>Descarga Instantánea.</strong> Descarga tus archivos optimizados y listos para subir a tu web.</p>
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