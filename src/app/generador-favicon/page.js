// src/app/generador-favicon/page.js
'use client';
import { UploadCloud, Download, Image as ImageIcon, CheckCircle, Trash2, Settings, Code, Zap, UploadCloud as UploadIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
// 🚨 RUTA CORREGIDA
import { Header, Footer } from '../components/SharedComponents'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fastapi-image-optimizer-1.onrender.com';

export default function FaviconGenerator() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null); // <-- Referencia para el input file

  const getBrowserId = () => {
    let browserId = localStorage.getItem('browser_id');
    if (!browserId) {
      browserId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('browser_id', browserId);
    }
    return browserId;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
     // Limpiar el valor del input para asegurar que onChange se dispara al subir el mismo archivo
    e.target.value = null; 

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsReady(false);
      setError('');
      setResult(null);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click(); // <-- FIX para el doble clic
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    handleFileChange({ target: { files: e.dataTransfer.files } }); // Simular el evento
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('browser_id', getBrowserId());

      const response = await fetch(`${API_URL}/generate-favicon-free`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al generar favicons');
      }

      const data = await response.json();
      setResult(data);
      setIsReady(true);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (name, base64Data) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    if (!result?.favicons) return;
    
    // Añadir un pequeño retraso entre descargas para evitar bloqueos del navegador
    Object.entries(result.favicons).forEach(([name, base64Data], index) => {
      setTimeout(() => handleDownload(name, base64Data), index * 300); 
    });
  };

  const copyHtmlSnippet = () => {
    if (!result?.html_snippet) return;
    
    navigator.clipboard.writeText(result.html_snippet);
    alert('¡Código HTML copiado al portapapeles!');
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl('');
    setIsProcessing(false);
    setIsReady(false);
    setResult(null);
    setError('');
  };

  // Renderización del componente
  return (
    <>
      <Header onLoginClick={() => { /* Lógica de login */ }} />
      <main className="app-container py-12 lg:py-20">
        <section id="favicon-generator" className="section-tool">
          <h1 className="tool-title text-5xl font-extrabold text-[var(--text-color-primary)] mb-4 flex items-center gap-4">
            <ImageIcon size={40} className="text-[var(--primary-color)]" />
            Generador de Favicon Profesional
          </h1>
          <p className="text-[var(--text-color-secondary)] mb-12 text-xl max-w-4xl">
            Convierte tu imagen de marca en un paquete completo de íconos web, optimizados para SEO y rendimiento en todos los dispositivos.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800 font-medium">
                <strong>Error:</strong> {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Columna de Entrada y Controles (2/5) */}
            <div className="lg:col-span-2 p-6 bg-[var(--bg-card)] rounded-xl shadow-lg border border-[var(--border-color)] h-fit sticky top-6">
                <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-5 flex items-center gap-2">
                    <Settings size={22} className="text-[var(--accent-color)]" />
                    1. Carga y Configura
                </h3>
                
                {/* Dropzone/Selector */}
                <div 
                    className={`dropzone border-2 border-dashed rounded-lg p-6 h-64 flex flex-col justify-center items-center text-center transition-all cursor-pointer 
                        ${file ? 'border-[var(--primary-color)] bg-[var(--bg-hover)]' : 'border-[var(--border-color)] hover:border-[var(--accent-color)]'}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault(); 
                        e.currentTarget.classList.add('drag-over');
                    }}
                    onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
                    onClick={triggerFileSelect} // <-- Usamos la función FIX
                >
                    {file ? (
                        <>
                            <CheckCircle size={40} className="text-green-500 mb-2" />
                            <p className="font-semibold text-lg text-[var(--text-color-primary)]">
                                Archivo Listo: {file.name}
                            </p>
                            <p className="text-sm text-[var(--text-color-secondary)] mt-1">
                                {(file.size / 1024 / 1024).toFixed(2)} MB.
                            </p>
                        </>
                    ) : (
                        <>
                            <UploadIcon size={48} className="text-[var(--primary-color)] mb-4" />
                            <p className="font-semibold text-lg text-[var(--text-color-primary)]">
                                Arrastra o Haz Clic para Subir
                            </p>
                            <p className="text-sm text-[var(--text-color-secondary)] mt-1">
                                PNG, JPG o SVG. Recomendado: 512x512px.
                            </p>
                        </>
                    )}
                </div>
                
                {/* Input File Real (Oculto) */}
                <input 
                    type="file" 
                    id="favicon-upload" 
                    ref={fileInputRef} // <-- Referencia al input
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                />

                {/* BOTONES DE ACCIÓN */}
                <div className="mt-8 flex flex-col gap-4">
                    <button 
                        onClick={handleProcess} 
                        disabled={!file || isProcessing || isReady}
                        className="btn btn-primary px-10 py-3 text-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Zap size={20} />
                        {isProcessing ? 'Generando...' : 'Generar Paquete de Favicon'}
                    </button>
                    {file && (
                        <button onClick={handleReset} className="btn btn-secondary-outline px-6 py-3 text-lg flex items-center justify-center gap-2">
                            <Trash2 size={20} />
                            Limpiar y Reestablecer
                        </button>
                    )}
                </div>
            </div>

            {/* Columna de Salida y Resultados (3/5) */}
            <div className="lg:col-span-3">
                <h3 className="text-xl font-bold text-[var(--text-color-primary)] mb-5 flex items-center gap-2">
                    <ImageIcon size={22} className="text-[var(--accent-color)]" />
                    2. Previsualización y Resultados
                </h3>

                {/* Área de Previsualización Inicial/Cargando */}
                {(!isReady || isProcessing) && (
                    <div className="p-10 bg-[var(--bg-card)] rounded-xl text-center border border-[var(--border-color)] shadow-sm min-h-[300px] flex flex-col items-center justify-center">
                        {isProcessing ? (
                            <>
                                <div className="loader-ring mx-auto mb-4 border-[var(--primary-color)]"></div>
                                <p className="text-xl font-medium text-[var(--text-color-primary)]">
                                    Generando íconos en diferentes tamaños...
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="favicon-preview-wrapper">
    {previewUrl ? (
        <img
            src={previewUrl}
            alt="Previsualización del Favicon"
            className="favicon-preview-image"
        />
    ) : (
        <ImageIcon size={48} className="text-[var(--text-color-secondary)] opacity-50" />
    )}
</div>

                                <p className="text-lg text-[var(--text-color-secondary)]">Sube tu imagen para iniciar la generación.</p>
                            </>
                        )}
                    </div>
                )}


                {/* RESULTADOS LISTOS */}
                {isReady && result && (
                    <div className="p-8 bg-green-50/50 border border-[var(--accent-color)] rounded-xl transition-opacity duration-500 shadow-xl">
                        <CheckCircle size={40} className="text-[var(--accent-color)] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-[var(--text-color-primary)] mb-6 text-center">
                            ¡Paquete Generado! ({result.total_files} Archivos)
                        </h3>

                        {/* GRID DE FAVICONS */}
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-6">
                            {Object.entries(result.favicons).map(([name, base64Data]) => (
                                <div key={name} className="p-2 bg-[var(--bg-page)] rounded-lg border border-[var(--border-color)] text-center transition hover:shadow-md">
                                    <img 
                                        src={`data:image/png;base64,${base64Data}`}
                                        alt={name}
                                        className="w-10 h-10 mx-auto mb-2"
                                    />
                                    <p className="text-xs font-semibold text-[var(--text-color-primary)]">
                                        {name.replace('favicon-', '').replace('.png', '')}
                                    </p>
                                    <small className="text-xs text-[var(--text-color-secondary)] block">
                                        {name.includes('apple') ? 'Touch' : (name.split('x')[0] + 'px')}
                                    </small>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-lg font-bold text-[var(--text-color-primary)] mt-8 mb-3 flex items-center gap-2">
                             <Code size={20} className="text-[var(--primary-color)]" />
                             Código HTML para Integración
                        </h4>
                        
                        {/* HTML SNIPPET */}
                        <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto text-sm font-mono">
                            <pre>{result.html_snippet}</pre>
                        </div>

                        {/* BOTONES FINALES */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <button onClick={handleDownloadAll} className="btn btn-primary px-8 py-3 text-lg flex items-center justify-center gap-2">
                                <Download size={20} />
                                Descargar Todos los Íconos
                            </button>
                            <button onClick={copyHtmlSnippet} className="btn btn-secondary-outline px-8 py-3 text-lg flex items-center justify-center gap-2">
                                <Code size={20} />
                                Copiar Código HTML
                            </button>
                        </div>
                        
                        <p className="text-center text-sm text-[var(--text-color-secondary)] mt-6">
                            Créditos usados: {result.credits_used} | Restantes: {result.credits_remaining}
                        </p>
                    </div>
                )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}