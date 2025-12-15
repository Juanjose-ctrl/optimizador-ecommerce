// src/app/page.js - VERSIÓN FINAL CON ENLACES SEO INTEGRADOS

'use client'; 
import { useState } from 'react'; 
import Link from 'next/link';

// 🚨 IMPORTACIONES CLAVE 
import FileDropzone from './components/FileDropzone'; 
import AuthModal from './components/AuthModal'; 

// Importamos los íconos necesarios para el diseño
import { 
    CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign, 
    ChevronDown, ChevronUp, Image, Code, FileText 
} from 'lucide-react'; 

// ---------------------------------------------
// CONSTANTE DE SERVICIOS (Definidos una vez aquí)
// ---------------------------------------------
const SERVICE_LINKS = [
    { 
        name: "Optimizador WebP (Principal)", 
        href: "/", 
        icon: Image, 
        description: "Comprime imágenes para Core Web Vitals."
    },
    { 
        name: "Minificador CSS/JS", 
        href: "/minificador-css-js", 
        icon: Code, 
        description: "Acelera tu código eliminando espacios y comentarios."
    },
    { 
        name: "Limpiador de Metadatos EXIF", 
        href: "/limpiar-metadatos-imagen", 
        icon: FileText, 
        description: "Protege tu privacidad y reduce el peso al eliminar datos ocultos."
    },
];


// ---------------------------------------------
// COMPONENTE: FeatureCard
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
// 🟢 COMPONENTE: Header con Menú Desplegable (ACTUALIZADO)
// ---------------------------------------------
const Header = ({ onLoginClick }) => {
    // Estado para controlar la visibilidad del menú desplegable de servicios
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    return (
        <div className="app-container">
            <header className="header-main">
                <div className="logo">
                    {/* LOGO LINK A HOME */}
                    <Link href="/"> 
                        <Sun size={24} color="var(--accent-color)" style={{ marginRight: '8px' }} />
                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                            OptiCommerce
                        </h2>
                    </Link>
                </div>
                
                <nav>
                    {/* 1. BOTÓN DESPLEGABLE DE SERVICIOS */}
                    <div 
                        className="service-dropdown-container"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <button className="nav-link services-button">
                            Nuestros Servicios {isServicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        {isServicesOpen && (
                            <div className="dropdown-menu">
                                {SERVICE_LINKS.map((service) => (
                                    <Link 
                                        key={service.href} 
                                        href={service.href} 
                                        className="dropdown-item"
                                        // Usamos el evento onMouseLeave del contenedor para cerrar el menú
                                    >
                                        <service.icon size={18} />
                                        <div>
                                            <strong>{service.name}</strong>
                                            <p>{service.description}</p>
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
                            marginRight: '20px', 
                            fontWeight: 500, 
                            color: 'var(--text-color)', 
                            textDecoration: 'none' 
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
// 🟢 COMPONENTE: Footer Extendido (ACTUALIZADO)
// ---------------------------------------------
const Footer = () => (
    <footer className="footer-main">
        <div className="app-container">
            <div className="footer-content">
                
                <div className="footer-section">
                    <div className="logo">
                        <Link href="/">
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
                
                {/* 🛑 SECCIÓN CRÍTICA DE SEO: LISTADO DE SERVICIOS 🛑 */}
                <div className="footer-section">
                    <h4>Nuestros Servicios</h4>
                    {SERVICE_LINKS.map((service) => (
                        <Link 
                            key={service.href} 
                            href={service.href} 
                            className='footer-link'
                        >
                            {service.name}
                        </Link>
                    ))}
                </div>

                <div className="footer-section">
                    <h4>Información Legal</h4>
                    <Link href="/terminos" className='footer-link'>Términos y Condiciones</Link>
                    <Link href="/privacidad" className='footer-link'>Política de Privacidad</Link>
                    <Link href="/reembolso" className='footer-link'>Política de Reembolso</Link>
                    <Link href="/cookies" className='footer-link'>Política de Cookies</Link>
                </div>

                <div className="footer-section">
                    <h4>Empresa</h4>
                    <Link href="/about" className='footer-link'>Sobre Nosotros</Link>
                    <Link href="/contact" className='footer-link'>Contacto</Link>
                    <Link href="/faq" className='footer-link'>Preguntas Frecuentes (FAQ)</Link>
                </div>
            </div>
        </div>
    </footer>
);


// ---------------------------------------------
// COMPONENTE PRINCIPAL: Landing Page
// ---------------------------------------------
export default function LandingPage() {
    // Estado para controlar la visibilidad y vista del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState('login'); 

    const handleOpenModal = (view) => {
        setModalView(view);
        setIsModalOpen(true);
    };

    // Función que se llama cuando el FileDropzone detecta el error 402 del Backend
    const handleFreeLimitReached = () => {
        // Obligamos al modal a abrirse en la vista de REGISTRO, ya que es el siguiente paso lógico.
        handleOpenModal('register');
    };
    
    // NOTA: Tienes que asegurar que tus estilos CSS para .service-dropdown-container, 
    // .dropdown-menu, y .dropdown-item estén definidos en tu archivo CSS global.

    return (
        <>
            {/* HEADERS Y FOOTERS INCLUIDOS AQUÍ */}
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
                        
                        {/* BOTÓN que abre el Modal en vista 'register' */}
                        <button 
                            className="btn btn-primary btn-large" 
                            style={{ marginTop: '20px' }}
                            onClick={() => handleOpenModal('register')} 
                        >
                            Comenzar a Optimizar Gratis
                        </button>
                    </div>
                    
                    {/* 🚨 Dropzone y Selector de Servicios */}
                    <div className="hero-right">
                        <FileDropzone 
                            isAuthenticated={false} 
                            onLimitReached={handleFreeLimitReached} 
                            userCredits={5} 
                            defaultService='image' // Por defecto el optimizador principal
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
                            <p><strong>Sube tu Archivo.</strong> Arrastra el archivo a la zona de carga (imagen, CSS, o JS).</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">3</div>
                            <p><strong>Optimiza y Ahorra.</strong> Selecciona el servicio (WebP, Minificar, Metadatos) y procesa.</p>
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
                        <FeatureCard icon={TrendingUp} title="Rendimiento Web Superior" description="Aumenta tu puntuación de PageSpeed y reduce tu tasa de rebote gracias a la velocidad de carga." color="#FF7F50" />
                        <FeatureCard icon={Leaf} title="Conciencia Ecológica" description="Archivos más pequeños significan menos consumo de energía en transferencia de datos. Optimización sostenible." color="#40B5AD" />
                        <FeatureCard icon={DollarSign} title="Ahorro en Hosting" description="Menos ancho de banda utilizado por tus visitantes se traduce en menores costos mensuales de alojamiento." color="#607D8B" />
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