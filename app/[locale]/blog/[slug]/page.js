import BlogArticle from "@/components/templates/blog/BlogArticle";
import { BLOG_SLUGS, getBlogArticle } from "@/data/blogArticles";
import { absoluteUrl, localePath, NO_INDEX, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params: { locale, slug } }) {
  const article = getBlogArticle(slug);
  if (!article || locale !== "es") return NO_INDEX;

  const canonical = localePath("es", `blog/${slug}`);
  const image = absoluteUrl(`/api/blog-cover/${slug}/`);
  const title = `${article.seoTitle} | Agencia KLIV`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: article.description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: article.description,
      type: "article",
      url: canonical,
      siteName: "Agencia KLIV",
      locale: "es_ES",
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
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
    headline: article.title,
    description: article.description,
    inLanguage: "es",
    image,
    url: canonical,
    author: { "@type": "Organization", name: "Agencia KLIV", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Agencia KLIV",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/kliv-isotipo-green.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogArticle article={article} />
    </>
  );
}
