// src/app/faq/page.js - VERSIÓN FINAL PROFESIONAL Y ELEGANTE

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sun, ArrowLeft, HelpCircle, Image, DollarSign, Zap, ChevronDown } from 'lucide-react';

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
      {/* HEADER COHERENTE */}
      <header className="header-main">
        <div className="app-container flex items-center justify-between py-6">
          <div className="logo">
            <Link href="/" className="flex items-center gap-4">
              <Sun size={36} className="text-[var(--primary-color)]" />
              <span className="logo-text text-4xl">OptiCommerce</span>
            </Link>
          </div>

          <Link 
            href="/" 
            className="flex items-center gap-2 text-[var(--text-color-primary)] font-medium hover:text-[var(--accent-color)] transition"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </Link>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="app-container max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              Preguntas Frecuentes (FAQ)
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-color-secondary)] max-w-3xl mx-auto">
              Respuestas rápidas a las dudas más comunes sobre OptiCommerce.
            </p>
          </div>

          {/* SECCIONES DE FAQ CON ACORDEÓN ELEGANTE */}
          <div className="space-y-16">
            {faqs.map((section, sectionIndex) => (
              <section key={sectionIndex} className="bg-[var(--bg-card)] rounded-3xl shadow-xl p-10 md:p-12 border border-[var(--border-color)]">
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-10 flex items-center gap-4">
                  <section.icon size={36} className="text-[var(--accent-color)]" />
                  {section.category}
                </h2>

                <div className="space-y-4">
                  {section.questions.map((item, itemIndex) => {
                    const combinedIndex = `${sectionIndex}-${itemIndex}`;
                    const isOpen = openIndex === combinedIndex;

                    return (
                      <div 
                        key={combinedIndex} 
                        className="bg-[var(--bg-page)] rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
                      >
                        <button 
                          className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[var(--bg-hover)] transition"
                          onClick={() => setOpenIndex(isOpen ? null : combinedIndex)}
                        >
                          <span className="text-xl font-semibold text-[var(--text-color-primary)] pr-4">
                            {item.q}
                          </span>
                          <ChevronDown 
                            size={28} 
                            className={`text-[var(--accent-color)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>

                        {isOpen && (
                          <div className="px-8 pb-8 pt-4 border-t border-[var(--border-color)]">
                            <p className="text-lg text-[var(--text-color-primary)] leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* CTA FINAL */}
          <div className="text-center mt-20 py-16 bg-[var(--bg-card)] rounded-3xl shadow-xl border border-[var(--border-color)]">
            <HelpCircle size={60} className="text-[var(--accent-color)] mx-auto mb-6" />
            <p className="text-2xl font-bold text-[var(--text-color-primary)] mb-6">
              ¿No encuentras tu respuesta? ¡Estamos para ayudarte!
            </p>
            <Link href="/contact" className="btn btn-primary text-xl px-10 py-5">
              Contáctanos
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER MINIMALISTA */}
      <footer className="footer-main py-12 border-t border-[var(--border-color)] mt-20">
        <div className="app-container text-center">
          <p className="text-[var(--text-color-secondary)]">
            © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados. 
            Desarrollado por Juan José Guerrero.
          </p>
        </div>
      </footer>
    </>
  );
}