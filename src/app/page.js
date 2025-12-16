// src/app/page.js - VERSIÓN CORREGIDA FINAL (Soluciona error 'Zap is not defined')

'use client'; 
import { useState } from 'react'; 
import Link from 'next/link';

// 🚨 IMPORTACIONES CLAVE 
import FileDropzone from './components/FileDropzone'; 
import AuthModal from './components/AuthModal'; 

// 🚨 CORRECCIÓN CRÍTICA: Se añade 'Zap' y 'Menu' 🚨
import { 
    CheckCircle, Sun, Shield, TrendingUp, Leaf, DollarSign, 
    ChevronDown, ChevronUp, Image, Code, FileText, Menu, Zap // <--- ZAP Y MENU AÑADIDOS
} from 'lucide-react'; 

// ---------------------------------------------
// CONSTANTE DE SERVICIOS (Definidos una vez aquí)
// ---------------------------------------------
const SERVICE_CATEGORIES = [
    {
        category: "Optimización de Archivos",
        icon: Zap, // <--- Aquí se usa Zap
        color: "var(--accent-color)", // #10B981
        services: [
            { 
                name: "Optimizador WebP/Imágenes", 
                href: "/", 
                icon: Image, 
                description: "Comprime imágenes de producto para Core Web Vitals (WebP, JPEG, PNG).",
                isPrimary: true
            },
            { 
                name: "Minificador CSS/JS", 
                href: "/minificador-css-js", 
                icon: Code, 
                description: "Acelera tu código eliminando espacios, comentarios y bytes innecesarios.",
                isPrimary: false
            },
        ]
    },
    {
        category: "Seguridad y Privacidad",
        icon: Shield,
        color: "var(--primary-color)", // #008080
        services: [
            { 
                name: "Limpiador de Metadatos", 
                href: "/limpiar-metadatos-imagen", 
                icon: FileText, 
                description: "Protege tu privacidad y reduce el peso al eliminar datos EXIF y ocultos.",
                isPrimary: false
            },
        ]
    },
];


// ---------------------------------------------
// COMPONENTE: FeatureCard (Sin cambios)
// ---------------------------------------------
const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="feature-card">
        <div className="icon-wrapper" style={{ backgroundColor: color }}>
            <Icon size={32} color="white" />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
    </div>
);


// ---------------------------------------------
// 🟢 COMPONENTE: Header con Mega Menú (ESTABLE y Fijo)
// ---------------------------------------------
export const Header = ({ onLoginClick }) => { // Exportar para usar en otras pages
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    
    // Usamos variables de tus colores para estilos inline
    const primaryColor = 'var(--primary-color, #008080)';
    const textColorPrimary = 'var(--text-color-primary, #1A202C)';
    const borderColor = 'var(--border-color, #E2E8F0)';

    return (
        <div className="app-container" style={{ padding: 0 }}>
            <header className="header-main" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0', 
                borderBottom: `1px solid ${borderColor}`, 
                width: '100%', 
                boxSizing: 'border-box'
            }}>
                
                {/* 1. SECCIÓN IZQUIERDA: Logo + Caja Fija de Servicios */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    
                    {/* LOGO LINK */}
                    <div className="logo">
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}> 
                            <Sun size={28} color={primaryColor} style={{ marginRight: '8px' }} />
                            <h2 style={{ margin: 0, fontSize: '1.6rem', color: primaryColor, fontWeight: 800 }}>
                                OptiCommerce
                            </h2>
                        </Link>
                    </div>

                    {/* 2. CONTENEDOR FIJO DE SERVICIOS (El trigger del Mega Menú) */}
                    <div 
                        className="services-mega-menu-container"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <div className="services-fixed-box">
                             <Menu size={18} style={{ marginRight: '8px' }} />
                             <span>Nuestros Servicios</span>
                        </div>
                        
                        {/* 3. MEGA MENÚ DESPLEGABLE */}
                        <div className={`mega-menu-dropdown ${isServicesOpen ? 'is-open' : ''}`}>
                            <div className="mega-menu-grid">
                                
                                {SERVICE_CATEGORIES.map((categoryData, index) => (
                                    <div key={index} className="mega-menu-category">
                                        <h4 className="category-title" style={{ color: categoryData.color }}>
                                            <categoryData.icon size={20} style={{ marginRight: '8px' }} />
                                            {categoryData.category}
                                        </h4>
                                        <div className="category-links">
                                            {categoryData.services.map((service) => (
                                                <Link 
                                                    key={service.href} 
                                                    href={service.href} 
                                                    className="mega-menu-link"
                                                    // Cerrar el menú al hacer clic en un enlace
                                                    onClick={() => setIsServicesOpen(false)} 
                                                >
                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                        <service.icon size={18} color={primaryColor} style={{ marginTop: '2px' }}/>
                                                        <div>
                                                            <strong style={{ fontWeight: 600, display: 'block' }}>{service.name}</strong>
                                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-color-secondary)' }}>
                                                                {service.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div> 
                
                {/* 2. SECCIÓN DERECHA: Navegación estándar */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    
                    <Link 
                        href="/pricing" 
                        className="nav-link" 
                        style={{ 
                            fontWeight: 500, 
                            color: textColorPrimary, 
                            textDecoration: 'none',
                            padding: '10px 15px' 
                        }}
                    >
                        Precios
                    </Link>

                    <button className="btn btn-primary" onClick={() => onLoginClick('login')}> 
                        Iniciar Sesión
                    </button>
                </nav>
            </header>
        </div>
    );
};

// ---------------------------------------------
// COMPONENTE: Footer Extendido (ESTABLE)
// ---------------------------------------------
export const Footer = () => (
    <footer className="footer-main">
        <div className="app-container">
            <div className="footer-content">
                
                <div className="footer-section">
                    <div className="logo">
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Sun size={24} color="var(--primary-color)" style={{ marginRight: '8px' }} />
                        <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>OptiCommerce</h4>
                        </Link>
                    </div>
                    <small style={{ display: 'block', marginTop: '15px', color: 'var(--text-color-secondary)' }}>
                        © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
                    </small>
                    <small style={{ display: 'block', marginTop: '5px', color: 'var(--text-color-secondary)' }}>
                        Desarrollado por Juan José Guerrero.
                    </small>
                </div>
                
                <div className="footer-section">
                    <h4>Nuestros Servicios</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {SERVICE_CATEGORIES.flatMap(cat => cat.services).map((service) => (
                            <Link 
                                key={service.href} 
                                href={service.href} 
                                className='footer-link'
                                style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}
                            >
                                {service.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Información Legal</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Link href="/terminos" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Términos y Condiciones</Link>
                        <Link href="/privacidad" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Política de Privacidad</Link>
                        <Link href="/reembolso" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Política de Reembolso</Link>
                        <Link href="/cookies" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Política de Cookies</Link>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Empresa</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Link href="/about" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Sobre Nosotros</Link>
                        <Link href="/contact" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Contacto</Link>
                        <Link href="/faq" className='footer-link' style={{ color: 'var(--text-color-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Preguntas Frecuentes (FAQ)</Link>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-color-secondary)' }}>
                <span>Optimización avanzada para un futuro web más rápido y ecológico.</span>
            </div>
        </div>
    </footer>
);

// ---------------------------------------------
// COMPONENTE PRINCIPAL: Landing Page
// ---------------------------------------------
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
            <Header onLoginClick={handleOpenModal} /> 

            <main className="app-container">
                
                {/* SECCIÓN 1: HERO y ZONA DE ACCIÓN */}
                <section className="section-hero">
                    <div className="hero-left">
                        <h1 className="hero-title">
                            Optimización de Imágenes <br /> para eCommerce Ecológica y Eficiente
                        </h1>
                        <p className="hero-subtitle">
                            Reduce el peso de tus imágenes de producto hasta un 70% sin perder calidad.
                        </p>
                        
                        <div className="benefit-list">
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Prueba gratuita de 5 optimizaciones.</p>
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Compatible con WEBP, JPEG y PNG.</p>
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Compresión sin pérdida de calidad.</p>
                        </div>
                        
                        <button 
                            className="btn btn-primary btn-large" 
                            style={{ marginTop: '20px' }}
                            onClick={() => handleOpenModal('register')} 
                        >
                            Comenzar a Optimizar Gratis
                        </button>
                    </div>
                    
                    {/* Dropzone */}
                    <div className="hero-right">
                        <FileDropzone 
                            isAuthenticated={false} 
                            onLimitReached={handleFreeLimitReached} 
                            userCredits={5} 
                            defaultService='image' 
                        />
                    </div>
                </section>

                {/* SECCIÓN 2: INSTRUCCIONES BÁSICAS */}
                <section className="section-box section-instructions">
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

                {/* SECCIÓN 3: VENTAJAS Y CONFIANZA */}
                <section className="section-box section-features">
                    <h2 className="section-title">¿Por qué OptiCommerce es la mejor opción?</h2>
                    <div className="features-grid">
                        <FeatureCard icon={Shield} title="Seguridad de Datos" description="Tus datos y archivos están protegidos con encriptación HTTPS. Total tranquilidad para tu negocio." color="#008080" />
                        <FeatureCard icon={TrendingUp} title="Rendimiento Web Superior" description="Aumenta tu puntuación de PageSpeed y reduce tu tasa de rebote gracias a la velocidad de carga." color="#10B981" />
                        <FeatureCard icon={Leaf} title="Conciencia Ecológica" description="Archivos más pequeños significan menos consumo de energía en transferencia de datos. Optimización sostenible." color="#40B5AD" />
                        <FeatureCard icon={DollarSign} title="Ahorro en Hosting" description="Menos ancho de banda utilizado por tus visitantes se traduce en menores costos mensuales de alojamiento." color="#1A202C" />
                    </div>
                </section>
                
            </main>

            {/* Renderiza el Modal */}
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialView={modalView}
            />
            
            <Footer />
        </>
    );
}