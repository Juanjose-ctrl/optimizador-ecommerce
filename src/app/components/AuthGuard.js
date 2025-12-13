// src/components/AuthGuard.js

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Este componente envuelve las rutas privadas (como /dashboard)
export default function AuthGuard({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Ejecutamos la verificación solo en el lado del cliente (después del montaje)
        const checkAuth = () => {
            const accessToken = localStorage.getItem('accessToken');
            const apiKey = localStorage.getItem('apiKey');

            if (accessToken && apiKey) {
                // Si encontramos ambos tokens, la sesión es válida (por ahora)
                setIsAuthenticated(true);
            } else {
                // Si falta alguno, la sesión no es válida
                console.log("No se encontraron tokens de sesión. Redirigiendo a /");
                // Borrar cualquier residuo por si acaso
                localStorage.removeItem('accessToken');
                localStorage.removeItem('apiKey');
                
                // Redirigir a la página pública
                router.replace('/'); 
            }
        };

        checkAuth();
    }, [router]);

    // Mostrar el contenido solo si está autenticado
    // Si no está autenticado, el router.replace() se encarga de la redirección.
    if (!isAuthenticated) {
        // Puedes mostrar un spinner o un mensaje mientras se verifica
        return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando sesión...</div>;
    }

    return children;
}