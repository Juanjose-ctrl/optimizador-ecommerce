// src/app/terminos/page.js - MODERNIZADO Y PROFESIONAL

'use client';
import Link from 'next/link';
import { Sun, ArrowLeft, FileText, Shield, CreditCard, Scale } from 'lucide-react';

export default function TermsPage() {
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] rounded-2xl mb-6">
              <FileText size={40} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-[var(--text-color-secondary)] mb-4">
              Última actualización: 16 de diciembre de 2024
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 rounded-full text-sm font-medium text-[var(--primary-color)]">
              <Scale size={16} />
              Acuerdo Legal Vinculante
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--accent-color)]/5 rounded-2xl p-8 mb-12 border border-[var(--primary-color)]/20">
            <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-4 flex items-center gap-3">
              <span className="text-2xl">📋</span>
              Enlaces Rápidos
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/privacidad" 
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition group"
              >
                <Shield size={24} className="text-[var(--primary-color)] group-hover:scale-110 transition" />
                <div>
                  <div className="font-semibold text-[var(--text-color-primary)]">Política de Privacidad</div>
                  <div className="text-sm text-[var(--text-color-secondary)]">Cómo protegemos tus datos</div>
                </div>
              </Link>
              <Link 
                href="/reembolso" 
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition group"
              >
                <CreditCard size={24} className="text-[var(--accent-color)] group-hover:scale-110 transition" />
                <div>
                  <div className="font-semibold text-[var(--text-color-primary)]">Política de Reembolso</div>
                  <div className="text-sm text-[var(--text-color-secondary)]">14 días de garantía</div>
                </div>
              </Link>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="bg-[var(--bg-card)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border-color)]">
            <div className="p-10 md:p-16 space-y-12">
              
              {/* Sección 1 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Acuerdo Vinculante y Definiciones
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)]">
                    OptiCommerce es un servicio propiedad y operado por OptiCommerce S.A.S. Al acceder o utilizar la plataforma OptiCommerce, usted (el <strong>"Usuario"</strong>) acepta estos Términos, que constituyen un acuerdo legal vinculante entre usted y la empresa.
                  </p>
                  <div className="mt-4 p-4 bg-[var(--primary-color)]/5 rounded-xl border-l-4 border-[var(--primary-color)]">
                    <p className="text-sm text-[var(--text-color-primary)]">
                      <strong>Importante:</strong> Si no está de acuerdo con estos términos, no debe utilizar nuestros servicios.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 2 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Descripción del Servicio
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)]">
                    OptiCommerce proporciona una interfaz de programación de aplicaciones (API) y una herramienta web para optimizar y reducir el tamaño de imágenes digitales, principalmente para uso en plataformas de comercio electrónico. El servicio funciona mediante un sistema de créditos prepagados.
                  </p>
                </div>
              </section>

              {/* Sección 3 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Cuentas de Usuario y Uso de Créditos
                  </h2>
                </div>
                <div className="pl-16 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--accent-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[var(--accent-color)] font-bold">•</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-color-primary)] mb-2">Registro</h3>
                      <p className="text-lg text-[var(--text-color-primary)]">
                        Debe ser mayor de edad según las leyes de su jurisdicción para crear una cuenta. La información proporcionada debe ser veraz, precisa y actualizada.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--accent-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[var(--accent-color)] font-bold">•</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-color-primary)] mb-2">Créditos</h3>
                      <p className="text-lg text-[var(--text-color-primary)]">
                        Los servicios se cobran por crédito. Un crédito equivale a una optimización de imagen exitosa. Los créditos no utilizados pueden caducar si no están asociados a un plan de suscripción activo, según se especifique en el plan adquirido.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--accent-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[var(--accent-color)] font-bold">•</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-color-primary)] mb-2">Seguridad de la Cuenta</h3>
                      <p className="text-lg text-[var(--text-color-primary)]">
                        Es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección 4 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Propiedad Intelectual y Contenido del Usuario
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)] mb-4">
                    El Usuario retiene todos los derechos sobre las imágenes subidas al Servicio. Al subir contenido, el Usuario otorga a OptiCommerce una licencia limitada, no exclusiva y revocable para:
                  </p>
                  <ul className="space-y-3 text-lg text-[var(--text-color-primary)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">✓</span>
                      <span>Procesar y optimizar las imágenes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">✓</span>
                      <span>Almacenar temporalmente el contenido según sea necesario</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">✓</span>
                      <span>Proporcionar el servicio contratado</span>
                    </li>
                  </ul>
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)] mt-4">
                    OptiCommerce <strong>no reclama derechos de propiedad</strong> sobre su contenido y no utilizará sus imágenes para ningún otro propósito sin su consentimiento expreso.
                  </p>
                </div>
              </section>

              {/* Sección 5 - Pagos y Reembolsos */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">5</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Pagos, Facturación y Reembolsos
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)] mb-4">
                    Todos los pagos se procesan de forma segura a través de nuestro proveedor de pagos, Paddle. Al realizar una compra, usted acepta:
                  </p>
                  <ul className="space-y-3 text-lg text-[var(--text-color-primary)] mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">•</span>
                      <span>Proporcionar información de pago válida y actualizada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">•</span>
                      <span>Autorizar cargos recurrentes si opta por suscripciones mensuales o anuales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">•</span>
                      <span>Recibir facturas electrónicas por correo electrónico</span>
                    </li>
                  </ul>
                  
                  <div className="bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-color)]/5 rounded-2xl p-6 border-l-4 border-[var(--accent-color)]">
                    <div className="flex items-start gap-4">
                      <CreditCard size={28} className="text-[var(--accent-color)] flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg text-[var(--text-color-primary)] mb-2">
                          Garantía de Reembolso
                        </h3>
                        <p className="text-[var(--text-color-primary)] mb-3">
                          Ofrecemos un período de garantía de <strong>14 días</strong> para todos los pagos. Para más detalles sobre cómo solicitar un reembolso, consulte nuestra:
                        </p>
                        <Link 
                          href="/reembolso" 
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-color)] text-white rounded-xl font-semibold hover:shadow-lg transition"
                        >
                          <CreditCard size={18} />
                          Política de Reembolso Completa
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección 6 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">6</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Limitación de Responsabilidad
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)]">
                    OptiCommerce proporciona el servicio <strong>"tal cual"</strong> y <strong>"según disponibilidad"</strong>. La Compañía no se hace responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación:
                  </p>
                  <ul className="mt-4 space-y-2 text-lg text-[var(--text-color-primary)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--text-color-secondary)]">—</span>
                      <span>Pérdida de beneficios o ingresos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--text-color-secondary)]">—</span>
                      <span>Pérdida o corrupción de datos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--text-color-secondary)]">—</span>
                      <span>Interrupción del servicio o del negocio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--text-color-secondary)]">—</span>
                      <span>Uso, fondo de comercio u otras pérdidas intangibles</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Sección 7 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary-color)]">7</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">
                    Modificaciones de los Términos
                  </h2>
                </div>
                <div className="pl-16">
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)]">
                    Nos reservamos el derecho de modificar estos Términos en cualquier momento. Se le notificará de cualquier cambio material mediante:
                  </p>
                  <ul className="mt-4 space-y-3 text-lg text-[var(--text-color-primary)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">📧</span>
                      <span>Correo electrónico a la dirección asociada con su cuenta</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--primary-color)] font-bold">🔔</span>
                      <span>Aviso destacado en nuestra plataforma</span>
                    </li>
                  </ul>
                  <p className="text-lg leading-relaxed text-[var(--text-color-primary)] mt-4">
                    Su uso continuado del Servicio después de dichas modificaciones constituye su aceptación de los nuevos Términos.
                  </p>
                </div>
              </section>

            </div>

            {/* FOOTER DEL DOCUMENTO */}
            <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] p-10 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Tienes preguntas sobre estos términos?
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  Nuestro equipo está disponible para aclarar cualquier duda que puedas tener.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--primary-color)] rounded-xl font-bold text-lg hover:shadow-2xl transition"
                >
                  Contáctanos
                  <ArrowLeft size={20} className="rotate-180" />
                </Link>
              </div>
            </div>
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