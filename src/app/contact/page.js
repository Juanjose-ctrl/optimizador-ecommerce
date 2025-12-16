// src/app/contact/page.js - COMPLETO Y CORREGIDO

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sun, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

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
      .send(
        'service_kinzdb4',
        'template_0camczb',
        formData,
        '3vU0gA2f5031TwiDJ'
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
      {/* HEADER */}
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

      {/* CONTENIDO */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="app-container max-w-6xl mx-auto">
          {/* TÍTULOS */}
          <div className="text-center mb-20">
            <h1 className="title-contact">
              Ponte en Contacto
            </h1>
            <p className="subtitle-contact">
              Estamos listos para resolver tus dudas sobre optimización, planes Enterprise o integraciones personalizadas.
            </p>
          </div>

          {/* GRID DE CONTACTO */}
          <div className="contact-grid">
            {/* FORMULARIO */}
            <div className="contact-form">
              <h3>Envíanos un Mensaje</h3>

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

              <input
                type="text"
                name="name"
                placeholder="Tu Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Tu Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Tu Mensaje..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </div>

            {/* INFO CONTACTO */}
            <div className="contact-info">
              <h3>Información de Contacto</h3>

              <div className="contact-detail" data-icon="📧">
                <span>
                  Email: <a href="mailto:jj.guerrerovz@gmail.com">jj.guerrerovz@gmail.com</a>
                </span>
              </div>

              <div className="contact-detail" data-icon="📱">
                <span>
                  Teléfono: <a href="tel:+573164227055">+57 3164227055</a>
                </span>
              </div>

              <div className="contact-detail" data-icon="📍">
                <span>Ubicación: Cali, Colombia</span>
              </div>

              <div className="contact-detail" data-icon="🌐">
                <span>
                  Web: <a href="https://optimizador-ecommerce.vercel.app/" target="_blank" rel="noopener noreferrer">www.opticommerce.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] py-12">
        <div className="app-container text-center">
          <p className="text-[var(--text-color-secondary)] text-lg">
            © 2024 OptiCommerce. Optimiza tu eCommerce con IA.
          </p>
        </div>
      </footer>
    </>
  );
}