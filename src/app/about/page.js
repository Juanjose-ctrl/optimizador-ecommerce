'use client';
import Link from 'next/link';
import { Sun, Target, Zap, TrendingUp, Code } from 'lucide-react'; 
import Image from 'next/image';

// Componentes replicados (Header y Footer)
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
                <Link href="/" className="btn btn-secondary">
                    Volver a Inicio
                </Link>
            </nav>
        </header>
    </div>
);

const Footer = () => (
    <footer className="footer-main">
        <div className="app-container footer-content">
            <div className="footer-links">
                <Link href="/privacidad">Política de Privacidad</Link>
                <Link href="/terminos">Términos de Servicio</Link>
                <Link href="/contacto">Contacto</Link>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.</p>
        </div>
    </footer>
);

// Componente de Misión/Visión
const PhilosophyCard = ({ icon: Icon, title, content }) => (
    <div className="philosophy-card">
        <Icon size={40} color="var(--accent-color)" style={{ marginBottom: '15px' }} />
        <h3 className="card-title">{title}</h3>
        <p className="card-content">{content}</p>
    </div>
);

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0' }}>
                
                <h1 className="main-pricing-title title-about">Sobre OptiCommerce</h1>
                <p className="main-pricing-subtitle subtitle-about">Nuestra misión es potenciar tu negocio con imágenes más rápidas y de mayor calidad.</p>

                {/* SECCIÓN 1: Misión y Visión */}
                <section className="section-philosophy">
                    <h2 className="section-title title-centered">Nuestra Filosofía</h2>
                    <div className="philosophy-grid">
                        <PhilosophyCard 
                            icon={Target} 
                            title="Misión" 
                            content="Ofrecer la herramienta de optimización de imágenes más eficiente y rentable del mercado para el e-commerce hispano." 
                        />
                        <PhilosophyCard 
                            icon={TrendingUp} 
                            title="Visión" 
                            content="Convertirnos en el estándar para la mejora del rendimiento web, expandiendo nuestros servicios a compresión de video y más." 
                        />
                        <PhilosophyCard 
                            icon={Zap} 
                            title="Velocidad" 
                            content="Creemos que cada milisegundo cuenta. Nuestra tecnología de optimización está diseñada para la máxima rapidez." 
                        />
                    </div>
                </section>

                {/* SECCIÓN 2: El Fundador */}
                <section className="section-founder">
                    <h2 className="section-title title-centered">Conoce al Fundador</h2>
                    <div className="founder-bio">
                        {/* Podrías reemplazar este div con una etiqueta <img> si tienes una foto */}
                        <div className="founder-image-placeholder">
    <Image
        // 🚨 2. RUTA ABSOLUTA: /images/ es relativo a la carpeta /public
        src="/images/juan-jose.jpg" 
        alt="Foto del fundador, Juan José Guerrero Vásquez"
        width={300}    // Debe coincidir con el ancho del CSS
        height={300}   // Debe coincidir con el alto del CSS
        className="founder-image" // Para aplicar tus estilos (ej: border-radius: 50%)
    />
                        </div>
                        <div className="founder-text">
                            <h3>Juan José Guerrero Vásquez</h3>
                            <p>
                                Como desarrollador principal, Juan José Guerrero creó OptiCommerce con una visión simple: hacer que los sitios web fueran más rápidos. Entendiendo los desafíos de las tiendas en línea con imágenes pesadas, dedicó su experiencia en optimización de backend para construir una solución que fuera potente, fácil de usar y accesible para todos.
                            </p>
                            <Link href="/contacto" className="btn btn-primary">
                                Contacta a Juan José
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}