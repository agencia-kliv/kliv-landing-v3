import BlogArticle from "@/components/templates/blog/BlogArticle";
import { BLOG_SLUGS, getBlogArticle } from "@/data/blogArticles";
import { absoluteUrl, localePath, NO_INDEX, SITE_URL } from "@/lib/seo";
import { withoutDashes } from "@/lib/visibleText";
import { notFound } from "next/navigation";
import contentDates from "@/data/contentDates.json";
import { serializeStructuredData } from "@/lib/structured-data";
import { BLOG_SEO } from "@/data/blogSeo";
import { extractArticleFaqs } from "@/lib/blogFaq";
import { faqId } from "@/lib/faq";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ locale: "es", slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params: { locale, slug } }) {
  const article = getBlogArticle(slug);
  if (!article || locale !== "es") return NO_INDEX;

  const canonical = localePath("es", `blog/${slug}`);
  const image = absoluteUrl(`/api/blog-cover/${slug}/`);
  const title = withoutDashes(BLOG_SEO[slug]?.title || article.seoTitle);
  const description = withoutDashes(BLOG_SEO[slug]?.description || article.description);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Agencia KLIV",
      locale: "es_ES",
      images: [{ url: image, width: 1200, height: 630, alt: withoutDashes(article.title) }],
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
  const article = getBlogArticle(slug);
  if (!article || locale !== "es") notFound();

  const canonical = absoluteUrl(localePath("es", `blog/${article.slug}`));
  const image = absoluteUrl(`/api/blog-cover/${article.slug}/`);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: withoutDashes(article.title),
    description: withoutDashes(article.description),
    inLanguage: "es",
    image,
    url: canonical,
    ...contentDates.articles[slug],
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
      { "@type": "ListItem", position: 1, name: "Agencia KLIV", item: absoluteUrl("/es/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/es/blog/") },
      { "@type": "ListItem", position: 3, name: withoutDashes(article.title), item: canonical },
    ],
  };

  // Las preguntas frecuentes del cierre de cada artículo, con el mismo texto
  // visible del acordeón y el mismo id de fragmento que usa BlogArticle.
  const faqs = extractArticleFaqs(article.content);
  const faqPage = faqs.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    inLanguage: "es",
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
      <BlogArticle article={article} />
    </>
  );
}
