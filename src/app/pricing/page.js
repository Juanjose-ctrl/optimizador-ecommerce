// src/app/pricing/page.js

'use client';
import Link from 'next/link';
import { Check, Zap, DollarSign, XCircle, Sun } from 'lucide-react';

// Replicamos el Header de la Landing Page
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

// Replicamos el Footer de la Landing Page
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

// Componente de la Tarjeta de Plan
const PricingCard = ({ title, price, description, features, isFeatured, buttonText }) => (
    <div className={`pricing-card ${isFeatured ? 'featured-plan' : ''}`}>
        {isFeatured && <div className="badge">Más Popular</div>}
        
        <h3 className="card-title">{title}</h3>
        
        <div className="price-tag">
            {price === 'Gratis' ? (
                <span className="price">{price}</span>
            ) : (
                <>
                    <span className="price">{price}</span>
                    <span className="unit">USD</span>
                </>
            )}
        </div>
        
        <p className="description">{description}</p>
        
        <ul className="feature-list">
            {features.map((feature, index) => (
                <li key={index} className={feature.available ? 'available' : 'unavailable'}>
                    {feature.available ? <Check size={18} color="var(--primary-color)" /> : <XCircle size={18} color="var(--text-color-secondary)" />}
                    {feature.text}
                </li>
            ))}
        </ul>

        {/* El botón redirige a registro para iniciar el proceso de compra/suscripción */}
        <Link href="/registro" className={`btn ${isFeatured ? 'btn-primary' : 'btn-secondary'} btn-full`}>
            {buttonText}
        </Link>
    </div>
);

export default function PricingPage() {
    
    // Datos de los planes de precios
    const plans = [
        {
            title: "Plan Básico",
            price: "Gratis",
            description: "Perfecto para probar nuestra API y funcionalidad.",
            features: [
                { text: "100 Créditos Iniciales", available: true },
                { text: "Optimización estándar (JPEG/PNG)", available: true },
                { text: "Acceso a la API", available: true },
                { text: "Conversión a WEBP", available: false },
                { text: "Soporte Prioritario", available: false },
            ],
            isFeatured: false,
            buttonText: "Comenzar Gratis",
        },
        {
            title: "Plan Pro (Recomendado)",
            price: "$19",
            description: "Ideal para tiendas en crecimiento que necesitan volumen y formatos modernos.",
            features: [
                { text: "1000 Créditos/Mes", available: true },
                { text: "Optimización avanzada", available: true },
                { text: "Acceso a la API", available: true },
                { text: "Conversión a WEBP de alta eficiencia", available: true },
                { text: "Soporte Prioritario", available: true },
            ],
            isFeatured: true,
            buttonText: "Suscribirse Ahora",
        },
        {
            title: "Enterprise",
            price: "Contactar",
            description: "Solución a medida para grandes volúmenes y necesidades específicas.",
            features: [
                { text: "Créditos ilimitados", available: true },
                { text: "Optimización avanzada", available: true },
                { text: "Integración personalizada", available: true },
                { text: "Conversión a WEBP de alta eficiencia", available: true },
                { text: "Soporte 24/7 y SLA", available: true },
            ],
            isFeatured: false,
            buttonText: "Solicitar Demo",
        },
    ];

    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0' }}>
                <section className="section-pricing">
                    <h1 className="section-title">Nuestros Planes de Crédito</h1>
                    <p className="section-subtitle">Paga solo por lo que optimizas o suscríbete para ahorrar.</p>

                    <div className="pricing-grid">
                        {plans.map((plan, index) => (
                            <PricingCard key={index} {...plan} />
                        ))}
                    </div>
                </section>
                
                <section className="section-faq" style={{ marginTop: '50px', textAlign: 'center' }}>
                     <h2 className="section-title">¿Qué es un Crédito?</h2>
                     <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-color-secondary)' }}>
                        Un crédito equivale a una imagen optimizada. No importa el tamaño original del archivo (hasta 10MB), solo cobramos un crédito por cada imagen que procesas y descargas. Los créditos se renuevan mensualmente con la suscripción Pro.
                     </p>
                </section>

            </main>
            <Footer />
        </>
    );
}

// Nota: Debes añadir el CSS necesario para .section-pricing, .pricing-grid, .pricing-card, etc., en tu globals.css.