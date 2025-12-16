// src/app/contact/page.js - Página server, importa el formulario client

import Link from 'next/link';
import { Sun, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <>
      <header className="header-main">
        <div className="app-container flex items-center justify-between py-6">
          <div className="logo">
            <Link href="/" className="flex items-center gap-4">
              <Sun size={36} className="text-[var(--primary-color)]" />
              <span className="logo-text text-4xl">OptiCommerce</span>
            </Link>
          </div>

          <Link href="/" className="flex items-center gap-2 text-[var(--text-color-primary)] font-medium hover:text-[var(--accent-color)] transition">
            <ArrowLeft size={20} />
            Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="app-container max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              Ponte en Contacto
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-color-secondary)] max-w-3xl mx-auto">
              Estamos listos para resolver tus dudas sobre optimización, planes Enterprise o integraciones personalizadas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Formulario client */}
            <ContactForm />

            {/* Información de contacto */}
            <div className="space-y-12">
              <div className="bg-[var(--bg-card)] rounded-3xl shadow-xl p-10 md:p-12 border border-[var(--border-color)]">
                <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-10">
                  Información de Soporte
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <Mail size={28} className="text-[var(--accent-color)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Correo Electrónico Principal</p>
                      <a href="mailto:jj.guerrerovz@gmail.com" className="text-xl text-[var(--accent-color)] hover:underline">
                        jj.guerrerovz@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <Phone size={28} className="text-[var(--accent-color)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Teléfono (Soporte Técnico)</p>
                      <p className="text-xl">+57 316 422 7055</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <MapPin size={28} className="text-[var(--accent-color)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Oficinas</p>
                      <p className="text-xl">Cali, Valle del Cauca, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-3xl p-10 text-white text-center">
                <h3 className="text-3xl font-bold mb-4">¿Consulta Enterprise?</h3>
                <p className="text-xl mb-8 opacity-90">Planes personalizados, integraciones dedicadas y soporte prioritario.</p>
                <a href="mailto:jj.guerrerovz@gmail.com" className="inline-flex items-center gap-3 bg-white text-[var(--primary-color)] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition">
                  Agenda una Llamada
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

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