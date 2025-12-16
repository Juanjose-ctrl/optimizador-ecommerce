// src/app/contact/page.js - FORMULARIO CON ENVÍO REAL POR EMAIL

'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Sun, ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const revalidate = 0; //cambio
export default function ContactPage() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    emailjs
      .sendForm(
        'service_kinzdb4',         // ← Reemplaza con tu Service ID
        'template_0camczb',        // ← Reemplaza con tu Template ID
        formRef.current,
        '3vU0gA2f5031TwiDJ'          // ← Reemplaza con tu Public Key
      )
      .then(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
            {/* FORMULARIO */}
            <div className="bg-[var(--bg-card)] rounded-3xl shadow-xl p-10 md:p-12 border border-[var(--border-color)]">
              <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-8">
                Envíanos un Mensaje
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-4 text-green-800">
                  <CheckCircle size={28} />
                  <p className="font-semibold">¡Mensaje enviado! Te responderemos en menos de 24 horas.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800">
                  Error al enviar. Intenta de nuevo o escribe directamente a jj.guerrerovz@gmail.com
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-xl border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:outline-none transition text-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-xl border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:outline-none transition text-lg"
                />
                <textarea
                  name="message"
                  placeholder="Tu Mensaje..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-xl border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:outline-none transition text-lg resize-none"
                ></textarea>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn btn-primary text-xl py-5 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      <Send size={24} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* INFO CONTACTO */}
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