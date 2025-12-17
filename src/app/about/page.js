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
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
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
    <section style={{ marginBottom: '100px' }}>
      <h2 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
        Nuestra Filosofía
      </h2>
      <div className="philosophy-grid">
        {/* ... tus 3 cards ... */}
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