import BlogArticle from "@/components/templates/blog/BlogArticle";
import { BLOG_COPY, BLOG_LOCALES, articleDates, articlePaths, blogSeoFor, getBlogArticle, getBlogSlugs } from "@/lib/blog";
import { absoluteUrl, DEFAULT_LOCALE, localePath, NO_INDEX, SITE_URL } from "@/lib/seo";
import { withoutDashes } from "@/lib/visibleText";
import { notFound } from "next/navigation";
import { serializeStructuredData } from "@/lib/structured-data";
import { extractArticleFaqs } from "@/lib/blogFaq";
import { faqId } from "@/lib/faq";

// Cada idioma tiene sus propios slugs; cualquier otra combinación responde 404 real.
export function generateStaticParams() {
  return BLOG_LOCALES.flatMap((locale) => getBlogSlugs(locale).map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

// Portada social por idioma: el texto de la imagen sale del artículo en ese locale.
const coverUrl = (slug, locale) => absoluteUrl(`/api/blog-cover/${slug}/${locale === "es" ? "" : `?locale=${locale}`}`);

// canonical + hreflang con el slug de cada idioma (no comparten slug).
function articleAlternates(article, locale) {
  const paths = articlePaths(article);
  return {
    canonical: localePath(locale, paths[locale]),
    languages: {
      ...Object.fromEntries(Object.entries(paths).map(([lang, path]) => [lang, localePath(lang, path)])),
      "x-default": localePath(DEFAULT_LOCALE, paths[DEFAULT_LOCALE]),
    },
  };
}

export function generateMetadata({ params: { locale, slug } }) {
  const article = getBlogArticle(slug, locale);
  if (!article) return NO_INDEX;

  const copy = BLOG_COPY[locale];
  const seo = blogSeoFor(slug, locale);
  const alternates = articleAlternates(article, locale);
  const image = coverUrl(slug, locale);
  const title = withoutDashes(seo.title || article.seoTitle, locale);
  const description = withoutDashes(seo.description || article.description, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      url: alternates.canonical,
      siteName: copy.siteName,
      locale: copy.ogLocale,
      images: [{ url: image, width: 1200, height: 630, alt: withoutDashes(article.title, locale) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function BlogArticlePage({ params: { locale, slug } }) {
  const article = getBlogArticle(slug, locale);
  if (!article) notFound();

  const copy = BLOG_COPY[locale];
  const canonical = absoluteUrl(localePath(locale, `blog/${article.slug}`));
  const image = coverUrl(slug, locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: withoutDashes(article.title, locale),
    description: withoutDashes(article.description, locale),
    inLanguage: locale,
    image,
    url: canonical,
    ...articleDates(article, locale),
    author: { "@type": "Organization", name: "Agencia KLIV", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Agencia KLIV",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/kliv-isotipo-green.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Agencia KLIV", item: absoluteUrl(localePath(locale)) },
      { "@type": "ListItem", position: 2, name: copy.blog, item: absoluteUrl(localePath(locale, "blog")) },
      { "@type": "ListItem", position: 3, name: withoutDashes(article.title, locale), item: canonical },
    ],
  };

  // Las preguntas frecuentes del cierre de cada artículo, con el mismo texto
  // visible del acordeón y el mismo id de fragmento que usa BlogArticle.
  const faqs = extractArticleFaqs(article.content, locale);
  const faqPage = faqs.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    inLanguage: locale,
    isPartOf: { "@id": canonical },
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      "@id": `${canonical}#${faqId(question)}`,
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbs) }} />
      {faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqPage) }} />
      )}
      <BlogArticle article={article} locale={locale} />
    </>
  );
}
