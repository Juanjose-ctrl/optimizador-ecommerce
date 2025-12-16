// src/app/contact/ContactForm.jsx - Componente client con el formulario

'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
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
      .send(
        'service_kinzdb4',     // Reemplaza
        'template_0camczb',    // Reemplaza
        formData,
        '3vU0gA2f5031TwiDJ'      // Reemplaza
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

      <form onSubmit={handleSubmit} className="space-y-6">
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
  );
}