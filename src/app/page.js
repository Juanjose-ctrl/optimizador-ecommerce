// src/app/page.js - ESTRUCTURA CON NUEVOS ESTILOS (VERDE AZULADO/CORAL)

'use client'; 
import Link from 'next/link';
// Importamos los íconos necesarios para el diseño
import { CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign } from 'lucide-react'; 

// Componente para el Header Minimalista (PUBLICO)
const Header = () => (
    <div className="app-container">
        <header className="header-main">
            <div className="logo">
                <Sun size={24} color="var(--accent-color)" style={{ marginRight: '8px' }} />
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                    OptiCommerce
                </h2>
            </div>
            <nav>
                <Link href="/login" legacyBehavior>
                    <a className="btn btn-primary">
                        Iniciar Sesión
                    </a>
                </Link>
            </nav>
        </header>
    </div>
);

// Componente de Tarjeta de Confianza
const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="feature-card">
        <div className="icon-wrapper" style={{ backgroundColor: color }}>
            <Icon size={32} color="white" />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
    </div>
);


// Componente principal de la Landing Page
export default function LandingPage() {
    
    // NO HAY LÓGICA DE VERIFICACIÓN DE API AQUÍ. Es una página estática/pública.
    
    return (
        <>
            <Header />

            <main className="app-container">
                
                {/* SECCIÓN 1: HERO y ZONA DE ACCIÓN (Dropzone Mockup) */}
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
                        
                         <Link href="/registro" legacyBehavior>
                            <a className="btn btn-primary btn-large" style={{ marginTop: '20px' }}>
                                Comenzar a Optimizar Gratis
                            </a>
                        </Link>

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

                {/* SECCIÓN 2: INSTRUCCIONES BÁSICAS */}
                <section className="section-box section-instructions">
                    <h2 className="section-title">¿Cómo funciona OptiCommerce?</h2>
                    <div className="steps-grid">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <p><strong>Regístrate y Obtén Créditos.</strong> Accede a tu cuenta y recibe 100 créditos de optimización gratis.</p>
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
                            <p><strong>Descarga Instantánea.</strong> Utiliza inmediatamente la imagen optimizada en tu tienda en línea.</p>
                        </div>
                    </div>
                </section>


                {/* SECCIÓN 3: VENTAJAS Y CONFIANZA */}
                <section className="section-box section-features">
                    <h2 className="section-title">¿Por qué OptiCommerce es la mejor opción?</h2>
                    <div className="features-grid">
                        <FeatureCard
                            icon={Shield}
                            title="Seguridad de Datos"
                            description="Tus datos y archivos están protegidos con encriptación HTTPS. Total tranquilidad para tu negocio."
                            color="#008080"
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Rendimiento Web Superior"
                            description="Aumenta tu puntuación de PageSpeed y reduce tu tasa de rebote gracias a la velocidad de carga."
                            color="#FF7F50"
                        />
                        <FeatureCard
                            icon={Leaf}
                            title="Conciencia Ecológica"
                            description="Archivos más pequeños significan menos consumo de energía en transferencia de datos. Optimización sostenible."
                            color="#40B5AD"
                        />
                        <FeatureCard
                            icon={DollarSign}
                            title="Ahorro en Hosting"
                            description="Menos ancho de banda utilizado por tus visitantes se traduce en menores costos mensuales de alojamiento."
                            color="#607D8B"
                        />
                    </div>
                </section>
                
            </main>

            {/* FOOTER EXTENDIDO DE CUMPLIMIENTO */}
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
                            <Link href="/" legacyBehavior><a className='footer-link'>Optimización de Imágenes</a></Link>
                            <a className='footer-link' style={{ color: 'var(--text-color-secondary)' }}>(Espacio para futuro servicio 2)</a>
                            <a className='footer-link' style={{ color: 'var(--text-color-secondary)' }}>(Espacio para futuro servicio 3)</a>
                        </div>

                        <div className="footer-section">
                            <h4>Información Legal</h4>
                            <Link href="/terminos" legacyBehavior><a className='footer-link'>Términos y Condiciones</a></Link>
                            <Link href="/privacidad" legacyBehavior><a className='footer-link'>Política de Privacidad</a></Link>
                            <Link href="/reembolso" legacyBehavior><a className='footer-link'>Política de Reembolso</a></Link>
                            <a className='footer-link'>Política de Cookies</a>
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
        </>
    );
}
