// src/app/page.js - VERSIÓN FINAL COMPLETA

'use client'; 
import { useState } from 'react'; // Necesario para el Modal
import Link from 'next/link'; // Necesario para los enlaces del Footer
import AuthModal from './components/AuthModal'; 
import { CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign } from 'lucide-react'; 
// Importar 'lucide-react' fue el primer fix crítico que hicimos.

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
// COMPONENTE: Header Minimalista
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
                <button className="btn btn-primary" onClick={() => onLoginClick('login')}>
                    Iniciar Sesión
                </button>
            </nav>
        </header>
    </div>
);


// ---------------------------------------------
// COMPONENTE: Footer
// ---------------------------------------------
const Footer = () => (
    <footer className="footer-main">
        <div className="app-container footer-content">
            <div className="footer-links">
                <Link href="/politica-privacidad">Política de Privacidad</Link>
                <Link href="/terminos-servicio">Términos de Servicio</Link>
                <Link href="/contacto">Contacto</Link>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.</p>
        </div>
    </footer>
);


// ---------------------------------------------
// COMPONENTE PRINCIPAL: Landing Page
// ---------------------------------------------
export default function LandingPage() {
    // Estado para controlar la visibilidad y vista del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState('login'); // 'login' o 'register'

    const handleOpenModal = (view) => {
        setModalView(view);
        setIsModalOpen(true);
    };

    return (
        <>
            <Header onLoginClick={handleOpenModal} /> 

            <main className="app-container">
                
                {/* ========================================= */}
                {/* SECCIÓN 1: HERO y ZONA DE ACCIÓN */}
                {/* ========================================= */}
                <section className="section-hero">
                    <div className="hero-left">
                        <h1 className="hero-title">
                            Optimización de Imágenes <br /> para eCommerce Ecológica y Eficiente
                        </h1>
                        <p className="hero-subtitle">
                            Reduce el peso de tus imágenes de producto hasta un 70% sin perder calidad.
                        </p>
                        
                        <div className="benefit-list">
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Compresión sin pérdida de calidad.</p>
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Compatible con WEBP, JPEG y PNG.</p>
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Uso gratuito hasta 100 créditos.</p>
                        </div>
                        
                        <button 
                            className="btn btn-primary btn-large" 
                            style={{ marginTop: '20px' }}
                            onClick={() => handleOpenModal('register')} 
                        >
                            Comenzar a Optimizar Gratis
                        </button>

                    </div>
                    
                    {/* Zona de Dropzone (Maqueta visual) */}
                    <div className="hero-right">
                        <div className="dropzone-mockup">
                            <CloudUpload size={48} color="var(--accent-color)" />
                            <p className="dropzone-text">Arrastra y suelta tu archivo aquí</p>
                            <div className="dropzone-separator">O</div>
                            <button className="btn btn-secondary">Subir Imagen</button>
                            <small>Máximo 10MB</small>
                        </div>
                    </div>
                </section>

                {/* ========================================= */}
                {/* SECCIÓN 2: CARACTERÍSTICAS (Las tarjetas) */}
                {/* ========================================= */}
                <section className="section-features">
                    <h2>¿Por qué elegir OptiCommerce?</h2>
                    <p className="section-subtitle">Más velocidad, menos huella de carbono y mayor conversión.</p>
                    <div className="features-grid">
                        <FeatureCard 
                            icon={Leaf} 
                            title="Impacto Ecológico" 
                            description="Reducimos el peso de tus imágenes, disminuyendo la energía necesaria para la transferencia de datos." 
                            color="#38A169"
                        />
                        <FeatureCard 
                            icon={Zap} 
                            title="Velocidad de Carga" 
                            description="Las imágenes optimizadas hacen que tu tienda cargue hasta 3 veces más rápido, mejorando la experiencia del usuario." 
                            color="#4299E1"
                        />
                        <FeatureCard 
                            icon={TrendingUp} 
                            title="Mejor SEO y Conversión" 
                            description="Google ama las páginas rápidas. Mejora tu posicionamiento y convierte más visitantes en clientes." 
                            color="#ECC94B"
                        />
                        <FeatureCard 
                            icon={Shield} 
                            title="Seguridad y Privacidad" 
                            description="Procesamos tus archivos de forma segura. Tus imágenes y datos nunca son compartidos con terceros." 
                            color="#9F7AEA"
                        />
                    </div>
                </section>

                {/* ========================================= */}
                {/* SECCIÓN 3: CTA FINAL */}
                {/* ========================================= */}
                <section className="section-cta">
                    <div className="cta-box">
                        <DollarSign size={40} color="white" />
                        <h3>Empieza a ahorrar y a crecer hoy</h3>
                        <p>Optimiza tus primeras 100 imágenes gratis. No se requiere tarjeta de crédito.</p>
                        <button 
                            className="btn btn-primary btn-large"
                            onClick={() => handleOpenModal('register')}
                        >
                            ¡Regístrate y Comienza!
                        </button>
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
