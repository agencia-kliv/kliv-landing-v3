import { SITE_URL } from "@/lib/seo";

// Reemplaza al robots.txt inexistente (hasta ahora el dominio devolvía 404).
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Permitir el rastreo para que los buscadores lean noindex en
        // thank-you y el estado 404 del panel retirado.
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
