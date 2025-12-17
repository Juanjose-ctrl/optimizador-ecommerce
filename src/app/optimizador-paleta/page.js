// src/app/optimizador-paleta/page.js
'use client';

import { Palette, Layers, Copy, UploadCloud, CheckCircle, Download, UploadCloud as UploadIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Header, Footer } from '../components/SharedComponents'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fastapi-image-optimizer-1.onrender.com';

function ColorCard({ color }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(color.hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="color-card bg-[var(--bg-card)] rounded-xl transition flex-grow shadow-md hover:shadow-lg p-5 border border-[var(--border-color)]">
            <div 
                className="color-sample h-16 rounded-lg mb-3" 
                style={{ 
                    backgroundColor: color.hex, 
                    border: `2px solid ${color.hex === '#FFFFFF' || color.hex === '#F0F3F7' ? 'var(--border-color)' : 'transparent'}` 
                }}
            ></div>
            <p className="text-sm font-semibold text-[var(--text-color-primary)] mt-1">{color.name}</p>
            <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-xl font-mono text-[var(--primary-color)] font-bold">{color.hex}</span>
                <button 
                    onClick={copyToClipboard} 
                    className={`p-1 rounded-full transition-all ${copied ? 'bg-green-100 text-green-600' : 'text-[var(--text-color-secondary)] hover:bg-[var(--bg-hover)]'}`}
                >
                    {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                </button>
            </div>
            <p className="text-xs text-[var(--text-color-secondary)] mt-3">{color.description}</p>
        </div>
    );
}

export default function PaletteOptimizer() {
    const [palette, setPalette] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null); 

    const getBrowserId = () => {
        let browserId = localStorage.getItem('browser_id');
        if (!browserId) {
            browserId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('browser_id', browserId);
        }
        return browserId;
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = async (e) => {
        const selectedFile = e.target.files[0];
        
        e.target.value = null; 

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setImageLoaded(true);
            setIsProcessing(true);
            setPalette([]);
            setError('');
            
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('browser_id', getBrowserId());

                const response = await fetch(`${API_URL}/extract-palette-free`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error al extraer paleta');
                }

                const data = await response.json();
                setPalette(data.palette);
            } catch (err) {
                setError(err.message);
                console.error('Error:', err);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const exportPalette = () => {
        if (palette.length === 0) return;
        
        const paletteText = palette.map(color => 
            `${color.name} (${color.hex}): ${color.description}`
        ).join('\n');
        
        const blob = new Blob([paletteText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `opticommerce_palette_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <Header onLoginClick={() => { /* Lógica de login */ }} />
            <main className="app-container py-12 lg:py-20">
                <section id="palette-optimizer" className="section-tool">
                    <h1 className="tool-title text-5xl font-extrabold text-[var(--text-color-primary)] mb-4 flex items-center gap-4">
                        <Palette size={40} className="text-[var(--primary-color)]" />
                        Optimizador de Paleta de Colores
                    </h1>
                    <p className="text-[var(--text-color-secondary)] mb-12 text-xl max-w-4xl">
                        Sube tu logo, banner o imagen de marca. Nuestra IA analiza los píxeles clave y te entrega una paleta optimizada y funcional en formato HEX.
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800 font-medium">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        
                        {/* Columna de Entrada y Previsualización (2/5) */}
                        <div className="lg:col-span-2 p-6 bg-[var(--bg-card)] rounded-xl shadow-lg border border-[var(--border-color)] h-fit sticky top-6">
                            <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-5 flex items-center gap-2">
                                <Layers size={22} className="text-[var(--accent-color)]" />
                                1. Sube tu Imagen de Marca
                            </h3>
                            
                            {/* Dropzone/Selector, ahora dispara la función FIX */}
                            <div 
                                className="dropzone border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all cursor-pointer rounded-lg p-6 h-auto min-h-64 flex flex-col justify-center items-center text-center"
                                onClick={triggerFileSelect} 
                            >
                                {previewUrl ? (
                                    // 🚀 FIX APLICADO AQUÍ
                                    <div className="relative w-full max-w-[256px] max-h-[256px] flex justify-center items-center">
                                        <Image
                                            src={previewUrl}
                                            alt="Imagen de marca cargada"
                                            width={256} // Tamaño fijo para la previsualización
                                            height={256} // Tamaño fijo para la previsualización
                                            className="object-contain p-2 rounded-lg"
                                        />
                                    </div>
                                ) : (
                                    // CÓDIGO RESTANTE SIN CAMBIOS...
                                    <>
                                        <UploadIcon size={48} className="text-[var(--primary-color)] mb-4" />
                                        <p className="font-semibold text-lg text-[var(--text-color-primary)]">
                                            Haz clic o arrastra tu archivo aquí
                                        </p>
                                        <p className="text-sm text-[var(--text-color-secondary)] mt-1">
                                            JPEG, PNG o WebP. Máximo 5MB.
                                        </p>
                                    </>
                                )}
                            </div>
                            
                            {/* Input File Real (Oculto) */}
                            <input 
                                type="file" 
                                id="palette-upload" 
                                ref={fileInputRef} 
                                accept="image/*" 
                                onChange={handleUpload} 
                                className="hidden" 
                            />
                            
                            {/* Botón de Recarga/Procesamiento */}
                            {imageLoaded && (
                                <button 
                                    onClick={triggerFileSelect} 
                                    disabled={isProcessing}
                                    className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
                                >
                                    <UploadIcon size={20} />
                                    {isProcessing ? 'Procesando...' : 'Re-subir o Cambiar Imagen'}
                                </button>
                            )}
                        </div>

                        {/* Columna de Salida y Resultados (3/5) */}
                        <div className="lg:col-span-3">
                            <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-5 flex items-center gap-2">
                                <Palette size={22} className="text-[var(--accent-color)]" />
                                2. Paleta Optimizada (Resultados)
                            </h3>
                            
                            {/* Estado de Procesamiento */}
                            {isProcessing && (
                                <div className="p-10 bg-[var(--bg-card)] rounded-xl text-center border border-[var(--primary-color)] shadow-md">
                                    <div className="loader-ring mx-auto mb-4 border-[var(--primary-color)]"></div>
                                    <p className="text-xl font-medium text-[var(--text-color-primary)]">
                                        Analizando y optimizando tu paleta...
                                    </p>
                                </div>
                            )}

                            {/* Resultados */}
                            {imageLoaded && !isProcessing && palette.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                        {palette.map((color, index) => (
                                            <ColorCard key={index} color={color} />
                                        ))}
                                    </div>
                                    <div className="text-center mt-6">
                                        <button 
                                            onClick={exportPalette}
                                            className="btn btn-primary px-8 py-3 text-lg flex items-center mx-auto gap-2"
                                        >
                                            <Download size={20} />
                                            Exportar Paleta (.txt)
                                        </button>
                                    </div>
                                </>
                            ) : (
                                !isProcessing && (
                                    <div className="p-10 bg-[var(--bg-card)] rounded-xl text-center text-[var(--text-color-secondary)] border border-[var(--border-color)] shadow-sm">
                                        <Palette size={30} className="mx-auto mb-3" />
                                        <p className="text-lg">Sube una imagen para iniciar el análisis.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}