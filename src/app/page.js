// src/app/page.js - VERSIÓN CORREGIDA CON DROPZONE PÚBLICO

'use client'; 
import { useState } from 'react'; 
import Link from 'next/link';

// 🚨 IMPORTACIONES CLAVE AÑADIDAS 🚨
// Asegúrate de que FileDropzone.js contenga toda la lógica de cliente
import FileDropzone from './components/FileDropzone'; 
import AuthModal from './components/AuthModal'; 

// Importamos los íconos necesarios para el diseño
import { CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign } from 'lucide-react'; 

// ---------------------------------------------
// COMPONENTE: FeatureCard (SIN CAMBIOS)
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
// COMPONENTE: Header Minimalista (SIN CAMBIOS)
// ---------------------------------------------
const Header = ({ onLoginClick }) => ( 
    <div className="app-container">
        <header className="header-main">
            <div className="logo">
                <Sun size={24} color="var(--accent-color)" style={{ marginRight: '8px' }} />
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                    OptiCommerce
                </h2>
            </div>
            <nav>
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

// ---------------------------------------------
// COMPONENTE: Footer Extendido (SIN CAMBIOS)
// ---------------------------------------------
const Footer = () => (
    <footer className="footer-main">
        <div className="app-container">
            <div className="footer-content">
                
                <div className="footer-section">
                    <div className="logo">
                        <Sun size={24} color="var(--primary-color)" style={{ marginRight: '8px' }} />
                        <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>OptiCommerce</h4>
                    </div>
                    <small style={{ display: 'block', marginTop: '15px', color: 'var(--text-color-secondary)' }}>
                        © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
                    </small>
                    <small style={{ display: 'block', marginTop: '5px', color: 'var(--text-color-secondary)' }}>
                        Desarrollado por [Tu Nombre/Compañía Legal].
                    </small>
                </div>
                
                <div className="footer-section">
                    <h4>Nuestros Servicios</h4>
                    <Link href="/" className='footer-link'>Optimización de Imágenes</Link>
                    <a className='footer-link' style={{ color: 'var(--text-color-secondary)' }}>(Espacio para futuro servicio 2)</a>
                    <a className='footer-link' style={{ color: 'var(--text-color-secondary)' }}>(Espacio para futuro servicio 3)</a>
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
                    <a className='footer-link'>Sobre Nosotros</a>
                    <a className='footer-link'>Contacto</a>
                    <a className='footer-link'>Preguntas Frecuentes (FAQ)</a>
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
                    
                    {/* 🚨 REEMPLAZO: Usamos el FileDropzone FUNCIONAL 🚨 */}
                    <div className="hero-right">
                        <FileDropzone 
                            isAuthenticated={false} // Siempre falso en la Landing Page
                            onLimitReached={handleFreeLimitReached} // 👈 NUEVA LÓGICA
                            userCredits={5} // Se usa para la UI inicial si quieres mostrar "5 optimizaciones restantes"
                        />
                    </div>
                </section>

                {/* SECCIÓN 2: INSTRUCCIONES BÁSICAS (Actualizado para el proceso actual) */}
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

                {/* SECCIÓN 3: VENTAJAS Y CONFIANZA (SIN CAMBIOS) */}
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