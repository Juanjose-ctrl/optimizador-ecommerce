// src/app/faq/page.js - MODERNIZADA CON NUEVO CSS

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sun, ArrowLeft, HelpCircle } from 'lucide-react';
import { Header, Footer } from '../components/SharedComponents';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Optimización de Imágenes',
      icon: '🖼️',
      questions: [
        { q: "¿Qué formatos de imagen soporta OptiCommerce?", a: "Soportamos los formatos más comunes, incluyendo JPEG, PNG y WebP. Nuestro sistema automáticamente elige el mejor método de compresión para cada uno." },
        { q: "¿La optimización afecta la calidad visual de mis imágenes?", a: "No. Utilizamos algoritmos de compresión sin pérdidas (lossless) y con pérdidas inteligentes (lossy) para reducir el peso del archivo con un impacto visual casi nulo." },
        { q: "¿Puedo subir imágenes de gran tamaño?", a: "Sí, el límite actual por imagen es de 10MB, suficiente para la mayoría de las imágenes de alta resolución." },
      ]
    },
    {
      category: 'Planes y Créditos',
      icon: '💰',
      questions: [
        { q: "¿Cómo se define un 'crédito'?", a: "Un crédito equivale a una imagen optimizada. Si subes 10 imágenes, consumes 10 créditos, independientemente del formato o el ahorro de tamaño." },
        { q: "¿Qué pasa si me quedo sin créditos?", a: "Tu cuenta seguirá activa, pero la optimización se detendrá. Puedes comprar un plan superior o esperar al siguiente ciclo de renovación mensual." },
        { q: "¿Tienen un plan de pago único?", a: "Actualmente, ofrecemos suscripciones mensuales para garantizar el acceso continuo a nuestra API y actualizaciones. Consulta nuestros planes en la sección de Precios." },
      ]
    },
    {
      category: 'Integración y API',
      icon: '⚡',
      questions: [
        { q: "¿Necesito conocimientos de código para usar la API?", a: "Para usar la API, sí. Sin embargo, nuestra interfaz web de arrastrar y soltar (drag & drop) te permite optimizar sin necesidad de codificar. La API está reservada para integraciones avanzadas." },
        { q: "¿Qué tan rápido es el tiempo de respuesta de la API?", a: "Nuestra infraestructura está optimizada para el e-commerce, con tiempos de respuesta muy bajos, típicamente procesando imágenes en menos de 500ms." },
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

   return (
    <>
      {/* REEMPLAZA TODO EL <header> POR ESTO: */}
      <Header />

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="app-container max-w-5xl mx-auto">
          {/* TÍTULOS */}
          <div className="text-center mb-20">
            <h1 className="title-faq">
              Preguntas Frecuentes
            </h1>
            <p className="subtitle-faq">
              Respuestas rápidas a las dudas más comunes sobre OptiCommerce.
            </p>
          </div>

          {/* SECCIÓN FAQ */}
          <div className="section-faq">
            <div className="faq-sections-container">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex} className="faq-section-group">
                  <h2 className="section-title-faq">
                    <span style={{ marginRight: '12px', fontSize: '2rem' }}>{section.icon}</span>
                    {section.category}
                  </h2>

                  <div>
                    {section.questions.map((item, itemIndex) => {
                      const combinedIndex = `${sectionIndex}-${itemIndex}`;
                      const isOpen = openIndex === combinedIndex;

                      return (
                        <div 
                          key={combinedIndex} 
                          className={`accordion-item ${isOpen ? 'active' : ''}`}
                        >
                          <button 
                            className="accordion-button"
                            onClick={() => toggleAccordion(combinedIndex)}
                          >
                            <span>{item.q}</span>
                            <div className={`accordion-icon ${isOpen ? 'open' : ''}`}>
                              ▼
                            </div>
                          </button>

                          <div className="accordion-content">
                            <p>{item.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA FINAL */}
            <div className="faq-cta-bottom">
              <HelpCircle size={60} style={{ margin: '0 auto 20px', display: 'block' }} />
              <h3>¿No encuentras tu respuesta?</h3>
              <p>¡Estamos para ayudarte!</p>
              <Link href="/contact">
                <button>Contáctanos</button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}