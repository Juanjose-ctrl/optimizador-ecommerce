// src/app/page.js - VERSIÓN CORREGIDA FINAL: Layout Estable y Menú Desplegable Robusto

'use client'; 
import { useState } from 'react'; 
import Link from 'next/link';

// 🚨 IMPORTACIONES CLAVE 
import FileDropzone from './components/FileDropzone'; 
import AuthModal from './components/AuthModal'; 

// Importamos los íconos necesarios para el diseño
import { 
    CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign, 
    ChevronDown, ChevronUp, Image, Code, FileText, Menu // Nuevos íconos para el menú
} from 'lucide-react'; 

// ---------------------------------------------
// CONSTANTE DE SERVICIOS (Definidos una vez aquí)
// ---------------------------------------------
const SERVICE_LINKS = [
    { 
        name: "Optimizador WebP", 
        href: "/", 
        icon: Image, 
        description: "Comprime imágenes para Core Web Vitals.",
        isPrimary: true
    },
    { 
        name: "Minificador CSS/JS", 
        href: "/minificador-css-js", 
        icon: Code, 
        description: "Acelera tu código eliminando espacios y comentarios.",
        isPrimary: false
    },
    { 
        name: "Limpiador de Metadatos", 
        href: "/limpiar-metadatos-imagen", 
        icon: FileText, 
        description: "Protege tu privacidad y reduce el peso al eliminar datos ocultos.",
        isPrimary: false
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
// 🟢 COMPONENTE: Header con Menú Desplegable (CORREGIDO Y ROBUSTO)
// ---------------------------------------------
const Header = ({ onLoginClick }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    
    // Usamos variables de tus colores para estilos inline
    const accentColor = 'var(--accent-color, #10B981)'; 
    const primaryColor = 'var(--primary-color, #008080)';
    const textColorPrimary = 'var(--text-color-primary, #1A202C)';
    const bgCard = 'var(--bg-card, #FFFFFF)';
    const borderColor = 'var(--border-color, #E2E8F0)';
    const textColorSecondary = 'var(--text-color-secondary, #718096)';
    const radiusMedium = 'var(--radius-medium, 12px)';

    return (
        // 🚨 CAMBIO CLAVE: El header ahora está contenido dentro del app-container 🚨
        <div className="app-container" style={{ padding: 0 }}>
            <header className="header-main" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0', // El padding lateral lo da el app-container
                borderBottom: `1px solid ${borderColor}`, 
                width: '100%', 
                boxSizing: 'border-box'
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* LOGO LINK A HOME */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}> 
                        <Sun size={24} color={primaryColor} style={{ marginRight: '8px' }} />
                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: primaryColor }}>
                            OptiCommerce
                        </h2>
                    </Link>
                </div>
                
                <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    
                    {/* 1. CONTENEDOR ROBUSTO PARA EL MENÚ DESPLEGABLE */}
                    <div 
                        style={{ position: 'relative' }}
                        // 🚨 SOLUCIÓN AL CIERRE INESPERADO: Los eventos están en el contenedor padre 🚨
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <button style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: textColorPrimary,
                            fontWeight: 500,
                            padding: '10px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'color 0.2s, background-color 0.2s',
                            borderRadius: '4px',
                            // Estilo cuando está abierto
                            backgroundColor: isServicesOpen ? 'rgba(0, 128, 128, 0.1)' : 'transparent', // Teal más claro
                            outline: 'none',
                            minWidth: '130px' // Asegura un ancho mínimo para que no salte
                        }}>
                            Servicios {isServicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        {/* MENÚ DESPLEGABLE */}
                        {isServicesOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 5px)', // Reducimos el espacio a 5px
                                left: '50%', 
                                transform: 'translateX(-50%)', 
                                minWidth: '350px',
                                background: bgCard,
                                boxShadow: 'var(--shadow-lg)', 
                                borderRadius: radiusMedium,
                                padding: '10px',
                                zIndex: 1000,
                                // Pequeño margen superior para que el mouse pueda transicionar
                                marginTop: '5px' 
                            }}>
                                {SERVICE_LINKS.map((service) => (
                                    <Link 
                                        key={service.href} 
                                        href={service.href} 
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '12px 15px',
                                            textDecoration: 'none',
                                            color: textColorPrimary,
                                            borderRadius: '8px',
                                            transition: 'background-color 0.2s',
                                            gap: '15px',
                                            backgroundColor: service.isPrimary ? 'rgba(16, 185, 129, 0.05)' : 'transparent'
                                        }}
                                        // Efecto hover profesional
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-page)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = service.isPrimary ? 'rgba(16, 185, 129, 0.05)' : 'transparent'}
                                    >
                                        <service.icon size={20} color={primaryColor} />
                                        <div>
                                            <strong style={{ display: 'block', fontWeight: 600, fontSize: '1rem' }}>{service.name}</strong>
                                            <p style={{ fontSize: '0.85rem', color: textColorSecondary, margin: 0 }}>{service.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    
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

                    {/* BOTÓN que abre el Modal en vista 'login' */}
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
// (Mantengo la versión del footer que usa tus variables CSS)
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
                        {SERVICE_LINKS.map((service) => (
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
    // ... Lógica y estado sin cambios ...
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

            {/* 🚨 CONTENIDO CENTRAL: Esto es lo que estaba 'apachurrado'. Al ser un contenedor independiente, recupera su espacio. 🚨 */}
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