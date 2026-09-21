import RecommendedBlogIndex from "@/components/templates/blog/RecommendedBlogIndex";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import { notFound } from "next/navigation";

// El blog solo existe en español. Sin esto, /en/blog/ se prerenderizaba
// como página estática y el notFound() del componente salía con status 200
// (soft 404). Con dynamicParams = false, Next responde 404 real.
export function generateStaticParams() {
  return [{ locale: "es" }];
}

export const dynamicParams = false;

export function generateMetadata() {
  return {
    title: "Preview · Blog KLIV",
    description: "Propuesta visual alternativa para el ecosistema editorial de KLIV.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function RecommendedBlogPage({ params: { locale } }) {
  if (locale !== "es") notFound();

  return <RecommendedBlogIndex articles={BLOG_ARTICLES} />;
}
