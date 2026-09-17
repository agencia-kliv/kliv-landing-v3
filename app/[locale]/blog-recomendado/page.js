import RecommendedBlogIndex from "@/components/templates/blog/RecommendedBlogIndex";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import { notFound } from "next/navigation";

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
