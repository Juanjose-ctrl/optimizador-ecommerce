'use client';
import { useState } from 'react';
import Link from 'next/link';

// 🚨 IMPORTACIÓN DE COMPONENTES COMPARTIDOS Y ENLACES (Header, Footer, FeatureCard, SERVICE_LINKS)
import { Header, Footer, FeatureCard, SERVICE_LINKS } from './components/SharedComponents';

import FileDropzone from './components/FileDropzone';
import AuthModal from './components/AuthModal';

// 🚨 Solo importamos los iconos que SÍ se usan EXCLUSIVAMENTE AQUÍ
import { 
  CheckCircle, 
  Shield, TrendingUp, Leaf, DollarSign 
} from 'lucide-react'; // Los iconos de FeatureCard se usan aquí

// 🚨 Las definiciones de SERVICE_LINKS, FeatureCard, Header y Footer han sido ELIMINADAS.

// LANDING PAGE (Esta sigue siendo la exportación default)
export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  const handleOpenModal = (view) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  const handleFreeLimitReached = () => {
    handleOpenModal('register');
  };

  return (
    <>
      <div className="app-container">
        {/* Header usa el prop onLoginClick que definimos aquí */}
        <Header onLoginClick={handleOpenModal} /> 

        <main>
          {/* ... (El resto de tu main, que permanece igual) ... */}
          <section className="section-hero">
            {/* ... */}
          </section>

          {/* SECCIÓN PASOS */}
          <section className="section-box">
            {/* ... */}
          </section>

          {/* SECCIÓN FEATURES */}
          <section className="section-box">
            <h2 className="section-title">¿Por qué OptiCommerce es la mejor opción?</h2>
            <div className="features-grid">
              <FeatureCard icon={Shield} title="Seguridad de Datos" description="Tus datos y archivos están protegidos con encriptación HTTPS. Total tranquilidad para tu negocio." color="#008080" />
              <FeatureCard icon={TrendingUp} title="Rendimiento Web Superior" description="Aumenta tu puntuación de PageSpeed y reduce tu tasa de rebote gracias a la velocidad de carga." color="#10B981" />
              <FeatureCard icon={Leaf} title="Conciencia Ecológica" description="Archivos más pequeños significan menos consumo de energía en transferencia de datos. Optimización sostenible." color="#40B5AD" />
              <FeatureCard icon={DollarSign} title="Ahorro en Hosting" description="Menos ancho de banda utilizado por tus visitantes se traduce en menores costos mensuales de alojamiento." color="#1A202C" />
            </div>
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