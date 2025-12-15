'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sun, HelpCircle, ChevronDown, Image, DollarSign, Zap } from 'lucide-react'; 

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

// Componente reusable de Acordeón para FAQ
const AccordionItem = ({ question, answer, isOpen, onClick }) => (
    <div className="accordion-item">
        <button className="accordion-button" onClick={onClick}>
            {question}
            <ChevronDown size={20} className={`accordion-icon ${isOpen ? 'open' : ''}`} />
        </button>
        {isOpen && (
            <div className="accordion-content">
                <p>{answer}</p>
            </div>
        )}
    </div>
);


export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: 'Optimización de Imágenes',
            icon: Image,
            questions: [
                { q: "¿Qué formatos de imagen soporta OptiCommerce?", a: "Soportamos los formatos más comunes, incluyendo JPEG, PNG y WebP. Nuestro sistema automáticamente elige el mejor método de compresión para cada uno." },
                { q: "¿La optimización afecta la calidad visual de mis imágenes?", a: "No. Utilizamos algoritmos de compresión sin pérdidas (lossless) y con pérdidas inteligentes (lossy) para reducir el peso del archivo con un impacto visual casi nulo." },
                { q: "¿Puedo subir imágenes de gran tamaño?", a: "Sí, el límite actual por imagen es de 10MB, suficiente para la mayoría de las imágenes de alta resolución." },
            ]
        },
        {
            category: 'Planes y Créditos',
            icon: DollarSign,
            questions: [
                { q: "¿Cómo se define un 'crédito'?", a: "Un crédito equivale a una imagen optimizada. Si subes 10 imágenes, consumes 10 créditos, independientemente del formato o el ahorro de tamaño." },
                { q: "¿Qué pasa si me quedo sin créditos?", a: "Tu cuenta seguirá activa, pero la optimización se detendrá. Puedes comprar un plan superior o esperar al siguiente ciclo de renovación mensual." },
                { q: "¿Tienen un plan de pago único?", a: "Actualmente, ofrecemos suscripciones mensuales para garantizar el acceso continuo a nuestra API y actualizaciones. Consulta nuestros planes en la sección de Precios." },
            ]
        },
        {
            category: 'Integración y API',
            icon: Zap,
            questions: [
                { q: "¿Necesito conocimientos de código para usar la API?", a: "Para usar la API, sí. Sin embargo, nuestra interfaz web de arrastrar y soltar (drag & drop) te permite optimizar sin necesidad de codificar. La API está reservada para integraciones avanzadas." },
                { q: "¿Qué tan rápido es el tiempo de respuesta de la API?", a: "Nuestra infraestructura está optimizada para el e-commerce, con tiempos de respuesta muy bajos, típicamente procesando imágenes en menos de 500ms." },
            ]
        }
    ];

    return (
        <>
            <Header />
            <main className="app-container" style={{ padding: '80px 0' }}>
                
                <h1 className="main-pricing-title title-faq">Preguntas Frecuentes (FAQ)</h1>
                <p className="main-pricing-subtitle subtitle-faq">Respuestas rápidas a las dudas más comunes sobre OptiCommerce.</p>

                <section className="faq-sections-container">
                    {faqs.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="faq-section-group">
                            <h2 className="section-title-faq">
                                <section.icon size={24} color="var(--primary-color)" style={{ marginRight: '8px' }} />
                                {section.category}
                            </h2>
                            <div className="accordion-wrapper">
                                {section.questions.map((item, itemIndex) => {
                                    const combinedIndex = `${sectionIndex}-${itemIndex}`; // Clave única
                                    return (
                                        <AccordionItem
                                            key={combinedIndex}
                                            question={item.q}
                                            answer={item.a}
                                            isOpen={openIndex === combinedIndex}
                                            onClick={() => setOpenIndex(openIndex === combinedIndex ? null : combinedIndex)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>
                
                <div className="faq-cta-bottom">
                    <p>¿No encuentras tu respuesta? ¡Estamos para ayudarte!</p>
                    <Link href="/contact" className="btn btn-primary">
                        Contáctanos
                    </Link>
                </div>

            </main>
            <Footer />
        </>
    );
}