/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.agenciakliv.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize production builds
  swcMinify: true,
  poweredByHeader: false,

  // Antes / y /quiz eran páginas que llamaban a redirect() en el cliente:
  // devolvían 200 con un shell vacío y recién saltaban al hidratar. Un
  // crawler sin JS veía la home del dominio en blanco. Acá el salto ocurre
  // en el routing, antes de renderizar nada.
  //
  // 307 y no 308 a propósito: si más adelante se agrega detección de idioma
  // por Accept-Language, un permanente ya cacheado en cada navegador sería
  // muy difícil de revertir. El canonical ya consolida las señales.
  async redirects() {
    return [
      { source: "/", destination: "/es/", permanent: false },
      { source: "/quiz", destination: "/es/quiz/", permanent: false },
      // El documento legal solo existe en español.
      { source: "/en/politicas-de-privacidad", destination: "/es/politicas-de-privacidad/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
