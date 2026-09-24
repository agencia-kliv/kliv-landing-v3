import { absoluteUrl, localePath, LOCALES } from "@/lib/seo";
import { BLOG_LOCALES, articleDates, getBlogArticles, pageDate } from "@/lib/blog";
import { LEGAL_PATHS } from "@/data/legalSlugs";
import { CASE_STUDIES_LOCALES, CASE_STUDIES_PATHS, caseStudyPath, getCaseStudies } from "@/lib/caseStudies";

// Rutas públicas, sin el prefijo de locale. Se excluyen panel y thank-you.
const ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "quiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "book-a-call", changeFrequency: "monthly", priority: 0.8 },
  { path: LEGAL_PATHS, dateKey: LEGAL_PATHS.es, changeFrequency: "yearly", priority: 0.3 },
  { path: "claves-alto-performance", changeFrequency: "monthly", priority: 0.7, locales: ["es"] },
  { path: "blog", changeFrequency: "weekly", priority: 0.8, locales: BLOG_LOCALES },
  // Slug propio por idioma; la fecha se guarda bajo el slug español.
  { path: CASE_STUDIES_PATHS, dateKey: CASE_STUDIES_PATHS.es, changeFrequency: "monthly", priority: 0.8, locales: CASE_STUDIES_LOCALES },
];

const routePath = (path, locale) => (typeof path === "string" ? path : path[locale]);

// Los artículos tienen un slug por idioma, así que se listan desde cada dataset.
const articleRoutes = (locale) =>
  (getBlogArticles(locale) || []).map((article) => ({
    url: absoluteUrl(localePath(locale, `blog/${article.slug}`)),
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: articleDates(article, locale)?.dateModified,
  }));

// Una página por caso, bajo el índice de su idioma; misma fecha que el índice.
const caseStudyRoutes = (locale) =>
  CASE_STUDIES_LOCALES.includes(locale)
    ? getCaseStudies(locale).cases.map((item) => ({
        url: absoluteUrl(localePath(locale, caseStudyPath(locale, item.id))),
        changeFrequency: "monthly",
        priority: 0.7,
        lastModified: pageDate(CASE_STUDIES_PATHS.es, locale),
      }))
    : [];

export default function sitemap() {
  return LOCALES.flatMap((locale) => [
    ...ROUTES.filter(({ locales }) => !locales || locales.includes(locale)).map(({ path, dateKey, changeFrequency, priority }) => ({
      url: absoluteUrl(localePath(locale, routePath(path, locale))),
      changeFrequency,
      priority,
      lastModified: pageDate(dateKey || path, locale),
    })),
    ...caseStudyRoutes(locale),
    ...articleRoutes(locale),
  ]);
}
