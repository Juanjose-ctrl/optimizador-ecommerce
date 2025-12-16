// src/app/terminos/page.js - VERSIÓN FINAL PROFESIONAL Y ELEGANTE

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
            Términos y Condiciones
          </h1>
          <p className="text-center text-[var(--text-color-secondary)] text-lg mb-16">
            Última actualización: Diciembre 2025
          </p>

          <div className="bg-[var(--bg-card)] rounded-3xl shadow-xl p-12 md:p-16 border border-[var(--border-color)]">
            <div className="prose prose-lg max-w-none text-[var(--text-color-primary)] space-y-10">
              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  1. Acuerdo Vinculante y Definiciones
                </h2>
                <p className="text-lg leading-relaxed">
                  OptiCommerce es un servicio propiedad y operado por OptiCommerce S.A.S. Al acceder o utilizar la plataforma OptiCommerce, usted (el "Usuario") acepta estos Términos, que constituyen un acuerdo legal vinculante.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  2. Descripción del Servicio
                </h2>
                <p className="text-lg leading-relaxed">
                  OptiCommerce proporciona una interfaz de programación de aplicaciones (API) y una herramienta web para optimizar y reducir el tamaño de imágenes digitales, principalmente para uso en plataformas de comercio electrónico, mediante el uso de créditos.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  3. Cuentas de Usuario y Uso de Créditos
                </h2>
                <ul className="list-disc pl-8 space-y-4 text-lg">
                  <li>Registro: Debe ser mayor de edad para crear una cuenta. La información proporcionada debe ser veraz y precisa.</li>
                  <li>Créditos: Los servicios se cobran por crédito. Un crédito equivale a una optimización de imagen exitosa. Los créditos no utilizados pueden caducar si no están asociados a un plan de suscripción activo.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  4. Propiedad Intelectual y Contenido del Usuario
                </h2>
                <p className="text-lg leading-relaxed">
                  El Usuario retiene todos los derechos sobre las imágenes subidas al Servicio. Al subir contenido, el Usuario otorga a la Compañía una licencia limitada para procesar, optimizar y almacenar temporalmente dicho contenido según sea necesario para proporcionar el Servicio. La Compañía no reclama derechos de propiedad sobre su contenido.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  5. Limitación de Responsabilidad
                </h2>
                <p className="text-lg leading-relaxed">
                  La Compañía no se hace responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  6. Modificaciones de los Términos
                </h2>
                <p className="text-lg leading-relaxed">
                  Nos reservamos el derecho de modificar estos Términos en cualquier momento. Se le notificará de cualquier cambio publicando los nuevos Términos en esta página. Su uso continuado del Servicio después de dichas modificaciones constituye su aceptación de los nuevos Términos.
                </p>
              </section>

              <p className="text-xl leading-relaxed text-center mt-16 pt-10 border-t border-[var(--border-color)]">
                Si tiene preguntas sobre estos Términos, por favor <Link href="/contact" className="text-[var(--accent-color)] font-bold hover:underline">contáctenos</Link>.
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