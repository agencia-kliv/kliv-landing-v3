import RecommendedBlogIndex from "@/components/templates/blog/RecommendedBlogIndex";
import { BLOG_LOCALES, getBlogArticles } from "@/lib/blog";
import { notFound } from "next/navigation";

// Solo los locales con blog se prerenderizan; cualquier otro responde 404 real
// (sin dynamicParams = false, el notFound() salía como soft 404 con status 200).
export function generateStaticParams() {
  return BLOG_LOCALES.map((locale) => ({ locale }));
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
  const articles = getBlogArticles(locale);
  if (!articles) notFound();

  return <RecommendedBlogIndex articles={articles} locale={locale} />;
}
