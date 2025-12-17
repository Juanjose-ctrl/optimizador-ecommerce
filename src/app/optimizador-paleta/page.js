'use client';
import { Palette, Layers, Copy, UploadCloud, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fastapi-image-optimizer-1.onrender.com';

function ColorCard({ color }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(color.hex);
        alert(`Copiado: ${color.hex}`);
    };

    return (
        <div className="color-card hover:shadow-xl transition flex-grow p-5">
            <div 
                className="color-sample h-16 rounded-md mb-3" 
                style={{ 
                    backgroundColor: color.hex, 
                    border: `2px solid ${color.hex === '#F0F3F7' ? 'var(--border-color)' : 'transparent'}` 
                }}
            ></div>
            <p className="text-sm font-semibold text-[var(--text-color-primary)] mt-1">{color.name}</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-mono text-[var(--primary-color)]">{color.hex}</span>
                <button 
                    onClick={copyToClipboard} 
                    className="text-[var(--text-color-secondary)] hover:text-[var(--accent-color)] transition p-1 rounded-full"
                >
                    <Copy size={16} />
                </button>
            </div>
            <p className="text-xs text-[var(--text-color-secondary)] mt-2 text-center">{color.description}</p>
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

    const getBrowserId = () => {
        let browserId = localStorage.getItem('browser_id');
        if (!browserId) {
            browserId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('browser_id', browserId);
        }
        return browserId;
    };

    const handleUpload = async (e) => {
        const selectedFile = e.target.files[0];
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
            `${color.name}: ${color.hex} - ${color.description}`
        ).join('\n');
        
        const blob = new Blob([paletteText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'color-palette.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <section id="palette-optimizer" className="section-tool max-w-6xl mx-auto">
            <h2 className="tool-title mb-10">
                <Palette size={32} />
                Optimizador de Paleta de Colores
            </h2>
            <p className="text-[var(--text-color-secondary)] mb-10 text-lg max-w-4xl">
                Sube tu logo, banner o imagen de marca. Nuestra IA extrae los colores clave y te proporciona una paleta optimizada y funcional en formato HEX.
            </p>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                
                {/* Columna de Entrada y Previsualización (2/5) */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-[var(--text-color-primary)] mb-4 flex items-center gap-2">
                        <Layers size={20} className="text-[var(--secondary-color)]" />
                        Imagen de Origen
                    </h3>
                    
                    <div 
                        className="dropzone h-64 flex flex-col justify-center"
                        onClick={() => document.getElementById('palette-upload').click()}
                    >
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Imagen de marca cargada"
                                width={300}
                                height={300}
                                className="object-contain w-full h-full p-2"
                            />
                        ) : (
                            <>
                                <UploadCloud size={40} className="dropzone-icon mx-auto mb-3" />
                                <p className="font-semibold text-lg text-[var(--text-color-primary)]">
                                    Haz clic para subir tu logo
                                </p>
                            </>
                        )}
                        <input 
                            type="file" 
                            id="palette-upload" 
                            accept="image/*" 
                            onChange={handleUpload} 
                            className="hidden" 
                        />
                    </div>
                </div>

                {/* Columna de Salida y Resultados (3/5) */}
                <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold text-[var(--text-color-primary)] mb-4 flex items-center gap-2">
                        <Palette size={20} className="text-[var(--secondary-color)]" />
                        Paleta Optimizada (Resultados)
                    </h3>
                    
                    {isProcessing && (
                        <div className="p-8 bg-[var(--bg-page)] rounded-lg text-center border border-[var(--border-color)]">
                            <div className="loader-ring mx-auto mb-3"></div>
                            <p className="text-lg font-medium text-[var(--text-color-primary)]">
                                Analizando colores...
                            </p>
                        </div>
                    )}

                    {imageLoaded && !isProcessing && palette.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {palette.map((color, index) => (
                                    <ColorCard key={index} color={color} />
                                ))}
                            </div>
                            <div className="text-center">
                                <button 
                                    onClick={exportPalette}
                                    className="btn btn-primary px-6 py-3"
                                >
                                    Exportar Paleta
                                </button>
                            </div>
                        </>
                    ) : (
                        !isProcessing && (
                            <div className="p-8 bg-[var(--bg-page)] rounded-lg text-center text-[var(--text-color-secondary)] border border-[var(--border-color)]">
                                Sube una imagen para ver la paleta de colores extraída.
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}