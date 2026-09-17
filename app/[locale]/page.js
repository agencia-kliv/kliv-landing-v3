import LandingPage from "@/components/pages/LandingPage";
import HashAnchorScroll from "@/components/organisms/HashAnchorScroll";
import HomeTracking from "@/components/organisms/HomeTracking";
import { getMessages } from "@/lib/metadata";
import { homeStructuredData, serializeStructuredData } from "@/lib/structured-data";

const BLOG_FALLBACK_ITEMS = {
  es: [
    ["performanceMarketing", "blog/que-es-performance-marketing-guia-completa"],
    ["ecommerce", "blog/performance-marketing-ecommerce"],
    ["services", "blog/performance-marketing-empresas-de-servicios"],
    ["digitalProducts", "blog/performance-marketing-productos-digitales"],
    ["metrics", "blog/roas-mer-cac-que-metrica-mirar"],
    ["cacReduction", "blog/como-bajar-el-cac-sin-frenar-la-adquisicion"],
    ["channelChoice", "blog/meta-ads-vs-google-ads-donde-invertir"],
    ["adBudget", "blog/cuanto-invertir-en-publicidad-digital"],
    ["leadQuality", "blog/leads-baratos-vs-leads-rentables"],
    ["agencyChoice", "blog/cuando-contratar-una-agencia-de-performance-marketing"],
  ],
  en: [
    ["highPerformance", "claves-alto-performance"],
    ["soulfulBrands", "marcas-con-alma"],
    ["convertingWebsite", "claves-web"],
    ["whatsappSales", "claves-whatsapp"],
  ],
};

export default async function Home({ params: { locale } }) {
  const messages = await getMessages(locale);
  const fallbackItems = BLOG_FALLBACK_ITEMS[locale] || BLOG_FALLBACK_ITEMS.es;
  return (
    <>
      <script
        id="kliv-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(homeStructuredData(locale, messages)),
        }}
      />
      <LandingPage />
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
