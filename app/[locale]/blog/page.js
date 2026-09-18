import RecommendedBlogIndex from "@/components/templates/blog/RecommendedBlogIndex";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateMetadata({ params: { locale } }) {
  if (locale !== "es") return {};

  const metadata = pageMetadata({
    locale,
    path: "blog",
    title: "Blog de Performance Marketing",
    description:
      "Ideas, estrategias y aprendizajes de Agencia KLIV para mejorar el rendimiento de tu publicidad y tomar mejores decisiones de negocio.",
  });

  return {
    ...metadata,
    alternates: { canonical: metadata.alternates.canonical },
  };
}

export default function BlogPage({ params: { locale } }) {
  if (locale !== "es") notFound();

  return <RecommendedBlogIndex articles={BLOG_ARTICLES} />;
}
