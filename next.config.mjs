/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus configuraciones existentes aquí (si las tienes)
  // Por ejemplo: images, redirects, etc.

  experimental: {
    turbopack: false,  // ← Esta línea desactiva Turbopack y usa Webpack
  },
};

export default nextConfig;