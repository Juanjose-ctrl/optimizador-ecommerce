// src/app/reembolso/page.js

'use client';
import Link from 'next/link';
import { Sun } from 'lucide-react';

const Header = () => ( 
    // Usamos el mismo Header que en la página de Precios
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

export default function RefundPolicyPage() {
    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0', maxWidth: '850px' }}>
                
                <h1 className="section-title" style={{ textAlign: 'center' }}>Política de Reembolso</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)', marginBottom: '40px' }}>Última actualización: 13 de Diciembre de 2025</p>

                <div className="policy-content">
                    <p>
                        En OptiCommerce, nuestro objetivo es asegurar tu completa satisfacción con nuestros servicios. Si por alguna razón no estás satisfecho con tu compra de créditos o suscripción, ofrecemos una política de reembolso sencilla y clara, en cumplimiento con los requisitos de nuestro proveedor de pagos, Paddle.
                    </p>

                    <h2>1. Periodo de Reembolso Garantizado</h2>
                    <p>
                        Tienes derecho a solicitar un reembolso completo de cualquier compra realizada en OptiCommerce **dentro de los catorce (14) días siguientes a la fecha de la transacción**.
                    </p>
                    
                    <h2>2. Condiciones del Reembolso (Política de Paddle)</h2>
                    <ul>
                        <li>La solicitud debe ser presentada dentro del periodo de 14 días mencionado anteriormente.</li>
                        <li>**No aplicamos calificadores, excepciones ni condiciones.** Nuestro compromiso es un reembolso total y sin preguntas dentro de la ventana de 14 días.</li>
                        <li>El reembolso aplicará al costo total de la compra (suscripción o paquete de créditos) por la cual se presenta la solicitud.</li>
                        <li>Las solicitudes de reembolso deben enviarse a nuestro equipo de soporte a través del correo [Tu Correo de Soporte] o mediante nuestro portal de ayuda.</li>
                    </ul>

                    <h2>3. Procesamiento del Reembolso</h2>
                    <p>
                        Una vez aprobada la solicitud de reembolso, el proceso se iniciará inmediatamente. El dinero será devuelto a la fuente de pago original. Por favor, ten en cuenta que el tiempo que tarda el reembolso en reflejarse en tu cuenta puede variar (típicamente entre 5 a 10 días hábiles) y depende de tu banco o institución financiera.
                    </p>
                    
                    <p>
                        Para cualquier pregunta o aclaración sobre nuestra política de reembolso, no dudes en <Link href="/contacto">contactarnos</Link>.
                    </p>
                </div>

            </main>
            {/* Omitimos el Footer aquí para mantener el foco en la política. Puedes añadirlo si quieres. */}
        </>
    );
}

// Por ejemplo, en Dashboard.js o Page.js:

<div className="dashboard-layout">
    <Header />
    
    {/* 🛑 ENVOLVER TODO EL CONTENIDO PRINCIPAL AQUÍ 🛑 */}
    <main className="main-content-wrapper">
        <FileDropzone />
        <OptimizationResults />
        <section className="section-plans">
            {/* ... Contenido de planes ... */}
        </section>
    </main>

    <Footer />
</div>