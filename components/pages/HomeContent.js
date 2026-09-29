import LandingPage from "@/components/pages/LandingPage";
import HashAnchorScroll from "@/components/organisms/HashAnchorScroll";
import HomeTracking from "@/components/organisms/HomeTracking";
import { blogListItems } from "@/lib/blog";
import { homeStructuredData, serializeStructuredData } from "@/lib/structured-data";
import { NextIntlClientProvider } from "next-intl";

const BLOG_FALLBACK_ITEMS = {
  es: [
    ["performanceMarketing", "blog/que-es-performance-marketing-guia-completa"],
    ["ecommerce", "blog/performance-marketing-ecommerce"],
    ["services", "blog/performance-marketing-empresas-de-servicios"],
  ],
  en: [
    ["highPerformance", "claves-alto-performance"],
    ["soulfulBrands", "marcas-con-alma"],
    ["convertingWebsite", "claves-web"],
  ],
};

/**
 * Cuerpo de la home, compartido con las landings de servicio (lib/landings.js).
 *
 * @param {object} o
 * @param {string} o.locale
 * @param {object} o.messages mensajes del sitio, o los de la landing ya combinados
 * @param {string} [o.path] ruta sin locale de la landing, ej. "metaads"
 * @param {string[]} [o.platforms] plataformas a mostrar, ej. ["meta"]
 * @param {boolean} [o.overrideMessages] true en las landings: el provider
 *   anidado pisa el copy del layout solo dentro de <main>; Header y Footer
 *   siguen usando el copy general del sitio.
 */
export default function HomeContent({ locale, messages, path, platforms, overrideMessages = false }) {
  const fallbackItems = BLOG_FALLBACK_ITEMS[locale] || BLOG_FALLBACK_ITEMS.es;
  // Slug y minutos de lectura por artículo (clave: slug español). La sección de
  // artículos es un componente cliente: calcularlo acá evita que los textos
  // completos del blog viajen en su JS.
  const blogArticles = Object.fromEntries(
    blogListItems(locale).map(({ key, slug, minutes }) => [key, { slug, minutes }])
  );
  const landing = <LandingPage blogArticles={blogArticles} platforms={platforms} />;
  return (
    <>
      <script
        id="kliv-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(homeStructuredData(locale, messages, { path, platforms })),
        }}
      />
      {overrideMessages ? (
        <NextIntlClientProvider locale={locale} messages={messages}>
          {landing}
        </NextIntlClientProvider>
      ) : (
        landing
      )}
      <HashAnchorScroll />
      <nav className="sr-only" aria-label={messages.resources.title} data-section="blog-index-fallback">
        <h2>{messages.resources.title}</h2>
        <ul>
          {fallbackItems.map(([key, href]) => (
            <li key={href}>
              <a href={`/${locale}/${href}/`}>{messages.resources.items[key].title}</a>
            </li>
          ))}
        </ul>
      </nav>
      {/* <WhatsappCTA /> */}
      <HomeTracking />
    </>
  );
}
