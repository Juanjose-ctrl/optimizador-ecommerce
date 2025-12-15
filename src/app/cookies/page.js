// src/app/cookies/page.js

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

export default function CookiesPolicyPage() {
    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0', maxWidth: '850px', margin: '0 auto' }}>
                
                <h1 className="section-title" style={{ textAlign: 'center' }}>Política de Cookies</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)', marginBottom: '40px', fontSize: '0.9rem' }}>Última actualización: Diciembre 2025</p>

                <div className="policy-content">
                    
                    <p>
                        Esta Política de Cookies explica qué son las cookies y cómo las utilizamos en OptiCommerce. Le recomendamos leer esta política para entender qué tipo de información recopilamos usando cookies y cómo se utiliza esa información.
                    </p>

                    <h2>1. ¿Qué son las Cookies?</h2>
                    <p>
                        Las cookies son pequeños archivos de texto que se almacenan en su navegador web por los sitios web que visita. Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
                    </p>
                    
                    <h2>2. Tipos de Cookies que Utilizamos</h2>
                    
                    <h3>Cookies Esenciales (Necesarias)</h3>
                    <p>
                        Estas cookies son estrictamente necesarias para proporcionarle los servicios disponibles a través de nuestra Plataforma y para utilizar algunas de sus características, como el acceso a áreas seguras, la gestión de la sesión de usuario y la autenticación. Sin estas cookies, el Servicio no podría operar correctamente.
                    </p>

                    <h3>Cookies de Rendimiento y Análisis</h3>
                    <p>
                        Estas cookies se utilizan para mejorar el rendimiento de nuestro Servicio, por ejemplo, recopilando información sobre cómo los visitantes utilizan la plataforma, qué páginas visitan con más frecuencia, y si reciben mensajes de error.
                    </p>
                    <ul>
                        <li>**Ejemplo:** Podemos utilizar herramientas como Google Analytics para ayudarnos a medir el tráfico y las tendencias de uso del Servicio.</li>
                    </ul>

                    <h3>Cookies de Preferencia (Funcionalidad)</h3>
                    <p>
                        Estas cookies permiten que nuestro Servicio recuerde las elecciones que usted realiza al usarlo, como recordar sus preferencias de idioma o los detalles de inicio de sesión para una próxima visita.
                    </p>

                    <h2>3. Sus Opciones de Cookies</h2>
                    <p>
                        Usted tiene la opción de aceptar o rechazar el uso de cookies no esenciales. La mayoría de los navegadores web aceptan cookies automáticamente, pero usted puede modificar la configuración de su navegador para rechazarlas si lo prefiere. Sin embargo, si elige rechazar las cookies, es posible que no pueda experimentar completamente las características interactivas del Servicio.
                    </p>
                    
                    <p style={{ marginTop: '30px' }}>
                        Para más información sobre el tratamiento de sus datos, consulte nuestra <Link href="/privacidad">Política de Privacidad</Link>.
                    </p>
                    
                </div>
            </main>
            <Footer />
        </>
    );
}