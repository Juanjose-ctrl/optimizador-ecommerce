// src/app/generador-utm/page.js
'use client';
import { Link2, Copy, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
// Importación corregida a la ruta relativa correcta
import { Header, Footer } from '../components/SharedComponents'; 

// Esta función es vital para asegurar que los parámetros sean seguros para URL
const encodeParam = (param) => {
    if (!param) return '';
    // Reemplaza espacios con '+' y codifica caracteres especiales (excepto los usados en URLs)
    return encodeURIComponent(param.trim().replace(/\s/g, '+'));
};

export default function UtmGenerator() {
    const [baseUrl, setBaseUrl] = useState('');
    const [source, setSource] = useState('');
    const [medium, setMedium] = useState('');
    const [campaign, setCampaign] = useState('');
    const [term, setTerm] = useState(''); // Opcional: utm_term
    const [content, setContent] = useState(''); // Opcional: utm_content
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    // Función principal que genera el enlace UTM en tiempo real
    const generatedUrl = useMemo(() => {
        if (!baseUrl) {
            setError('La URL de destino es obligatoria.');
            return '';
        }
        
        // Validación básica de la URL (solo para asegurar que no esté vacía)
        try {
            // Se intenta crear una URL para validar el formato básico
            new URL(baseUrl);
        } catch (e) {
            setError('Formato de URL inválido.');
            return '';
        }
        
        setError(''); // Limpiar errores si la validación pasa

        const params = [];
        
        // Parámetros Obligatorios (aunque solo la URL es estrictamente requerida para la generación)
        if (source) params.push(`utm_source=${encodeParam(source)}`);
        if (medium) params.push(`utm_medium=${encodeParam(medium)}`);
        if (campaign) params.push(`utm_campaign=${encodeParam(campaign)}`);

        // Parámetros Opcionales
        if (term) params.push(`utm_term=${encodeParam(term)}`);
        if (content) params.push(`utm_content=${encodeParam(content)}`);

        if (params.length === 0) {
            // Si solo hay URL base, se devuelve la URL base
            return baseUrl;
        }

        // Determinar si se usa '?' o '&' para iniciar los parámetros
        const separator = baseUrl.includes('?') ? '&' : '?';
        
        return `${baseUrl}${separator}${params.join('&')}`;

    }, [baseUrl, source, medium, campaign, term, content]);

    const handleCopy = () => {
        if (generatedUrl) {
            navigator.clipboard.writeText(generatedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setBaseUrl('');
        setSource('');
        setMedium('');
        setCampaign('');
        setTerm('');
        setContent('');
        setCopied(false);
        setError('');
    };

    const isUtmValid = baseUrl && source && medium && campaign && !error;

    return (
        <>
            <Header onLoginClick={() => { /* Lógica de login */ }} />
            <main className="app-container py-12 lg:py-20">
                <section id="utm-generator" className="section-tool">
                    <h1 className="tool-title text-5xl font-extrabold text-[var(--text-color-primary)] mb-4 flex items-center gap-4">
                        <TrendingUp size={40} className="text-[var(--primary-color)]" />
                        Generador de Enlaces UTM Profesional
                    </h1>
                    <p className="text-[var(--text-color-secondary)] mb-12 text-xl max-w-4xl">
                        Asegura la trazabilidad de tus campañas. Crea enlaces limpios para Google Analytics con todos los parámetros UTM requeridos en segundos.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        
                        {/* Columna de Entrada (2/5) */}
                        <div className="lg:col-span-2 p-6 bg-[var(--bg-card)] rounded-xl shadow-lg border border-[var(--border-color)] h-fit sticky top-6">
                            <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-5 flex items-center gap-2">
                                <Link2 size={22} className="text-[var(--accent-color)]" />
                                1. Parámetros Requeridos
                            </h3>
                            
                            <div className="flex flex-col gap-6">
                                {/* URL Base */}
                                <div className="input-group">
                                    <label htmlFor="baseUrl" className="input-label required">URL de Destino (Web)</label>
                                    <input
                                        id="baseUrl"
                                        type="url"
                                        placeholder="https://tu-tienda.com/producto/oferta"
                                        value={baseUrl}
                                        onChange={(e) => setBaseUrl(e.target.value)}
                                        className="input-field"
                                    />
                                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                                </div>
                                
                                {/* utm_source */}
                                <div className="input-group">
                                    <label htmlFor="source" className="input-label required">Fuente (Source)</label>
                                    <input
                                        id="source"
                                        type="text"
                                        placeholder="facebook, google, newsletter"
                                        value={source}
                                        onChange={(e) => setSource(e.target.value.toLowerCase())}
                                        className="input-field"
                                    />
                                </div>
                                
                                {/* utm_medium */}
                                <div className="input-group">
                                    <label htmlFor="medium" className="input-label required">Medio (Medium)</label>
                                    <input
                                        id="medium"
                                        type="text"
                                        placeholder="cpc, email, social"
                                        value={medium}
                                        onChange={(e) => setMedium(e.target.value.toLowerCase())}
                                        className="input-field"
                                    />
                                </div>
                                
                                {/* utm_campaign */}
                                <div className="input-group">
                                    <label htmlFor="campaign" className="input-label required">Campaña (Campaign)</label>
                                    <input
                                        id="campaign"
                                        type="text"
                                        placeholder="verano_2025, black_friday"
                                        value={campaign}
                                        onChange={(e) => setCampaign(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-[var(--text-color-primary)] mt-8 mb-5 flex items-center gap-2">
                                <Zap size={22} className="text-[var(--accent-color)]" />
                                2. Parámetros Opcionales
                            </h3>

                            <div className="flex flex-col gap-6">
                                {/* utm_term */}
                                <div className="input-group">
                                    <label htmlFor="term" className="input-label">Término (Term) - Opcional</label>
                                    <input
                                        id="term"
                                        type="text"
                                        placeholder="palabra_clave_principal"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                                        className="input-field"
                                    />
                                </div>

                                {/* utm_content */}
                                <div className="input-group">
                                    <label htmlFor="content" className="input-label">Contenido (Content) - Opcional</label>
                                    <input
                                        id="content"
                                        type="text"
                                        placeholder="banner_izquierdo, boton_azul"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Columna de Salida y Resultados (3/5) */}
                        <div className="lg:col-span-3">
                            <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-5 flex items-center gap-2">
                                <CheckCircle size={22} className="text-[var(--accent-color)]" />
                                3. Enlace Generado
                            </h3>
                            
                            <div className="p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] shadow-sm">
                                
                                {baseUrl ? (
                                    <>
                                        <p className="text-sm font-medium text-[var(--text-color-secondary)] mb-2">
                                            {isUtmValid ? '¡Listo para Usar!' : 'Generando...'}
                                        </p>
                                        
                                        {/* Área de Resultado */}
                                        <div className="bg-[var(--bg-page)] p-4 rounded-lg border border-[var(--border-color)] break-all flex items-center justify-between gap-4">
                                            <p className={`text-lg font-mono flex-grow ${generatedUrl ? 'text-[var(--text-color-primary)]' : 'text-[var(--text-color-secondary)] opacity-60'}`}>
                                                {generatedUrl || 'Tu enlace UTM aparecerá aquí...'}
                                            </p>
                                            
                                            <button 
                                                onClick={handleCopy} 
                                                disabled={!generatedUrl || copied}
                                                className={`btn p-2 rounded-full transition-all flex-shrink-0 
                                                    ${copied ? 'bg-green-500 text-white' : 'bg-transparent text-[var(--accent-color)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)]'}`}
                                            >
                                                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-10 text-center text-[var(--text-color-secondary)]">
                                        <Link2 size={30} className="mx-auto mb-3" />
                                        <p className="text-lg">Ingresa la URL de destino para empezar a generar los parámetros UTM.</p>
                                    </div>
                                )}
                            </div>

                            {/* Acciones Finales */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={handleCopy} 
                                    disabled={!generatedUrl || copied}
                                    className="btn btn-primary px-8 py-3 text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <Copy size={20} />
                                    {copied ? '¡Copiado!' : 'Copiar Enlace Final'}
                                </button>
                                <button 
                                    onClick={handleReset} 
                                    className="btn btn-secondary-outline px-6 py-3 text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <Trash2 size={20} />
                                    Limpiar Campos
                                </button>
                            </div>
                            
                            {/* Explicación de los Parámetros (Educación de CRO/Marketing) */}
                            <div className="mt-12">
                                <h4 className="text-xl font-bold text-[var(--text-color-primary)] mb-4">¿Qué es un Código UTM?</h4>
                                <p className="text-[var(--text-color-secondary)] mb-4">
                                    Los códigos UTM (Urchin Tracking Module) son pequeñas cadenas de texto añadidas a los enlaces que permiten a Google Analytics (u otras herramientas) rastrear la fuente, el medio y la campaña exactos de tu tráfico. 
                                </p>
                                <ul className="space-y-3 text-[var(--text-color-secondary)] text-sm border-l-4 border-[var(--accent-color)] pl-4 py-2 bg-[var(--bg-hover)] rounded-md">
                                    <li>**Source (`utm_source`):** De dónde viene el tráfico (ej. `facebook`, `google`).</li>
                                    <li>**Medium (`utm_medium`):** El tipo de marketing o medio (ej. `cpc`, `email`, `social`).</li>
                                    <li>**Campaign (`utm_campaign`):** El nombre específico de la promoción o campaña (ej. `black_friday_2025`).</li>
                                    <li>**Term (`utm_term`):** Utilizado principalmente para identificar palabras clave de pago (opcional).</li>
                                    <li>**Content (`utm_content`):** Para distinguir entre dos enlaces iguales dentro del mismo anuncio o email (ej. `banner_superior`, `boton_inferior`).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}