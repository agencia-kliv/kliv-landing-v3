import CaseStudiesIndex from "@/components/templates/caseStudies/CaseStudiesIndex";
import ResourceArticle from "@/components/templates/resources/ResourceArticle";
import { RESOURCE_SLUGS } from "@/data/resources";
import { caseStudiesAlternates, caseStudiesLocaleFor, caseStudiesPath, caseStudyPath, getCaseStudies } from "@/lib/caseStudies";
import { pageDate } from "@/lib/contentDates";
import { getMessages, pageMetadata } from "@/lib/metadata";
import { absoluteUrl, localePath, NO_INDEX, SITE_URL } from "@/lib/seo";
import { serializeStructuredData } from "@/lib/structured-data";
import { notFound } from "next/navigation";

const TITLES = {
  "claves-alto-performance": "Claves para el alto performance",
  "marcas-con-alma": "Marcas con alma",
  "claves-web": "Claves para una web que convierte",
  "claves-whatsapp": "Claves para vender por WhatsApp",
};

// Casos de éxito: el slug del índice es propio de cada idioma
// (/es/casos-de-exito/, /en/case-studies/), así que el de otro idioma responde 404 real.
const isCaseStudies = (locale, resource) => caseStudiesPath(locale) === resource;

export async function generateMetadata({ params: { locale, resource } }) {
  if (isCaseStudies(locale, resource)) {
    const content = getCaseStudies(locale);
    const messages = await getMessages(locale);
    const siteName = locale === "en" ? "KLIV Agency" : "Agencia KLIV";
    const title = `${messages.caseStudies.title} | ${siteName}`;
    const alternates = caseStudiesAlternates(locale);
    return {
      metadataBase: new URL(SITE_URL),
      title,
      description: content.description,
      alternates,
      openGraph: {
        title,
        description: content.description,
        type: "website",
        url: alternates.canonical,
        siteName,
        locale: locale === "en" ? "en_US" : "es_ES",
        images: [{ url: `${SITE_URL}/kliv-isotipo-green.png`, width: 1241, height: 1241, alt: siteName }],
      },
    };
  }
  if (caseStudiesLocaleFor(resource)) return NO_INDEX;
  if (!RESOURCE_SLUGS.includes(resource)) return {};
  const ready = locale === "es" && resource === "claves-alto-performance";
  return pageMetadata({
    locale,
    path: resource,
    title: TITLES[resource],
    description: "Ideas y aprendizajes de KLIV para mejorar el rendimiento de tu publicidad.",
    noIndex: !ready,
  });
}

// CollectionPage + breadcrumb + lista de casos, con el mismo texto visible;
// sin ratings ni cifras que no estén en el documento del cliente.
function caseStudiesStructuredData(locale, content, messages) {
  const url = absoluteUrl(localePath(locale, caseStudiesPath(locale)));
  const organization = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: content.title,
        description: content.description,
        inLanguage: locale,
        dateModified: pageDate(caseStudiesPath("es"), locale),
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": organization },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#cases` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: messages.caseStudies.home, item: absoluteUrl(localePath(locale)) },
          { "@type": "ListItem", position: 2, name: messages.caseStudies.title, item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#cases`,
        itemListElement: content.cases.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: absoluteUrl(localePath(locale, caseStudyPath(locale, item.id))),
        })),
      },
    ],
  };
}

export default async function ResourcePage({ params: { locale, resource } }) {
  if (isCaseStudies(locale, resource)) {
    const content = getCaseStudies(locale);
    const messages = await getMessages(locale);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(caseStudiesStructuredData(locale, content, messages)) }}
        />
        <CaseStudiesIndex content={content} labels={messages.caseStudies} basePath={`/${caseStudiesPath(locale)}/`} />
      </>
    );
  }
  if (!RESOURCE_SLUGS.includes(resource)) notFound();
  return <ResourceArticle locale={locale} resource={resource} />;
}
