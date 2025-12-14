'use client';
import Link from 'next/link';
// Importamos los íconos necesarios
import { 
    Check, Zap, DollarSign, XCircle, Sun, 
    Package, PackageCheck, Rocket, Landmark, CheckCircle 
} from 'lucide-react'; 

// =================================================================
// 🚨 Mapeo de iconos para planes (Ajustado para 4 planes)
// =================================================================
const PLAN_ICONS = {
    // Usamos '1' para el Free/Gratis (Package)
    Free: <Package size={24} style={{ marginRight: '8px' }} />,
    // Usamos '2' para el Basic (PackageCheck)
    Basic: <PackageCheck size={24} style={{ marginRight: '8px' }} />,
    // Usamos '3' para el Pro/Recomendado (Rocket)
    Pro: <Rocket size={24} style={{ marginRight: '8px' }} />,
    // Usamos '4' para el Enterprise (Landmark)
    Enterprise: <Landmark size={24} style={{ marginRight: '8px' }} />,
};

// --- COMPONENTES AUXILIARES ---

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


// Componente de la Tarjeta de Plan (Ajustado para usar los iconos y estilos del Dashboard)
const PricingCard = ({ title, price, description, features, isFeatured, buttonText, planKey }) => (
    <div className={`pricing-card ${isFeatured ? 'featured-plan' : ''}`}>
        {isFeatured && <div className="badge">Más Popular</div>}
        
        {/* Usamos el Plan Header similar al Dashboard */}
        <div className="plan-header-custom"> 
            {PLAN_ICONS[planKey]}
            <h3 className="card-title">{title}</h3>
        </div>
        
        <div className="price-tag">
            {price === 'Gratis' || price === 'Contactar' ? (
                <span className="price">{price}</span>
            ) : (
                <>
                    <span className="price">{price}</span>
                    {/* El precio ya tiene el símbolo '$' */}
                    <span className="unit">/mes</span>
                </>
            )}
        </div>
        
        <p className="description">{description}</p>
        
        <ul className="feature-list">
            {features.map((feature, index) => (
                <li key={index} className={feature.available ? 'available' : 'unavailable'}>
                    {/* Usamos el ícono CheckCircle del dashboard para las características */}
                    {feature.available ? <CheckCircle size={18} color="var(--primary-color)" /> : <XCircle size={18} color="var(--text-color-secondary)" />}
                    {feature.text}
                </li>
            ))}
        </ul>

        {/* El botón redirige a la página de registro o al contacto para Enterprise */}
        <Link 
            href={planKey === 'Enterprise' ? "mailto:contacto@opticomerce.com" : "/registro"} 
            className={`btn ${isFeatured ? 'btn-primary' : 'btn-secondary'} btn-full`}
        >
            {buttonText}
        </Link>
    </div>
);

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function PricingPage() {
    
    // Datos de los planes de precios
    const plans = [
        {
            title: "Plan Gratis",
            price: "Gratis",
            description: "Perfecto para probar nuestra API y funcionalidad.",
            features: [
                { text: "100 Créditos Iniciales", available: true },
                { text: "Optimización estándar (JPEG/PNG)", available: true },
                { text: "Acceso a la API", available: false },
                { text: "Conversión a WEBP", available: false },
                { text: "Soporte Estándar", available: true },
            ],
            isFeatured: false,
            buttonText: "Comenzar Gratis",
            planKey: 'Free' 
        },
        {
            title: "Plan Basic",
            price: "$2.99", // 🚨 Precio corregido
            description: "Para pequeños proyectos que recién comienzan y necesitan más créditos.",
            features: [
                { text: "300 Créditos/Mes", available: true },
                { text: "Optimización avanzada", available: true },
                { text: "Acceso a la API", available: true },
                { text: "Conversión a WEBP", available: true },
                { text: "Soporte Estándar", available: true },
            ],
            isFeatured: false,
            buttonText: "Suscribirse Ahora",
            planKey: 'Basic'
        },
        {
            title: "Plan Pro (Recomendado)",
            price: "$12.99", // 🚨 Precio corregido
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
            planKey: 'Pro' 
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
            planKey: 'Enterprise' 
        },
    ];

    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0' }}>
                
                {/* TÍTULO Y SUBTÍTULO SOLICITADOS */}
                <h1 className="main-pricing-title">Nuestros Planes de Crédito</h1>
                <p className="main-pricing-subtitle">Paga solo por lo que optimizas o suscríbete para ahorrar.</p>

                <section className="section-pricing" style={{ marginTop: '50px' }}>
                    <div className="pricing-grid">
                        {plans.map((plan, index) => (
                            <PricingCard key={index} {...plan} />
                        ))}
                    </div>
                </section>
                
                {/* SECCIÓN "¿QUÉ ES UN CRÉDITO?" SOLICITADA */}
                <section className="section-faq" style={{ marginTop: '50px', textAlign: 'center' }}>
                    <h2 className="section-title">
                        <DollarSign size={24} style={{ marginRight: '8px' }} color="var(--accent-color)" />
                        ¿Qué es un Crédito?
                    </h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-color-secondary)' }}>
                        Un crédito equivale a una imagen optimizada. No importa el tamaño original del archivo (hasta 10MB), solo cobramos un crédito por cada imagen que procesas y descargas. Los créditos se renuevan mensualmente con la suscripción Pro.
                    </p>
                </section>

            </main>
            <Footer />
        </>
    );
}