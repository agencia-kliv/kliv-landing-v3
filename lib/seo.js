// Configuración SEO compartida.
//
// SITE_URL es la única fuente de verdad del dominio canónico. Hoy
// www.agenciakliv.com responde 308 hacia el apex, así que el apex es el
// canónico. Si en Vercel se invierte el redirect, cambiar solo esta línea.
export const SITE_URL = "https://agenciakliv.com";

export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

// next.config.js tiene trailingSlash: true, así que todas las URLs que
// publicamos (canonical, hreflang, sitemap) tienen que terminar en "/".
export const localePath = (locale, path = "") => {
  const clean = path.replace(/^\/|\/$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
};

export const absoluteUrl = (path) => `${SITE_URL}${path}`;

/**
 * Bloque `alternates` de Next: canonical + hreflang para ambos idiomas.
 * @param {string} locale locale de la página actual
 * @param {string} path ruta sin locale, ej. "book-a-call"
 */
export const alternatesFor = (locale, path = "") => ({
  canonical: localePath(locale, path),
  languages: {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(DEFAULT_LOCALE, path),
  },
});

/**
 * Igual que alternatesFor, para páginas con slug propio en cada idioma.
 * @param {string} locale locale de la página actual
 * @param {Record<string, string>} paths ruta sin locale por idioma
 */
export const localizedAlternates = (locale, paths) => ({
  canonical: localePath(locale, paths[locale]),
  languages: {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, paths[l])])),
    "x-default": localePath(DEFAULT_LOCALE, paths[DEFAULT_LOCALE]),
  },
});

// Páginas que no aportan nada en resultados de búsqueda y no deben indexarse.
export const NO_INDEX = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
