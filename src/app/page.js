// src/app/page.js - VERSIÓN FINAL CON MENÚ DESPLEGABLE PROFESIONAL Y ESTABLE

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
// 🟢 COMPONENTE: Header con Menú Desplegable (PROFESIONAL Y ESTABLE)
// ---------------------------------------------
const Header = ({ onLoginClick }) => {
    // Estado para controlar la apertura del menú de servicios
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    
    // Colores para el diseño profesional del menú
    const accentColor = 'var(--accent-color, #1E90FF)'; // Color de acento
    const textColor = 'var(--text-color, #333333)';     // Color de texto principal
    const backgroundColor = 'white';                  // Fondo del menú

    // Usamos padding 0 aquí para que el div interno controle el espaciado
    return (
        <div style={{ padding: 0 }}>
            <header className="header-main" style={{
                // Usamos app-container para el ancho, pero forzamos el layout con flex
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px var(--app-padding, 20px)', // Usamos la variable de padding si existe, sino 20px
                borderBottom: `1px solid var(--border-color, #EEEEEE)`, 
                // Aseguramos que el header use el ancho completo si es necesario.
                width: '100%', 
                boxSizing: 'border-box'
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* LOGO LINK A HOME */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}> 
                        <Sun size={24} color={accentColor} style={{ marginRight: '8px' }} />
                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                            OptiCommerce
                        </h2>
                    </Link>
                </div>
                
                <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    
                    {/* 1. BOTÓN DESPLEGABLE DE SERVICIOS */}
                    <div 
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <button style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: textColor,
                            fontWeight: 500,
                            padding: '10px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'color 0.2s, background-color 0.2s',
                            borderRadius: '4px',
                            // Estilo cuando está abierto
                            backgroundColor: isServicesOpen ? 'var(--primary-color-light, #F0F8FF)' : 'transparent',
                            outline: 'none',
                        }}>
                            Servicios {isServicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        {/* MENÚ DESPLEGABLE */}
                        {isServicesOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 10px)', // Deja un espacio sutil entre el botón y el menú
                                left: '50%', // Centra el menú bajo el botón
                                transform: 'translateX(-50%)', 
                                minWidth: '350px',
                                background: backgroundColor,
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px #E0E0E0', // Sombra profesional con borde sutil
                                borderRadius: '12px',
                                padding: '10px',
                                zIndex: 1000,
                                // Animación de entrada
                                animation: 'fadeInDown 0.3s ease-out' 
                            }}>
                                {/* Estilos para la animación (deberían estar en un CSS global, pero los forzamos aquí si es necesario) 
                                    @keyframes fadeInDown { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }
                                */}
                                {SERVICE_LINKS.map((service) => (
                                    <Link 
                                        key={service.href} 
                                        href={service.href} 
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '12px 15px',
                                            textDecoration: 'none',
                                            color: textColor,
                                            borderRadius: '8px',
                                            transition: 'background-color 0.2s',
                                            gap: '15px',
                                            // Fondo sutil para el servicio principal
                                            backgroundColor: service.isPrimary ? 'var(--accent-color-light, #E0F7FA)' : 'transparent'
                                        }}
                                        // Efecto hover profesional
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = service.isPrimary ? 'var(--accent-color-light, #CCEEFF)' : 'var(--border-color, #F5F5F5)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = service.isPrimary ? 'var(--accent-color-light, #E0F7FA)' : 'transparent'}
                                    >
                                        <service.icon size={20} color={accentColor} />
                                        <div>
                                            <strong style={{ display: 'block', fontWeight: 600, fontSize: '1rem' }}>{service.name}</strong>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-color-secondary, #777)', margin: 0 }}>{service.description}</p>
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
                            color: textColor, 
                            textDecoration: 'none',
                            padding: '10px 15px' // Añadimos padding para que se alinee con el botón
                        }}
                    >
                        Precios
                    </Link>

                    {/* BOTÓN que abre el Modal en vista 'login' */}
                    <button className="btn btn-primary" onClick={() => onLoginClick('login')}> 
                        Iniciar Sesión
                    </button>
                    
                    {/* Botón de Menú Móvil (ocultar en desktop) - Mantenido por si acaso */}
                    <button style={{ display: 'none' }} onClick={() => {}}>
                        <Menu size={24} />
                    </button>
                </nav>
            </header>
        </div>
    );
};

// ---------------------------------------------
// 🟢 COMPONENTE: Footer Extendido (ESTABLE)
// ---------------------------------------------
const Footer = () => (
    <footer className="footer-main" style={{
        backgroundColor: 'var(--footer-bg-color, #F8F8F8)', 
        padding: '40px 0',
        marginTop: '60px' // Espacio extra para asegurar que no se "pegue" al contenido
    }}>
        <div className="app-container">
            <div className="footer-content" style={{
                // Forzamos el grid de 4 columnas para evitar que se apachurre
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '30px',
                paddingBottom: '30px',
                borderBottom: '1px solid #E0E0E0'
            }}>
                
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
                
                {/* SECCIÓN CRÍTICA DE SEO: LISTADO DE SERVICIOS */}
                <div className="footer-section">
                    <h4>Nuestros Servicios</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {/* Usamos el array SERVICE_LINKS para la consistencia del SEO */}
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

            {/* Parte inferior del footer */}
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
                        
                        {/* BOTÓN que abre el Modal en vista 'register' */}
                        <button 
                            className="btn btn-primary btn-large" 
                            style={{ marginTop: '20px' }}
                            onClick={() => handleOpenModal('register')} 
                        >
                            Comenzar a Optimizar Gratis
                        </button>
                    </div>
                    
                    {/* 🚨 FileDropzone en el lado derecho 🚨 */}
                    <div className="hero-right">
                        <FileDropzone 
                            isAuthenticated={false} 
                            onLimitReached={handleFreeLimitReached} 
                            userCredits={5} 
                            // Aseguramos que el servicio por defecto sea la optimización de imagen (WebP)
                            defaultService='image' 
                        />
                    </div>
                </section>

                {/* SECCIÓN 2: INSTRUCCIONES BÁSICAS (CÓDIGO CENTRAL SIN ALTERACIONES) */}
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

                {/* SECCIÓN 3: VENTAJAS Y CONFIANZA (CÓDIGO CENTRAL SIN ALTERACIONES) */}
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