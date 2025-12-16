// src/app/reembolso/page.js - VERSIÓN FINAL PROFESIONAL Y ELEGANTE

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <>
      {/* HEADER MINIMALISTA Y PROFESIONAL (igual estilo que el resto del sitio) */}
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
            Política de Reembolso
          </h1>
          <p className="text-center text-[var(--text-color-secondary)] text-lg mb-16">
            Última actualización: 13 de diciembre de 2025
          </p>

          <div className="bg-[var(--bg-card)] rounded-3xl shadow-xl p-12 md:p-16 border border-[var(--border-color)]">
            <div className="prose prose-lg max-w-none text-[var(--text-color-primary)] space-y-10">
              <p className="text-xl leading-relaxed">
                En OptiCommerce, nuestro objetivo es asegurar tu completa satisfacción con nuestros servicios. Si por alguna razón no estás satisfecho con tu compra de créditos o suscripción, ofrecemos una política de reembolso sencilla y clara, en cumplimiento con los requisitos de nuestro proveedor de pagos, Paddle.
              </p>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  1. Periodo de Reembolso Garantizado
                </h2>
                <p className="text-lg leading-relaxed">
                  Tienes derecho a solicitar un reembolso completo de cualquier compra realizada en OptiCommerce dentro de los <strong>catorce (14) días</strong> siguientes a la fecha de la transacción.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  2. Condiciones del Reembolso
                </h2>
                <ul className="list-disc pl-8 space-y-4 text-lg">
                  <li>La solicitud debe ser presentada dentro del periodo de 14 días mencionado anteriormente.</li>
                  <li>No aplicamos calificadores, excepciones ni condiciones. Nuestro compromiso es un reembolso total y sin preguntas dentro de la ventana de 14 días.</li>
                  <li>El reembolso aplicará al costo total de la compra (suscripción o paquete de créditos) por la cual se presenta la solicitud.</li>
                  <li>Las solicitudes de reembolso deben enviarse a nuestro equipo de soporte a través del correo <a href="mailto:jj.guerrerovz@gmail.com" className="text-[var(--accent-color)] font-semibold hover:underline">jj.guerrerovz@gmail.com</a> o mediante nuestro <Link href="/contact" className="text-[var(--accent-color)] font-semibold hover:underline">portal de contacto</Link>.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-5 mt-12">
                  3. Procesamiento del Reembolso
                </h2>
                <p className="text-lg leading-relaxed">
                  Una vez aprobada la solicitud de reembolso, el proceso se iniciará inmediatamente. El dinero será devuelto a la fuente de pago original. Por favor, ten en cuenta que el tiempo que tarda el reembolso en reflejarse en tu cuenta puede variar (típicamente entre 5 a 10 días hábiles) y depende de tu banco o institución financiera.
                </p>
              </section>

              <p className="text-xl leading-relaxed text-center mt-16 pt-10 border-t border-[var(--border-color)]">
                Para cualquier pregunta o aclaración sobre nuestra política de reembolso, no dudes en <Link href="/contact" className="text-[var(--accent-color)] font-bold hover:underline">contactarnos</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER MINIMALISTA (sin repetir todo el footer grande) */}
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