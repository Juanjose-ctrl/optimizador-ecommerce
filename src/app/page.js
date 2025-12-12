// src/app/page.js - VERSIÓN CON MODAL DE LOGIN

'use client'; 
import Link from 'next/link';
// Importa el nuevo componente Modal
import AuthModal from './components/AuthModal'; 
// Importamos los íconos necesarios para el diseño
import { CloudUpload, CheckCircle, Sun, Leaf, Zap, Shield, TrendingUp, DollarSign } from 'lucide-react'; 
// Asegúrate de que los imports de iconos sigan funcionando tras la corrección del deploy.

// Componente para el Header Minimalista
const Header = ({ onLoginClick }) => ( // Recibe la función para abrir el modal
    <div className="app-container">
        <header className="header-main">
            <div className="logo">
                <Sun size={24} color="var(--accent-color)" style={{ marginRight: '8px' }} />
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                    OptiCommerce
                </h2>
            </div>
            <nav>
                {/* 🚨 Cambiamos el Link por un botón que abre el modal */}
                <button className="btn btn-primary" onClick={() => onLoginClick('login')}>
                    Iniciar Sesión
                </button>
            </nav>
        </header>
    </div>
);

// ... (El componente FeatureCard va aquí, sin cambios) ...
const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="feature-card">
        {/* ... contenido sin cambios ... */}
        <div className="icon-wrapper" style={{ backgroundColor: color }}>
            <Icon size={32} color="white" />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
    </div>
);


// Componente principal de la Landing Page
export default function LandingPage() {
    // Estado para controlar la visibilidad y vista del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState('login'); // 'login' o 'register'

    const handleOpenModal = (view) => {
        setModalView(view);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* 🚨 Pasamos la función de abrir al Header */}
            <Header onLoginClick={handleOpenModal} /> 

            <main className="app-container">
                
                {/* ========================================= */}
                {/* SECCIÓN 1: HERO y ZONA DE ACCIÓN */}
                {/* ========================================= */}
                <section className="section-hero">
                    <div className="hero-left">
                        {/* ... contenido sin cambios ... */}
                        <h1 className="hero-title">
                            Optimización de Imágenes <br /> para eCommerce Ecológica y Eficiente
                        </h1>
                        <p className="hero-subtitle">
                            Reduce el peso de tus imágenes de producto hasta un 70% sin perder calidad.
                        </p>
                        
                        <div className="benefit-list">
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Compresión sin pérdida de calidad.</p>
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Compatible con WEBP, JPEG y PNG.</p>
                            <p><CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} /> Uso gratuito hasta 100 créditos.</p>
                        </div>
                        
                        {/* 🚨 Cambiamos el link de registro a abrir el modal */}
                        <button 
                            className="btn btn-primary btn-large" 
                            style={{ marginTop: '20px' }}
                            onClick={() => handleOpenModal('register')} 
                        >
                            Comenzar a Optimizar Gratis
                        </button>

                    </div>
                    
                    {/* Zona de Dropzone (Maqueta visual, sin cambios por ahora) */}
                    <div className="hero-right">
                        <div className="dropzone-mockup">
                            <CloudUpload size={48} color="var(--accent-color)" />
                            <p className="dropzone-text">Arrastra y suelta tu archivo aquí</p>
                            <div className="dropzone-separator">O</div>
                            <button className="btn btn-secondary">Subir Imagen</button>
                            <small>Máximo 10MB</small>
                        </div>
                    </div>
                </section>

                {/* ... (Las secciones 2 y 3 y el Footer siguen sin cambios) ... */}

            </main>

            {/* 🚨 Renderiza el Modal aquí, fuera del main */}
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialView={modalView}
            />

        </>
    );
}