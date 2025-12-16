// src/app/about/page.js - MODERNIZADA CON NUEVO CSS

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      {/* HEADER */}
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
        <div className="app-container max-w-6xl mx-auto">
          {/* TÍTULOS */}
          <div className="text-center mb-20">
            <h1 className="title-about">
              Sobre OptiCommerce
            </h1>
            <p className="subtitle-about">
              Nuestra misión es potenciar tu negocio con imágenes más rápidas y de mayor calidad.
            </p>
          </div>

          {/* SECCIÓN FILOSOFÍA */}
          <section className="section-philosophy">
            <h2 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
              Nuestra Filosofía
            </h2>
            <div className="philosophy-grid">
              <div className="philosophy-card">
                <h3 data-icon="🎯">Misión</h3>
                <p>
                  Ofrecer la herramienta de optimización de imágenes más eficiente y rentable del mercado para el e-commerce hispano.
                </p>
              </div>

              <div className="philosophy-card">
                <h3 data-icon="📈">Visión</h3>
                <p>
                  Convertirnos en el estándar para la mejora del rendimiento web, expandiendo nuestros servicios a compresión de video y más.
                </p>
              </div>

              <div className="philosophy-card">
                <h3 data-icon="⚡">Velocidad</h3>
                <p>
                  Creemos que cada milisegundo cuenta. Nuestra tecnología de optimización está diseñada para la máxima rapidez.
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN FUNDADOR */}
          <section className="section-founder">
            <h2 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
              Conoce al Fundador
            </h2>
            <div className="founder-bio">
              <div className="founder-image-placeholder">
                <Image
                  src="/images/juan-jose.jpg"
                  alt="Juan José Guerrero Vásquez - Fundador de OptiCommerce"
                  width={350}
                  height={350}
                  className="founder-image"
                />
              </div>

              <div className="founder-text">
                <h3>Juan José Guerrero Vásquez</h3>
                <h4>Fundador & CEO</h4>
                <p>
                  Como desarrollador principal, Juan José Guerrero creó OptiCommerce con una visión simple: hacer que los sitios web fueran más rápidos. Entendiendo los desafíos de las tiendas en línea con imágenes pesadas, dedicó su experiencia en optimización de backend para construir una solución que fuera potente, fácil de usar y accesible para todos.
                </p>
                
                <div style={{ marginTop: '30px' }}>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-3 btn btn-primary text-lg px-8 py-4"
                  >
                    Contacta a Juan José
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] py-12">
        <div className="app-container text-center">
          <p className="text-[var(--text-color-secondary)]">
            © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}