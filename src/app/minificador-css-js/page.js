'use client';

import { useState } from 'react';
import Link from 'next/link';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import FileDropzone from '../components/FileDropzone';
import AuthModal from '../components/AuthModal';

import { CheckCircle, Zap, Code, UploadCloud } from 'lucide-react';

// FeatureCard (mismo que arriba)
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="feature-card">
    <div className="icon-wrapper" style={{ backgroundColor: color }}>
      <Icon size={32} color="white" />
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

export default function MinifyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  const handleOpenModal = (view) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  const handleFreeLimitReached = () => {
    handleOpenModal('register');
  };

  const userCredits = 5;

  return (
    <>
      <Header onLoginClick={handleOpenModal} />

      <div className="app-container">
        <main>
          {/* HERO SECTION */}
          <section className="section-hero">
            <div className="hero-left">
              <h1 className="hero-title">
                Minificador de Código CSS y JavaScript
              </h1>
              <p className="hero-subtitle">
                Elimina bytes innecesarios, comentarios y espacios para acelerar tu eCommerce al instante.
              </p>

              <div className="benefit-list">
                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Soporta archivos .CSS y .JS.</p>
                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Minificación segura sin romper tu lógica.</p>
                <p><CheckCircle size={20} className="inline mr-3 text-[var(--primary-color)]" /> Mejora tu puntuación en Core Web Vitals.</p>
              </div>

              <button className="btn btn-primary btn-large mt-10" onClick={() => handleOpenModal('register')}>
                Comenzar a Minificar Gratis
              </button>
            </div>

            <div className="hero-right">
              <FileDropzone 
                isAuthenticated={false} 
                onLimitReached={handleFreeLimitReached} 
                userCredits={userCredits} 
                defaultService="minify"
                supportedMimeTypes={['text/css', 'text/javascript', 'application/javascript']}
              />
              <p className="text-center text-sm text-[var(--text-color-secondary)] mt-4">
                Arrastra o sube hasta 10 archivos (.css o .js).
              </p>
            </div>
          </section>

          {/* BENEFICIOS ESPECÍFICOS */}
          <section className="section-box section-features">
            <h2 className="section-title">¿Por qué minificar tu código?</h2>
            <div className="features-grid">
              <FeatureCard icon={Zap} title="Carga Ultrarrápida" description="Al reducir el tamaño de tus scripts y estilos, el navegador carga tu sitio más rápido." color="var(--accent-color)" />
              <FeatureCard icon={Code} title="Ancho de Banda" description="Disminuye la cantidad de datos que los usuarios deben descargar, ahorrando en costos de hosting." color="var(--primary-color)" />
              <FeatureCard icon={UploadCloud} title="Menos Peticiones HTTP" description="Minificamos tu código eliminando retornos de carro, comentarios y espacios, reduciendo la transferencia." color="var(--secondary-color)" />
            </div>
          </section>

          {/* CTA FINAL */}
          <section className="section-box text-center">
            <h2 className="section-title" style={{ marginBottom: '20px' }}>
              ¿Necesitas optimizar tus imágenes?
            </h2>
            <p className="hero-subtitle" style={{ marginBottom: '30px' }}>
              Nuestro optimizador principal usa WebP y compresión inteligente para tus fotos de producto.
            </p>
            <Link href="/" className="btn btn-primary btn-large">
              Ir al Optimizador de Imágenes
            </Link>
          </section>
        </main>

        <Footer />
      </div>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialView={modalView}
      />
    </>
  );
}