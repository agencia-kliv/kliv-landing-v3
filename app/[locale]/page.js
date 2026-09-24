import LandingPage from "@/components/pages/LandingPage";
import HashAnchorScroll from "@/components/organisms/HashAnchorScroll";
import HomeTracking from "@/components/organisms/HomeTracking";
import { blogListItems } from "@/lib/blog";
import { getMessages } from "@/lib/metadata";
import { homeStructuredData, serializeStructuredData } from "@/lib/structured-data";

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

export default async function Home({ params: { locale } }) {
  const messages = await getMessages(locale);
  const fallbackItems = BLOG_FALLBACK_ITEMS[locale] || BLOG_FALLBACK_ITEMS.es;
  // Slug y minutos de lectura por artículo (clave: slug español). La sección de
  // artículos es un componente cliente: calcularlo acá evita que los textos
  // completos del blog viajen en su JS.
  const blogArticles = Object.fromEntries(
    blogListItems(locale).map(({ key, slug, minutes }) => [key, { slug, minutes }])
  );
  return (
    <>
      <script
        id="kliv-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(homeStructuredData(locale, messages)),
        }}
      />
      <LandingPage blogArticles={blogArticles} />
      <HashAnchorScroll />
      <nav className="sr-only" aria-label={messages.resources.title} data-section="blog-index-fallback">
        <h2>{messages.resources.title}</h2>
        <ul>
          {fallbackItems.map(([key, path]) => (
            <li key={path}>
              <a href={`/${locale}/${path}/`}>{messages.resources.items[key].title}</a>
            </li>
          ))}
        </ul>
      </nav>
      {/* <WhatsappCTA /> */}
      <HomeTracking />
    </>
  );
}
