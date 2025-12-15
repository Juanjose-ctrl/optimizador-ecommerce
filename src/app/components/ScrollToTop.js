'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Importación clave del App Router

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 🚨 El cambio de ruta (pathname) dispara el efecto
    window.scrollTo(0, 0); 
    // Puedes usar también: window.scroll({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null; // Este componente no renderiza nada, solo maneja el efecto secundario
}
