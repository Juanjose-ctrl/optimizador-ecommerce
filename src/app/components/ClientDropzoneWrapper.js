// src/app/components/ClientDropzoneWrapper.js

'use client'; // ¡CRÍTICO!

import FileDropzone from './FileDropzone'; 

// Este componente solo existe para asegurar que FileDropzone y su lógica 
// (handleDrag, handleDrop, etc.) solo se carguen y ejecuten en el cliente.
export default function ClientDropzoneWrapper(props) {
    // Asegúrate de pasar TODAS las props que necesita FileDropzone
    return <FileDropzone {...props} />;
}