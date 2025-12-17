'use client';
import { UploadCloud, Download, Image as ImageIcon, CheckCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fastapi-image-optimizer-1.onrender.com';

export default function FaviconGenerator() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getBrowserId = () => {
    let browserId = localStorage.getItem('browser_id');
    if (!browserId) {
      browserId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('browser_id', browserId);
    }
    return browserId;
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsReady(false);
      setError('');
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    handleFileChange(e.dataTransfer.files[0]);
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
    
    Object.entries(result.favicons).forEach(([name, base64Data]) => {
      setTimeout(() => handleDownload(name, base64Data), 100);
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

  return (
    <section id="favicon-generator" className="section-tool max-w-4xl mx-auto">
      <h2 className="tool-title mb-10">
        <ImageIcon size={32} />
        Generador de Favicon Profesional
      </h2>
      <p className="text-[var(--text-color-secondary)] mb-10 text-lg">
        Convierte tu imagen de marca en un paquete completo de íconos web, incluyendo formatos `.ico`, PNG, y Touch Icons, optimizados para un rendimiento web impecable.
      </p>

      {/* ÁREA PRINCIPAL DE DROP Y PREVISUALIZACIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LADO DE CARGA */}
        <div 
          className={`dropzone h-full flex flex-col justify-center ${file ? 'border-solid border-[var(--primary-color)]' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault(); 
            e.currentTarget.classList.add('drag-over');
          }}
          onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
          onClick={() => document.getElementById('favicon-upload').click()}
        >
          {file ? (
            <div className="p-4 rounded-lg bg-[var(--bg-page)] border border-[var(--border-color)]">
              <p className="font-semibold text-[var(--text-color-primary)]">
                Archivo Cargado: <strong>{file.name}</strong>
              </p>
              <p className="text-sm text-[var(--text-color-secondary)] mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB. Listo para generar.
              </p>
            </div>
          ) : (
            <>
              <UploadCloud size={56} className="dropzone-icon mx-auto mb-4" />
              <p className="font-bold text-xl text-[var(--text-color-primary)]">
                Arrastra y Suelta tu Imagen
              </p>
              <p className="text-md text-[var(--text-color-secondary)] mt-2">
                Formatos: PNG, JPG, SVG. Recomendado: 512x512px.
              </p>
            </>
          )}
          <input 
            type="file" 
            id="favicon-upload" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e.target.files[0])} 
            className="hidden" 
          />
        </div>

        {/* LADO DE PREVISUALIZACIÓN */}
        <div className="flex flex-col items-center justify-center p-6 bg-[var(--bg-page)] rounded-lg border border-[var(--border-color)]">
          <h3 className="text-xl font-semibold mb-4 text-[var(--text-color-primary)]">Previsualización</h3>
          <div className="w-32 h-32 rounded-lg border-2 border-dashed border-[var(--border-color)] flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Previsualización del Favicon"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <ImageIcon size={48} className="text-[var(--text-color-secondary)] opacity-50" />
            )}
          </div>
          <p className="text-sm text-[var(--text-color-secondary)] mt-2">Cómo se verá el ícono base.</p>
        </div>
      </div>
      
      {/* ERROR MESSAGE */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* BOTONES DE ACCIÓN */}
      <div className="mt-12 flex justify-center gap-4">
        <button 
          onClick={handleProcess} 
          disabled={!file || isProcessing || isReady}
          className="btn btn-primary px-10 py-4 text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Generando...' : 'Generar Paquete'}
        </button>
        {file && (
          <button onClick={handleReset} className="btn btn-secondary-outline px-6 py-4 text-xl">
            <Trash2 size={20} className="inline mr-2" />
            Limpiar
          </button>
        )}
      </div>

      {/* RESULTADOS */}
      {isReady && result && (
        <div className="mt-12 p-8 bg-green-50 border border-[var(--accent-color)] rounded-lg transition-opacity duration-500">
          <CheckCircle size={40} className="text-[var(--accent-color)] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[var(--text-color-primary)] mb-4 text-center">
            ¡Generación Exitosa!
          </h3>
          <p className="text-[var(--text-color-secondary)] mb-6 text-lg text-center">
            Tu paquete incluye {result.total_files} íconos optimizados.
          </p>

          {/* GRID DE FAVICONS */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(result.favicons).map(([name, base64Data]) => (
              <div key={name} className="p-4 bg-white rounded-lg border border-[var(--border-color)] text-center">
                <img 
                  src={`data:image/png;base64,${base64Data}`}
                  alt={name}
                  className="w-16 h-16 mx-auto mb-2"
                />
                <p className="text-xs font-semibold text-[var(--text-color-primary)] mb-2">
                  {name}
                </p>
                <button 
                  onClick={() => handleDownload(name, base64Data)}
                  className="text-xs btn btn-primary px-3 py-1"
                >
                  Descargar
                </button>
              </div>
            ))}
          </div>

          {/* HTML SNIPPET */}
          <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-xs">{result.html_snippet}</pre>
          </div>

          {/* BOTONES FINALES */}
          <div className="flex gap-4 justify-center">
            <button onClick={handleDownloadAll} className="btn btn-primary px-8 py-3 text-lg">
              <Download size={20} className="inline mr-2" />
              Descargar Todos
            </button>
            <button onClick={copyHtmlSnippet} className="btn btn-secondary px-8 py-3 text-lg">
              Copiar Código HTML
            </button>
          </div>

          <p className="text-center text-sm text-[var(--text-color-secondary)] mt-4">
            Créditos usados: {result.credits_used} | Restantes: {result.credits_remaining}
          </p>
        </div>
      )}
    </section>
  );
}