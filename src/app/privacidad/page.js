// src/app/privacidad/page.js - VERSIÓN FINAL PROFESIONAL Y ELEGANTE

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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

      {/* CONTENIDO PRINCIPAL - Limpio, centrado y profesional */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="app-container max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-center mb-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          <p className="text-center text-[var(--text-color-secondary)] text-lg mb-16">
            Última actualización: Diciembre 2025
          </p>

          <div className="bg-[var(--bg-card)] rounded-3xl shadow-xl p-12 md:p-16 border border-[var(--border-color)]">
            <div className="prose prose-lg max-w-none text-[var(--text-color-primary)] space-y-10">
              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  1. Recopilación de Información
                </h2>
                <p className="text-lg leading-relaxed">
                  Recopilamos varios tipos de información para proporcionar y mejorar nuestro Servicio:
                </p>
                <ul className="list-disc pl-8 space-y-4 text-lg">
                  <li>Datos Personales: Incluye su dirección de correo electrónico, nombre y detalles de pago (procesados por Paddle, no almacenados directamente por nosotros).</li>
                  <li>Datos de Uso: Información sobre cómo se accede y utiliza el Servicio (por ejemplo, el tipo de imágenes subidas, la tasa de optimización, el uso de la API).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  2. Uso de Datos
                </h2>
                <p className="text-lg leading-relaxed">
                  Los datos recopilados se utilizan para:
                </p>
                <ul className="list-disc pl-8 space-y-4 text-lg">
                  <li>Proporcionar y mantener el Servicio.</li>
                  <li>Gestionar su cuenta y el acceso a los créditos.</li>
                  <li>Procesar pagos a través de nuestro socio (<a href="https://paddle.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] font-semibold hover:underline">Paddle</a>).</li>
                  <li>Mejorar la calidad del motor de optimización.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  3. Divulgación de Datos
                </h2>
                <p className="text-lg leading-relaxed">
                  No vendemos ni alquilamos sus Datos Personales. Podemos compartir su información solo en las siguientes situaciones:
                </p>
                <ul className="list-disc pl-8 space-y-4 text-lg">
                  <li>Proveedores de Servicios (Paddle): Compartimos información con Paddle para facilitar las transacciones de pago.</li>
                  <li>Requisitos Legales: Si lo exige la ley o una orden judicial.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  4. Seguridad de los Datos e Imágenes
                </h2>
                <p className="text-lg leading-relaxed">
                  La seguridad de sus datos es importante para nosotros. Las imágenes subidas se eliminan de nuestros servidores después de un breve periodo de tiempo (generalmente 24 horas) para garantizar la privacidad y reducir el almacenamiento.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  5. Sus Derechos de Privacidad
                </h2>
                <p className="text-lg leading-relaxed">
                  Usted tiene el derecho de acceder, actualizar o solicitar la eliminación de su información personal. Por favor, <Link href="/contact" className="text-[var(--accent-color)] font-bold hover:underline">contáctenos</Link> para ejercer estos derechos.
                </p>
              </section>

              <p className="text-xl leading-relaxed text-center mt-16 pt-10 border-t border-[var(--border-color)]">
                Si tiene preguntas sobre esta Política de Privacidad, no dude en <Link href="/contact" className="text-[var(--accent-color)] font-bold hover:underline">contactarnos</Link>.
              </p>
            </div>
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