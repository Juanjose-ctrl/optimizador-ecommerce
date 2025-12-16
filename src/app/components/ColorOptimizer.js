// src/app/components/ColorOptimizer.js
'use client';

import { useState, useMemo } from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react'; 

// 🚨 Lógica de Contraste WCAG: Implementación de la fórmula de luminancia y relación de contraste.
// Las fórmulas se basan en WCAG 2.1 guidelines.
// Nota: Usamos funciones puras para evitar dependencias externas grandes.

// 1. Convertir HEX a RGB (para calcular luminancia)
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

// 2. Calcular Luminancia Relativa (L)
const getLuminance = (r, g, b) => {
  const [rsrgb, gsrgb, bsrgb] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
};

// 3. Calcular Relación de Contraste (C) entre dos colores
const getContrastRatio = (color1, color2) => {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const L1 = getLuminance(r1, g1, b1);
  const L2 = getLuminance(r2, g2, b2);

  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  return ratio.toFixed(2);
};

// 4. Función para verificar el cumplimiento
const checkWCAG = (ratio) => {
    ratio = parseFloat(ratio);
    // WCAG AAA: ratio 7.0:1
    // WCAG AA: ratio 4.5:1 (Normal Text)
    // WCAG AA: ratio 3.0:1 (Large Text)
    if (ratio >= 7.0) return { status: 'AAA', icon: CheckCircle, color: 'text-green-500' };
    if (ratio >= 4.5) return { status: 'AA', icon: CheckCircle, color: 'text-yellow-500' };
    if (ratio >= 3.0) return { status: 'Large AA', icon: AlertTriangle, color: 'text-orange-500' };
    return { status: 'Failed', icon: X, color: 'text-red-500' };
};

// 5. Función para intentar generar un texto negro/blanco contrastante
// Esto es una simplificación; idealmente usaríamos un algoritmo más complejo.
const getOptimalTextColor = (bgColor) => {
    const [r, g, b] = hexToRgb(bgColor);
    // Fórmula para percibir brillo (Luma)
    const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // Si la luminancia es baja, usar blanco. Si es alta, usar negro.
    return luma < 0.5 ? '#FFFFFF' : '#000000';
};


export default function ColorOptimizer() {
  const [primaryColor, setPrimaryColor] = useState('#2563EB'); // Color inicial: Azul
  const [secondaryColor, setSecondaryColor] = useState('#E5E7EB'); // Gris claro por defecto
  const [bgColor, setBgColor] = useState('#FFFFFF'); // Blanco por defecto

  // Memoria para el cálculo de la paleta y contraste
  const results = useMemo(() => {
    if (!primaryColor) return null;

    // Colores generados
    const optimalTextColor = getOptimalTextColor(primaryColor);
    const primaryOnBgRatio = getContrastRatio(primaryColor, bgColor);
    const textOnPrimaryRatio = getContrastRatio(optimalTextColor, primaryColor);
    const textOnBgRatio = getContrastRatio('#000000', bgColor); // Contraste de texto principal (negro) sobre fondo

    return {
      primaryColor,
      optimalTextColor,
      bgColor,
      secondaryColor,
      textOnPrimary: checkWCAG(textOnPrimaryRatio),
      primaryOnBg: checkWCAG(primaryOnBgRatio),
      textOnBg: checkWCAG(textOnBgRatio),
      ratios: {
        textOnPrimaryRatio,
        primaryOnBgRatio,
        textOnBgRatio
      }
    };
  }, [primaryColor, bgColor, secondaryColor]); // Recalcular si estos cambian

  return (
    <div className="p-8 border rounded-lg shadow-lg bg-[var(--background-color)]">
      <h2 className="text-2xl font-bold mb-6">Generador de Paleta de Colores Accesible</h2>
      
      {/* 🚨 PASO 1: ENTRADA DE COLOR */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Color Principal (Marca)</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value.toUpperCase())}
            className="w-full h-10 p-1 border rounded"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value.toUpperCase())}
            className="w-full mt-2 p-2 border rounded font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Color de Fondo Base</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value.toUpperCase())}
            className="w-full h-10 p-1 border rounded"
          />
          <input
            type="text"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value.toUpperCase())}
            className="w-full mt-2 p-2 border rounded font-mono text-sm"
          />
        </div>
      </div>

      {/* 🚨 PASO 2: RESULTADOS Y VALIDACIÓN */}
      {results && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Paleta Generada y Contraste</h3>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            {/* Color Primario */}
            <div className="p-4 rounded border" style={{ backgroundColor: results.primaryColor, color: results.optimalTextColor }}>
              <p className="font-semibold" style={{ color: results.optimalTextColor }}>Primario</p>
              <p className="font-mono text-sm">{results.primaryColor}</p>
            </div>
            
            {/* Color de Texto Óptimo */}
            <div className="p-4 rounded border" style={{ backgroundColor: results.optimalTextColor, color: results.primaryColor }}>
              <p className="font-semibold" style={{ color: results.primaryColor }}>Texto Óptimo</p>
              <p className="font-mono text-sm">{results.optimalTextColor}</p>
            </div>
            
            {/* Color de Fondo */}
            <div className="p-4 rounded border" style={{ backgroundColor: results.bgColor, color: '#000000' }}>
              <p className="font-semibold">Fondo</p>
              <p className="font-mono text-sm">{results.bgColor}</p>
            </div>

            {/* Texto General (Negro) */}
            <div className="p-4 rounded border" style={{ backgroundColor: results.bgColor, color: '#000000' }}>
              <p className="font-semibold">Texto General</p>
              <p className="font-mono text-sm">#000000</p>
            </div>
          </div>

          <h4 className="font-semibold mb-3">Verificación de Contraste (WCAG 2.1)</h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Combinación</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ratio</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cumplimiento (Texto Normal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Combinación 1: Texto Óptimo sobre Color Primario */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Texto Óptimo ({results.optimalTextColor}) sobre Primario ({results.primaryColor})</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono">{results.ratios.textOnPrimaryRatio}:1</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <results.textOnPrimary.icon size={18} className={results.textOnPrimary.color} />
                  {results.textOnPrimary.status}
                </td>
              </tr>
              {/* Combinación 2: Texto General sobre Fondo */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Texto General (#000000) sobre Fondo ({results.bgColor})</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono">{results.ratios.textOnBgRatio}:1</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <results.textOnBg.icon size={18} className={results.textOnBg.color} />
                  {results.textOnBg.status}
                </td>
              </tr>
              {/* Combinación 3: Primario sobre Fondo (para botones o elementos grandes) */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Primario ({results.primaryColor}) sobre Fondo ({results.bgColor})</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono">{results.ratios.primaryOnBgRatio}:1</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <results.primaryOnBg.icon size={18} className={results.primaryOnBg.color} />
                  {results.primaryOnBg.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}