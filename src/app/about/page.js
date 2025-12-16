// src/app/about/page.js - VERSIÓN FINAL PROFESIONAL Y ELEGANTE

'use client';
import Link from 'next/link';
import { Sun, Target, Zap, TrendingUp, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      {/* HEADER MINIMALISTA Y PROFESIONAL */}
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
          {/* Título principal */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              Sobre OptiCommerce
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-color-secondary)] max-w-4xl mx-auto">
              Nuestra misión es potenciar tu negocio con imágenes más rápidas y de mayor calidad.
            </p>
          </div>

          {/* SECCIÓN 1: Filosofía (Misión, Visión, Valores) */}
          <section className="mb-32">
            <h2 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
              Nuestra Filosofía
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center bg-[var(--bg-card)] rounded-3xl p-10 shadow-xl border border-[var(--border-color)] transition-all hover:shadow-2xl hover:-translate-y-4">
                <Target size={60} className="text-[var(--accent-color)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-4">Misión</h3>
                <p className="text-lg text-[var(--text-color-primary)] leading-relaxed">
                  Ofrecer la herramienta de optimización de imágenes más eficiente y rentable del mercado para el e-commerce hispano.
                </p>
              </div>

              <div className="text-center bg-[var(--bg-card)] rounded-3xl p-10 shadow-xl border border-[var(--border-color)] transition-all hover:shadow-2xl hover:-translate-y-4">
                <TrendingUp size={60} className="text-[var(--accent-color)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-4">Visión</h3>
                <p className="text-lg text-[var(--text-color-primary)] leading-relaxed">
                  Convertirnos en el estándar para la mejora del rendimiento web, expandiendo nuestros servicios a compresión de video y más.
                </p>
              </div>

              <div className="text-center bg-[var(--bg-card)] rounded-3xl p-10 shadow-xl border border-[var(--border-color)] transition-all hover:shadow-2xl hover:-translate-y-4">
                <Zap size={60} className="text-[var(--accent-color)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-4">Velocidad</h3>
                <p className="text-lg text-[var(--text-color-primary)] leading-relaxed">
                  Creemos que cada milisegundo cuenta. Nuestra tecnología de optimización está diseñada para la máxima rapidez.
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: El Fundador - Foto bonita y texto profesional */}
          <section className="mb-32">
            <h2 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
              Conoce al Fundador
            </h2>
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              {/* Foto del fundador - redonda, con sombra y hover elegante */}
              <div className="relative group">
                <div className="rounded-full overflow-hidden shadow-2xl border-8 border-[var(--bg-card)] mx-auto w-80 h-80 md:w-96 md:h-96">
                  <Image
                    src="/images/juan-jose.jpg"
                    alt="Juan José Guerrero Vásquez - Fundador de OptiCommerce"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--primary-color)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Texto del fundador */}
              <div className="space-y-8">
                <h3 className="text-4xl font-bold text-[var(--primary-color)]">Juan José Guerrero Vásquez</h3>
                <p className="text-xl leading-relaxed text-[var(--text-color-primary)]">
                  Como desarrollador principal, Juan José Guerrero creó OptiCommerce con una visión simple: hacer que los sitios web fueran más rápidos. Entendiendo los desafíos de las tiendas en línea con imágenes pesadas, dedicó su experiencia en optimización de backend para construir una solución que fuera potente, fácil de usar y accesible para todos.
                </p>
                <div>
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