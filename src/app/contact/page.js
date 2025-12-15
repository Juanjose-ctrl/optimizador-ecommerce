'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin, Sun, Send } from 'lucide-react'; 

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
                <Link href="/contact">Contacto</Link>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.</p>
        </div>
    </footer>
);

export default function ContactPage() {
    // Nota: El formulario necesita lógica de estado y manejo de envío real,
    // pero aquí se deja solo la estructura JSX.

    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0' }}>
                
                <h1 className="main-pricing-title title-contact">Ponte en Contacto</h1>
                <p className="main-pricing-subtitle subtitle-contact">Estamos listos para resolver tus dudas sobre optimización y servicios.</p>

                <section className="contact-grid">
                    {/* Columna 1: Formulario de Contacto */}
                    <div className="contact-form-section">
                        <h2 className="section-title">Envíanos un Mensaje</h2>
                        <form className="contact-form">
                            <input type="text" placeholder="Tu Nombre" required className="input-field" />
                            <input type="email" placeholder="Tu Correo Electrónico" required className="input-field" />
                            <textarea placeholder="Tu Mensaje..." rows="5" required className="input-field textarea-field"></textarea>
                            <button type="submit" className="btn btn-primary btn-full">
                                <Send size={20} style={{ marginRight: '8px' }} /> Enviar
                            </button>
                        </form>
                    </div>

                    {/* Columna 2: Información Directa */}
                    <div className="contact-info-section">
                        <h2 className="section-title">Información de Soporte</h2>
                        <p className="contact-detail">
                            <Mail size={20} color="var(--accent-color)" /> 
                            Correo Electrónico Principal: { ' ' }
                            <a href="mailto:jj.guerrerovz@gmail.com">jj.guerrerovz@gmail.com</a>
                        </p>
                        <p className="contact-detail">
                            <Phone size={20} color="var(--accent-color)" /> 
                            Teléfono (Soporte Técnico): +57 316 422 7055
                        </p>
                        <p className="contact-detail">
                            <MapPin size={20} color="var(--accent-color)" /> 
                            Oficinas: Cali, Valle del Cauca, Colombia
                        </p>
                        
                        <div className="support-cta">
                            <p>¿Necesitas una consulta Enterprise?</p>
                            <Link href="/contact" className="btn btn-secondary">
                                Agenda una Llamada
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}