// src/app/contacto/page.js

// Importaciones (si tienes alguna)
// import React from 'react'; // No es necesario en Next.js moderno, pero no hace daño

export default function ContactoPage() { // <-- DEBE SER UNA FUNCIÓN NORMAL DE JAVASCRIPT
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Contáctanos</h1>
      <p className="text-center">Aquí iría tu formulario de contacto o información.</p>
    </div>
  );
}

// O, si usas una función de flecha, también debe ser exportada por defecto:
/*
const ContactoPage = () => {
  return (
    // ...
  );
};
export default ContactoPage;
*/