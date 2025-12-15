// src/app/terminos/page.js

'use client';
import Link from 'next/link';
import { Sun } from 'lucide-react';

// Componente Header (se mantiene el mismo)
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

// Agregamos el Footer
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

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0', maxWidth: '850px', margin: '0 auto' }}>
                
                <h1 className="section-title" style={{ textAlign: 'center' }}>Términos y Condiciones</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)', marginBottom: '40px', fontSize: '0.9rem' }}>Última actualización: Diciembre 2025</p>

                <div className="policy-content">
                    
                    <h2>1. Acuerdo Vinculante y Definiciones</h2>
                    <p>
                        OptiCommerce es un servicio propiedad y operado por **OptiCommerce S.A.S.** . Al acceder o utilizar la plataforma OptiCommerce, usted (el "Usuario") acepta estos Términos, que constituyen un acuerdo legal vinculante.
                    </p>
                    
                    <h2>2. Descripción del Servicio</h2>
                    <p>
                        OptiCommerce proporciona una interfaz de programación de aplicaciones (API) y una herramienta web para optimizar y reducir el tamaño de imágenes digitales, principalmente para uso en plataformas de comercio electrónico, mediante el uso de créditos.
                    </p>

                    <h2>3. Cuentas de Usuario y Uso de Créditos</h2>
                    <ul>
                        <li>**Registro:** Debe ser mayor de edad para crear una cuenta. La información proporcionada debe ser veraz y precisa.</li>
                        <li>**Créditos:** Los servicios se cobran por crédito. Un crédito equivale a una optimización de imagen exitosa. Los créditos no utilizados pueden caducar si no están asociados a un plan de suscripción activo.</li>
                    </ul>

                    <h2>4. Propiedad Intelectual y Contenido del Usuario</h2>
                    <p>
                        El Usuario retiene todos los derechos sobre las imágenes subidas al Servicio. Al subir contenido, el Usuario otorga a la Compañía una licencia limitada para procesar, optimizar y almacenar temporalmente dicho contenido según sea necesario para proporcionar el Servicio. La Compañía no reclama derechos de propiedad sobre su contenido.
                    </p>
                    
                    <h2>5. Limitación de Responsabilidad</h2>
                    <p>
                        La Compañía no se hace responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles.
                    </p>
                    
                    <h2>6. Modificaciones de los Términos</h2>
                    <p>
                        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Se le notificará de cualquier cambio publicando los nuevos Términos en esta página. Su uso continuado del Servicio después de dichas modificaciones constituye su aceptación de los nuevos Términos.
                    </p>
                    
                    <p style={{ marginTop: '30px' }}>
                        Si tiene preguntas sobre estos Términos, por favor <Link href="/contacto">contáctenos</Link>.
                    </p>
                </div>

            </main>
            <Footer />
        </>
    );
}