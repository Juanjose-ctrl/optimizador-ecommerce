// src/components/FaviconGenerator.js

'use client';
import { UploadCloud, Download, Image as ImageIcon, CheckCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image'; // Importar Next Image para previsualización

export default function FaviconGenerator() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsReady(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    handleFileChange(e.dataTransfer.files[0]);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    // Simulación de procesamiento: Aquí iría la llamada al backend
    setTimeout(() => {
      setIsProcessing(false);
      setIsReady(true);
    }, 2500); // 2.5 segundos para un efecto profesional
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl('');
    setIsProcessing(false);
    setIsReady(false);
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
                Archivo Cargado: **{file.name}**
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
      {isReady && (
        <div className="mt-12 p-8 bg-green-50/[0.1] border border-[var(--accent-color)] rounded-lg text-center transition-opacity duration-500 fade-in">
          <CheckCircle size={40} className="text-[var(--accent-color)] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[var(--text-color-primary)] mb-4">¡Generación Exitosa!</h3>
          <p className="text-[var(--text-color-secondary)] mb-8 text-lg">
            Tu paquete ZIP incluye todos los tamaños: 16x16, 32x32, Apple Touch, Android Chrome y el código HTML.
          </p>
          <button className="btn btn-accent-dark px-8 py-3 text-lg">
            <Download size={20} className="inline mr-2" />
            Descargar Paquete (.ZIP)
          </button>
        </div>
      )}
    </section>
  );
}