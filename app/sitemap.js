import { absoluteUrl, localePath, LOCALES } from "@/lib/seo";
import { BLOG_LOCALES, BLOG_SLUGS, articleDates, pageDate } from "@/lib/blog";

// Rutas públicas, sin el prefijo de locale. Se excluyen panel y thank-you.
const ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "quiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "book-a-call", changeFrequency: "monthly", priority: 0.8 },
  { path: "politicas-de-privacidad", changeFrequency: "yearly", priority: 0.3, locales: ["es"] },
  { path: "claves-alto-performance", changeFrequency: "monthly", priority: 0.7, locales: ["es"] },
  { path: "blog", changeFrequency: "weekly", priority: 0.8, locales: BLOG_LOCALES },
  ...BLOG_SLUGS.map((slug) => ({ path: `blog/${slug}`, changeFrequency: "monthly", priority: 0.8, locales: BLOG_LOCALES })),
];

export default function sitemap() {
  return LOCALES.flatMap((locale) =>
    ROUTES.filter(({ locales }) => !locales || locales.includes(locale)).map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency,
      priority,
      lastModified: path.startsWith("blog/")
        ? articleDates(path.slice(5), locale)?.dateModified
        : pageDate(path, locale),
    }))
  );
}
