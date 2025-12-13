// src/app/privacidad/page.js

'use client';
import Link from 'next/link';
import { Sun } from 'lucide-react';

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

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0', maxWidth: '850px' }}>
                
                <h1 className="section-title" style={{ textAlign: 'center' }}>Política de Privacidad</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)', marginBottom: '40px' }}>Última actualización: Diciembre 2025</p>

                <div className="policy-content">
                    
                    <h2>1. Recopilación de Información</h2>
                    <p>
                        Recopilamos varios tipos de información para proporcionar y mejorar nuestro Servicio:
                    </p>
                    <ul>
                        <li>**Datos Personales:** Incluye su dirección de correo electrónico, nombre y detalles de pago (procesados por Paddle, no almacenados directamente por nosotros).</li>
                        <li>**Datos de Uso:** Información sobre cómo se accede y utiliza el Servicio (por ejemplo, el tipo de imágenes subidas, la tasa de optimización, el uso de la API).</li>
                    </ul>

                    <h2>2. Uso de Datos</h2>
                    <p>
                        Los datos recopilados se utilizan para:
                    </p>
                    <ul>
                        <li>Proporcionar y mantener el Servicio.</li>
                        <li>Gestionar su cuenta y el acceso a los créditos.</li>
                        <li>Procesar pagos a través de nuestro socio (Paddle).</li>
                        <li>Mejorar la calidad del motor de optimización.</li>
                    </ul>

                    <h2>3. Divulgación de Datos</h2>
                    <p>
                        No vendemos ni alquilamos sus Datos Personales. Podemos compartir su información solo en las siguientes situaciones:
                    </p>
                    <ul>
                        <li>**Proveedores de Servicios (Paddle):** Compartimos información con Paddle para facilitar las transacciones de pago.</li>
                        <li>**Requisitos Legales:** Si lo exige la ley o una orden judicial.</li>
                    </ul>

                    <h2>4. Seguridad de los Datos</h2>
                    <p>
                        La seguridad de sus datos es importante para nosotros. Las imágenes subidas se eliminan de nuestros servidores después de un breve periodo de tiempo (generalmente 24 horas) para garantizar la privacidad y reducir el almacenamiento.
                    </p>

                    <h2>5. Sus Derechos de Privacidad</h2>
                    <p>
                        Usted tiene el derecho de acceder, actualizar o solicitar la eliminación de su información personal. Por favor, <Link href="/contacto">contáctenos</Link> para ejercer estos derechos.
                    </p>
                </div>
            </main>
        </>
    );
}