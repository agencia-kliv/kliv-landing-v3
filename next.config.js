const clientPortals = require("./data/clientPortals.json");

// /cliente/<Nombre>/ lleva al portal de cada cliente. Para sumar uno, basta
// con agregarlo en data/clientPortals.json. Se acepta el nombre tal cual y
// en minúsculas. 307 para poder cambiar el destino sin caché en navegadores.
const clientPortalRedirects = Object.entries(clientPortals).flatMap(([slug, { url }]) =>
  [...new Set([slug, slug.toLowerCase()])].map((name) => ({
    source: `/cliente/${name}`,
    destination: url,
    permanent: false,
  }))
);

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
  // Todo lo de /public se servía con `max-age=0, must-revalidate`: el video del
  // hero (613 KB) y los posters se volvían a descargar en cada visita, incluso
  // desde el mismo teléfono. Los assets de /_next ya vienen con caché propia de
  // Next y no se tocan acá (los patrones no cruzan barras, salvo el de las
  // carpetas de /public). Treinta días de frescura y, vencido eso, se sigue
  // sirviendo el archivo guardado mientras se revalida en segundo plano.
  // Los archivos de /public no llevan hash en el nombre: si se reemplaza uno y
  // tiene que verse al instante, hay que renombrarlo.
  async headers() {
    const cache = [
      {
        key: "Cache-Control",
        value: "public, max-age=2592000, stale-while-revalidate=31536000",
      },
    ];

    return [
      { source: "/:file([^/]+\\.(?:webm|mp4|jpg|jpeg|png|webp|avif|svg|ico))", headers: cache },
      {
        source: "/:dir(blog|icons|illustrations|images|logos|partners|shapes|teamPhotos|testimonials|videos)/:path*",
        headers: cache,
      },
    ];
  },

  async redirects() {
    return [
      { source: "/", has: [{ type: "host", value: "www.agenciakliv.com" }], destination: "https://agenciakliv.com/es/", permanent: true },
      { source: "/:path(.*\\..+)", has: [{ type: "host", value: "www.agenciakliv.com" }], destination: "https://agenciakliv.com/:path", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.agenciakliv.com" }], destination: "https://agenciakliv.com/:path*/", permanent: true },
      { source: "/", destination: "/es/", permanent: false },
      { source: "/quiz", destination: "/es/quiz/", permanent: false },
      // El documento legal tiene slug propio por idioma (data/legalSlugs.js).
      { source: "/en/politicas-de-privacidad", destination: "/en/privacy-policy/", permanent: true },
      { source: "/es/privacy-policy", destination: "/es/politicas-de-privacidad/", permanent: true },
      ...clientPortalRedirects,
    ];
  },
};

module.exports = nextConfig;
