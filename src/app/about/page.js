// src/app/about/page.js - CORREGIDO Y USANDO LOS COMPONENTES IMPORTADOS

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
// 🚨 Mantenemos esta importación (Asegúrate que la ruta '../components/SharedComponents' sea correcta)
import { Header, Footer } from '../components/SharedComponents'; 


export default function AboutPage() {
  return (
    <>
      {/* 🚨 AQUÍ USAMOS EL HEADER IMPORTADO */}
      <Header /> 

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="max-w-6xl mx-auto px-8">
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

      {/* 🚨 AQUÍ USAMOS EL FOOTER IMPORTADO */}
      <Footer /> 
    </>
  );
}