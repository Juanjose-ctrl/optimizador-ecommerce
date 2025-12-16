// src/components/layout/Footer.jsx
import Link from 'next/link';
import { Sun } from 'lucide-react';

const SERVICE_CATEGORIES = [
  // Mismo array que arriba (puedes copiarlo o importarlo si prefieres, pero por simplicidad lo repetimos)
  {
    category: "Optimización de Archivos",
    icon: () => null,
    color: "",
    services: [
      { name: "Optimizador WebP/Imágenes", href: "/", icon: () => null },
      { name: "Minificador CSS/JS", href: "/minificador-css-js", icon: () => null },
    ]
  },
  {
    category: "Seguridad y Privacidad",
    icon: () => null,
    color: "",
    services: [
      { name: "Limpiador de Metadatos", href: "/limpiar-metadatos-imagen", icon: () => null },
    ]
  },
];

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="app-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <Link href="/" className="flex items-center gap-4">
                <Sun size={30} className="text-[var(--primary-color)]" />
                <span className="logo-text text-3xl">OptiCommerce</span>
              </Link>
            </div>
            <small className="block mt-8 text-[var(--text-color-secondary)]">
              © {new Date().getFullYear()} OptiCommerce. Todos los derechos reservados.
            </small>
            <small className="block mt-4 text-[var(--text-color-secondary)]">
              Desarrollado por Juan José Guerrero.
            </small>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-4">Nuestros Servicios</h4>
            <div className="flex flex-col gap-3">
              {SERVICE_CATEGORIES.flatMap(cat => cat.services).map((service) => (
                <Link key={service.href} href={service.href} className="footer-link text-base">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-4">Información Legal</h4>
            <div className="flex flex-col gap-3">
              <Link href="/terminos" className="footer-link text-base">Términos y Condiciones</Link>
              <Link href="/privacidad" className="footer-link text-base">Política de Privacidad</Link>
              <Link href="/reembolso" className="footer-link text-base">Política de Reembolso</Link>
              <Link href="/cookies" className="footer-link text-base">Política de Cookies</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-4">Empresa</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="footer-link text-base">Sobre Nosotros</Link>
              <Link href="/contact" className="footer-link text-base">Contacto</Link>
              <Link href="/faq" className="footer-link text-base">Preguntas Frecuentes (FAQ)</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}