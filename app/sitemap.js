import { absoluteUrl, localePath, LOCALES } from "@/lib/seo";
import { BLOG_LOCALES, articleDates, getBlogArticles, pageDate } from "@/lib/blog";

// Rutas públicas, sin el prefijo de locale. Se excluyen panel y thank-you.
const ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "quiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "book-a-call", changeFrequency: "monthly", priority: 0.8 },
  { path: "politicas-de-privacidad", changeFrequency: "yearly", priority: 0.3, locales: ["es"] },
  { path: "claves-alto-performance", changeFrequency: "monthly", priority: 0.7, locales: ["es"] },
  { path: "blog", changeFrequency: "weekly", priority: 0.8, locales: BLOG_LOCALES },
];

// Los artículos tienen un slug por idioma, así que se listan desde cada dataset.
const articleRoutes = (locale) =>
  (getBlogArticles(locale) || []).map((article) => ({
    url: absoluteUrl(localePath(locale, `blog/${article.slug}`)),
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: articleDates(article, locale)?.dateModified,
  }));

export default function sitemap() {
  return LOCALES.flatMap((locale) => [
    ...ROUTES.filter(({ locales }) => !locales || locales.includes(locale)).map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency,
      priority,
      lastModified: pageDate(path, locale),
    })),
    ...articleRoutes(locale),
  ]);
}
