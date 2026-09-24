import RecommendedBlogIndex from "@/components/templates/blog/RecommendedBlogIndex";
import { BLOG_COPY, BLOG_LOCALES, articleDates, blogListItems, getBlogArticles, pageDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, localePath, SITE_URL } from "@/lib/seo";
import { serializeStructuredData } from "@/lib/structured-data";
import { withoutDashes } from "@/lib/visibleText";
import { notFound } from "next/navigation";

// Solo los locales con blog se prerenderizan; cualquier otro responde 404 real
// (sin dynamicParams = false, el notFound() salía como soft 404 con status 200).
export function generateStaticParams() {
  return BLOG_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params: { locale } }) {
  const copy = BLOG_COPY[locale];
  if (!copy) return {};

  return pageMetadata({ locale, path: "blog", title: copy.title, description: copy.description });
}

// El índice describe al blog como entidad y enumera sus artículos con las
// mismas fechas que cada BlogPosting, para que el listado sea legible sin JS.
function blogStructuredData(locale, articles) {
  const copy = BLOG_COPY[locale];
  const url = absoluteUrl(localePath(locale, "blog"));
  const organization = `${SITE_URL}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: locale,
        dateModified: pageDate("blog", locale),
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": organization },
        mainEntity: { "@id": `${url}#blog` },
      },
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: copy.title,
        inLanguage: locale,
        publisher: { "@id": organization },
        blogPost: articles.map((article) => {
          const postUrl = absoluteUrl(localePath(locale, `blog/${article.slug}`));
          return {
            "@type": "BlogPosting",
            "@id": postUrl,
            url: postUrl,
            headline: withoutDashes(article.title, locale),
            description: withoutDashes(article.description, locale),
            inLanguage: locale,
            ...articleDates(article, locale),
          };
        }),
      },
    ],
  };
}

export default function BlogPage({ params: { locale } }) {
  const articles = getBlogArticles(locale);
  if (!articles) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(blogStructuredData(locale, articles)) }}
      />
      <RecommendedBlogIndex articles={blogListItems(locale)} locale={locale} />
    </>
  );
}
