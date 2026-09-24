import { BLOG_ARTICLES } from "@/data/blogArticles";
import { BLOG_ARTICLES_EN } from "@/data/blogArticles.en";
import { BLOG_SEO } from "@/data/blogSeo";
import { articleDates as datesByKey, pageDate } from "./contentDates";

// Acceso al blog por idioma. Cada idioma tiene su propio slug; el español es el
// original y su slug es el identificador estable (`sourceSlug` en el inglés) que
// usan contentDates.json, blogCovers.js y el emparejamiento hreflang. El inglés
// se genera con scripts/import-blog-markdown.mjs.
export const BLOG_LOCALES = ["es", "en"];

const ARTICLES = { es: BLOG_ARTICLES, en: BLOG_ARTICLES_EN };

export const articleKey = (article) => article.sourceSlug || article.slug;

export const getBlogArticles = (locale) => ARTICLES[locale] || null;

export const getBlogSlugs = (locale) => (ARTICLES[locale] || []).map((article) => article.slug);

export const getBlogArticle = (slug, locale) => ARTICLES[locale]?.find((article) => article.slug === slug) || null;

// Slug del mismo artículo en otro idioma, a partir de su identificador estable.
export const localizedSlug = (key, locale) => ARTICLES[locale]?.find((article) => articleKey(article) === key)?.slug;

// Rutas del artículo en cada idioma, para canonical + hreflang.
export const articlePaths = (article) =>
  Object.fromEntries(BLOG_LOCALES.map((locale) => [locale, `blog/${localizedSlug(articleKey(article), locale)}`]));

// Metadatos concisos cuando el título o la descripción original exceden los límites.
export const blogSeoFor = (slug, locale) => BLOG_SEO[locale]?.[slug] || {};

// Fechas de contenido real, indexadas por el slug español.
export const articleDates = (article, locale) => datesByKey(articleKey(article), locale);

export { pageDate };

const WORDS_PER_MINUTE = 220;

// Minutos de lectura estimados a partir del HTML del artículo.
export function readingMinutes(article) {
  const words = article.content
    .replace(/<[^>]*>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

// Lo que necesitan los listados (índice del blog y tarjetas de la home), sin el
// `content`. Los listados son componentes cliente: si reciben o importan los
// artículos completos, los 33 textos viajan al navegador en el HTML o en el JS
// aunque en pantalla solo se vean título, descripción y minutos de lectura.
export const blogListItems = (locale) =>
  (ARTICLES[locale] || []).map((article) => ({
    key: articleKey(article),
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags,
    minutes: readingMinutes(article),
  }));

export const BLOG_COPY = {
  es: {
    title: "Blog de Performance Marketing",
    description:
      "Ideas, estrategias y aprendizajes de Agencia KLIV para mejorar el rendimiento de tu publicidad y tomar mejores decisiones de negocio.",
    home: "Inicio",
    blog: "Blog",
    siteName: "Agencia KLIV",
    ogLocale: "es_ES",
  },
  en: {
    title: "Performance Marketing Blog",
    description:
      "Ideas, strategies and lessons from Agencia KLIV to improve your advertising performance and make better business decisions.",
    home: "Home",
    blog: "Blog",
    siteName: "KLIV Agency",
    ogLocale: "en_US",
  },
};
