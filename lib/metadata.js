import { alternatesFor, LOCALES, NO_INDEX, SITE_URL } from "./seo";
import { notFound } from "next/navigation";

export async function getMessages(locale) {
  if (!LOCALES.includes(locale)) notFound();
  return (await import(`../messages/${locale}.json`)).default;
}

/**
 * Metadata de una página interna. Todo el copy sale de messages/*.json,
 * así que no hay textos en español clavados en las páginas en inglés.
 *
 * @param {object} o
 * @param {string} o.locale
 * @param {string} o.path ruta sin locale, ej. "book-a-call"
 * @param {string} o.title
 * @param {string} o.description
 * @param {boolean} [o.noIndex] páginas de embudo o privadas: self-canonical
 *   y sin hreflang, porque no queremos que compitan en resultados.
 */
export function pageMetadata({ locale, path, title, description, noIndex = false }) {
  const alternates = alternatesFor(locale, path);
  const siteName = locale === "en" ? "KLIV Agency" : "Agencia KLIV";

  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} | ${siteName}`,
    description,
    // Sin un alternates propio, estas páginas heredarían el del layout de
    // locale y quedarían con canonical apuntando al home. Self-canonical y
    // sin hreflang: no queremos cruzarlas entre idiomas.
    ...(noIndex
      ? { ...NO_INDEX, alternates: { canonical: alternates.canonical } }
      : {
          alternates,
          openGraph: {
            title: `${title} | ${siteName}`,
            description,
            type: "website",
            url: alternates.canonical,
            siteName,
            locale: locale === "en" ? "en_US" : "es_ES",
            images: [{ url: `${SITE_URL}/kliv-isotipo-green.png`, width: 1241, height: 1241, alt: siteName }],
          },
        }),
  };
}
