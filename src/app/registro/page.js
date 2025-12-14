// src/app/registro/page.js

// 1. Importa el componente de formulario que ya creaste.
import RegisterForm from '../components/RegisterForm'; 
// Asegúrate de que la ruta '../components/RegisterForm' sea correcta
// Si RegisterForm está un nivel más arriba (ej: en la raíz de src/components/), ajusta la ruta.

export default function RegisterPage() { // <-- Sintaxis de Exportación Correcta
  return (
    <div className="container mx-auto py-12 flex justify-center items-center min-h-[80vh]">
      {/* 2. Llama al componente de formulario */}
      <RegisterForm />
    </div>
  );
}