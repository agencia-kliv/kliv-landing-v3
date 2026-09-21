import RecommendedBlogIndex from "@/components/templates/blog/RecommendedBlogIndex";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, localePath, SITE_URL } from "@/lib/seo";
import { serializeStructuredData } from "@/lib/structured-data";
import { withoutDashes } from "@/lib/visibleText";
import contentDates from "@/data/contentDates.json";
import { notFound } from "next/navigation";

// El blog solo existe en español. Sin esto, /en/blog/ se prerenderizaba
// como página estática y el notFound() del componente salía con status 200
// (soft 404). Con dynamicParams = false, Next responde 404 real.
export function generateStaticParams() {
  return [{ locale: "es" }];
}

export const dynamicParams = false;

const TITLE = "Blog de Performance Marketing";
const DESCRIPTION =
  "Ideas, estrategias y aprendizajes de Agencia KLIV para mejorar el rendimiento de tu publicidad y tomar mejores decisiones de negocio.";

export function generateMetadata({ params: { locale } }) {
  if (locale !== "es") return {};

  const metadata = pageMetadata({ locale, path: "blog", title: TITLE, description: DESCRIPTION });

  return {
    ...metadata,
    alternates: { canonical: metadata.alternates.canonical },
  };
}

// El índice describe al blog como entidad y enumera sus artículos con las
// mismas fechas que cada BlogPosting, para que el listado sea legible sin JS.
function blogStructuredData() {
  const url = absoluteUrl(localePath("es", "blog"));
  const organization = `${SITE_URL}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "es",
        dateModified: contentDates.pages.blog,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": organization },
        mainEntity: { "@id": `${url}#blog` },
      },
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: TITLE,
        inLanguage: "es",
        publisher: { "@id": organization },
        blogPost: BLOG_ARTICLES.map((article) => {
          const postUrl = absoluteUrl(localePath("es", `blog/${article.slug}`));
          return {
            "@type": "BlogPosting",
            "@id": postUrl,
            url: postUrl,
            headline: withoutDashes(article.title),
            description: withoutDashes(article.description),
            inLanguage: "es",
            ...contentDates.articles[article.slug],
          };
        }),
      },
    ],
  };
}

export default function BlogPage({ params: { locale } }) {
  if (locale !== "es") notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(blogStructuredData()) }}
      />
      <RecommendedBlogIndex articles={BLOG_ARTICLES} />
    </>
  );
}
