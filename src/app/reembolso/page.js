// src/app/reembolso/page.js - MODERNIZADO Y PROFESIONAL

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft, CreditCard, CheckCircle, Clock, Mail } from 'lucide-react';

export default function RefundPolicyPage() {
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

          <Link 
            href="/" 
            className="flex items-center gap-2 text-[var(--text-color-primary)] font-medium hover:text-[var(--accent-color)] transition"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </Link>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen bg-[var(--bg-page)] py-20">
        <div className="app-container max-w-5xl mx-auto">
          {/* HERO SECTION */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--accent-color)] to-[var(--primary-color)] rounded-2xl mb-6">
              <CreditCard size={40} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-color)] bg-clip-text text-transparent">
              Política de Reembolso
            </h1>
            <p className="text-xl text-[var(--text-color-secondary)] mb-4">
              Última actualización: 16 de diciembre de 2024
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full text-base font-bold text-green-600 border-2 border-green-200">
              <CheckCircle size={20} />
              Garantía de Satisfacción 100%
            </div>
          </div>

          {/* DESTACADO PRINCIPAL */}
          <div className="bg-gradient-to-br from-[var(--accent-color)] to-[var(--primary-color)] rounded-3xl shadow-2xl p-10 md:p-12 mb-12 text-white">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Garantía de 14 Días
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Tienes <strong>14 días completos</strong> desde la fecha de compra para solicitar un reembolso total. Sin preguntas, sin complicaciones, sin letra pequeña.
                </p>
              </div>
            </div>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="bg-[var(--bg-card)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border-color)]">
            <div className="p-10 md:p-16 space-y-12">
              
              {/* Introducción */}
              <section>
                <p className="text-xl leading-relaxed text-[var(--text-color-primary)]">
                  En OptiCommerce, nuestro objetivo es asegurar tu completa satisfacción con nuestros servicios. Si por alguna razón no estás satisfecho con tu compra de créditos o suscripción, ofrecemos una política de reembolso clara y transparente, en total cumplimiento con los requisitos de nuestro proveedor de pagos, <strong>Paddle</strong>.
                </p>
              </section>

              {/* Sección 1 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--accent-color)]">1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--accent-color)]">
                    Período de Reembolso Garantizado
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)] mb-6">
                    Tienes derecho a solicitar un reembolso completo de cualquier compra realizada en OptiCommerce dentro de los <strong className="text-[var(--accent-color)]">catorce (14) días calendario</strong> siguientes a la fecha de la transacción.
                  </p>
                  
                  <div className="bg-[var(--accent-color)]/5 rounded-2xl p-6 border-l-4 border-[var(--accent-color)]">
                    <div className="flex items-start gap-4">
                      <CheckCircle size={24} className="text-[var(--accent-color)] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg text-[var(--text-color-primary)] mb-2">
                          ¿Qué incluye la garantía?
                        </h3>
                        <ul className="space-y-2 text-[var(--text-color-primary)]">
                          <li className="flex items-start gap-2">
                            <span className="text-[var(--accent-color)] font-bold">✓</span>
                            <span>Planes de suscripción mensuales o anuales</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[var(--accent-color)] font-bold">✓</span>
                            <span>Paquetes de créditos individuales</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[var(--accent-color)] font-bold">✓</span>
                            <span>Upgrades de plan</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección 2 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--accent-color)]">2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--accent-color)]">
                    Condiciones del Reembolso
                  </h2>
                </div>
                <div className="pl-16 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <CheckCircle size={24} className="text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg text-[var(--text-color-primary)] mb-2">
                        Lo que SÍ aplica
                      </h3>
                      <ul className="space-y-2 text-[var(--text-color-primary)]">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Solicitud dentro de 14 días</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Reembolso 100% del monto pagado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Sin preguntas ni justificaciones</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Proceso rápido y transparente</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <h3 className="font-bold text-lg text-[var(--text-color-primary)] mb-2">
                        Importante considerar
                      </h3>
                      <ul className="space-y-2 text-[var(--text-color-primary)]">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">•</span>
                          <span>Después de 14 días no aplica reembolso</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">•</span>
                          <span>Los créditos usados no son reembolsables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">•</span>
                          <span>El acceso al servicio se suspenderá tras el reembolso</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[var(--primary-color)]/5 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-[var(--text-color-primary)] mb-4">
                      Política de Transparencia Total
                    </h3>
                    <p className="text-[var(--text-color-primary)] leading-relaxed">
                      <strong>No aplicamos calificadores, excepciones ni condiciones ocultas.</strong> Nuestro compromiso es un reembolso total y sin complicaciones dentro de la ventana de 14 días. Creemos en la satisfacción del cliente por encima de todo.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 3 - Cómo Solicitar */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--accent-color)]">3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--accent-color)]">
                    Cómo Solicitar un Reembolso
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)] mb-6">
                    Solicitar tu reembolso es simple y directo. Puedes hacerlo a través de cualquiera de estos canales:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 rounded-2xl p-6 border border-[var(--primary-color)]/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Mail size={28} className="text-[var(--primary-color)]" />
                        <h3 className="font-bold text-lg text-[var(--text-color-primary)]">
                          Por Correo Electrónico
                        </h3>
                      </div>
                      <p className="text-[var(--text-color-primary)] mb-4">
                        Escribe directamente a nuestro equipo de soporte:
                      </p>
                      <a 
                        href="mailto:jj.guerrerovz@gmail.com?subject=Solicitud de Reembolso" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl font-semibold hover:shadow-lg transition"
                      >
                        <Mail size={18} />
                        jj.guerrerovz@gmail.com
                      </a>
                    </div>

                    <div className="bg-gradient-to-br from-[var(--accent-color)]/10 to-[var(--accent-color)]/5 rounded-2xl p-6 border border-[var(--accent-color)]/20">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">💬</span>
                        <h3 className="font-bold text-lg text-[var(--text-color-primary)]">
                          Portal de Contacto
                        </h3>
                      </div>
                      <p className="text-[var(--text-color-primary)] mb-4">
                        Usa nuestro formulario de contacto para solicitudes formales:
                      </p>
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-color)] text-white rounded-xl font-semibold hover:shadow-lg transition"
                      >
                        Ir al Formulario
                        <ArrowLeft size={18} className="rotate-180" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                    <h4 className="font-bold text-[var(--text-color-primary)] mb-2 flex items-center gap-2">
                      <span className="text-xl">📝</span>
                      Información a incluir en tu solicitud
                    </h4>
                    <ul className="space-y-2 text-[var(--text-color-primary)]">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Correo electrónico asociado a tu cuenta</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Fecha de la transacción</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>ID de transacción (si lo tienes disponible)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Motivo del reembolso (opcional pero apreciado para mejorar)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Sección 4 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--accent-color)]">4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--accent-color)]">
                    Procesamiento del Reembolso
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--accent-color)]/5 rounded-2xl p-8 border border-[var(--primary-color)]/20">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center">
                          <Clock size={32} className="text-[var(--primary-color)]" />
                        </div>
                        <span className="text-sm font-bold text-[var(--primary-color)]">PASO 1</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-[var(--text-color-primary)] mb-2">
                          Aprobación Inmediata
                        </h3>
                        <p className="text-[var(--text-color-primary)] leading-relaxed">
                          Una vez recibida tu solicitud dentro del período de 14 días, la aprobamos <strong>inmediatamente</strong>. No hay esperas ni procesos burocráticos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center my-6">
                    <div className="w-1 h-12 bg-gradient-to-b from-[var(--primary-color)] to-[var(--accent-color)] rounded-full"></div>
                  </div>

                  <div className="bg-gradient-to-r from-[var(--accent-color)]/5 to-[var(--primary-color)]/5 rounded-2xl p-8 border border-[var(--accent-color)]/20">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center">
                          <CreditCard size={32} className="text-[var(--accent-color)]" />
                        </div>
                        <span className="text-sm font-bold text-[var(--accent-color)]">PASO 2</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-[var(--text-color-primary)] mb-2">
                          Devolución a tu Método de Pago
                        </h3>
                        <p className="text-[var(--text-color-primary)] leading-relaxed mb-4">
                          El dinero será devuelto automáticamente a tu <strong>fuente de pago original</strong> (tarjeta de crédito/débito, PayPal, etc.).
                        </p>
                        <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
                          <p className="text-sm text-[var(--text-color-primary)]">
                            <strong>⏱️ Tiempo estimado:</strong> El reembolso suele reflejarse en tu cuenta en <strong>5 a 10 días hábiles</strong>, dependiendo de tu banco o institución financiera. Este tiempo está fuera de nuestro control.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* FOOTER DEL DOCUMENTO */}
            <div className="bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-color)] p-10 text-center">
              <div className="max-w-2xl mx-auto">
                <CheckCircle size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Preguntas sobre tu reembolso?
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  Nuestro equipo está disponible para ayudarte en cualquier momento.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--accent-color)] rounded-xl font-bold text-lg hover:shadow-2xl transition"
                >
                  Contáctanos Ahora
                  <ArrowLeft size={20} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>

          {/* VOLVER A TÉRMINOS */}
          <div className="mt-12 text-center">
            <Link 
              href="/terminos" 
              className="inline-flex items-center gap-2 text-[var(--text-color-secondary)] hover:text-[var(--primary-color)] transition font-medium"
            >
              <ArrowLeft size={18} />
              Volver a Términos y Condiciones
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] py-12 mt-20">
        <div className="app-container text-center">
          <p className="text-[var(--text-color-secondary)]">
            © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}