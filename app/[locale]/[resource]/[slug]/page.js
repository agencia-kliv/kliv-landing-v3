import CaseStudyPage from "@/components/templates/caseStudies/CaseStudyPage";
import { CASE_STUDIES_LOCALES, caseSlug, caseStudiesAlternates, caseStudiesPath, caseStudyHrefs, caseStudyPath, getCaseStudies, getCaseStudy } from "@/lib/caseStudies";
import { pageDate } from "@/lib/contentDates";
import { getMessages } from "@/lib/metadata";
import { absoluteUrl, localePath, SITE_URL } from "@/lib/seo";
import { serializeStructuredData } from "@/lib/structured-data";
import { notFound } from "next/navigation";

// Página de cada caso de éxito: /<locale>/<índice del idioma>/<slug del idioma>/.
// Solo se prerenderizan los idiomas con contenido; cualquier otra combinación
// (otro slug, el slug de otro idioma, otro `resource`) responde 404 real.
export function generateStaticParams() {
  return CASE_STUDIES_LOCALES.flatMap((locale) =>
    getCaseStudies(locale).cases.map((item) => ({ locale, resource: caseStudiesPath(locale), slug: caseSlug(locale, item.id) }))
  );
}

export const dynamicParams = false;

const load = (locale, resource, slug) => (caseStudiesPath(locale) === resource ? getCaseStudy(locale, slug) : null);

export async function generateMetadata({ params: { locale, resource, slug } }) {
  const item = load(locale, resource, slug);
  if (!item) return {};
  const messages = await getMessages(locale);
  const siteName = locale === "en" ? "KLIV Agency" : "Agencia KLIV";
  const title = `${item.name} | ${messages.caseStudies.title} KLIV`;
  const alternates = caseStudiesAlternates(locale, item.id);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: item.summary,
    alternates,
    openGraph: {
      title,
      description: item.summary,
      type: "article",
      url: alternates.canonical,
      siteName,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [{ url: `${SITE_URL}/kliv-isotipo-green.png`, width: 1241, height: 1241, alt: siteName }],
    },
  };
}

// WebPage + breadcrumb de tres niveles. Sin ratings ni cifras fuera del documento.
function caseStudyStructuredData(locale, item, messages) {
  const indexUrl = absoluteUrl(localePath(locale, caseStudiesPath(locale)));
  const url = absoluteUrl(localePath(locale, caseStudyPath(locale, item.id)));
  const organization = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: item.name,
        description: item.summary,
        inLanguage: locale,
        dateModified: pageDate(caseStudiesPath("es"), locale),
        isPartOf: { "@id": `${indexUrl}#webpage` },
        about: { "@id": organization },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: messages.caseStudies.home, item: absoluteUrl(localePath(locale)) },
          { "@type": "ListItem", position: 2, name: messages.caseStudies.title, item: indexUrl },
          { "@type": "ListItem", position: 3, name: item.name, item: url },
        ],
      },
    ],
  };
}

export default async function CaseStudyRoute({ params: { locale, resource, slug } }) {
  const item = load(locale, resource, slug);
  if (!item) notFound();
  const content = getCaseStudies(locale);
  const messages = await getMessages(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(caseStudyStructuredData(locale, item, messages)) }}
      />
      <CaseStudyPage
        content={content}
        item={item}
        labels={messages.caseStudies}
        basePath={`/${caseStudiesPath(locale)}/`}
        hrefs={caseStudyHrefs(locale)}
      />
    </>
  );
}
