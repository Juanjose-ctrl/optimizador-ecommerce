// src/app/about/page.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '../components/SharedComponents'; 

export default function AboutPage() {
  return (
    <>
      <Header /> 

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          
          {/* TÍTULOS */}
          <div className="text-center mb-20">
            <h1 className="title-about">Sobre OptiCommerce</h1>
            <p className="subtitle-about">
              Nuestra misión es potenciar tu negocio con imágenes más rápidas y de mayor calidad.
            </p>
          </div>

          {/* SECCIÓN FILOSOFÍA */}
          <section style={{ marginBottom: '100px' }}>
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
          <section style={{ marginTop: '100px' }}>
            <h2 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
              Conoce al Fundador
            </h2>
            <div className="founder-bio">
              <div className="founder-image-placeholder">
                <Image
                  src="/images/juan-jose.jpg"
                  alt="Juan José Guerrero Vásquez - Fundador de OptiCommerce"
                  width={400}
                  height={400}
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

      <Footer /> 
    </>
  );
}