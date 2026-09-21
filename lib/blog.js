import { BLOG_ARTICLES } from "@/data/blogArticles";
import { BLOG_ARTICLES_EN } from "@/data/blogArticles.en";
import { BLOG_SEO } from "@/data/blogSeo";
import { articleDates, pageDate } from "./contentDates";

// Acceso al blog por idioma. Los dos idiomas comparten slugs y orden; el
// español es el original y el inglés se genera con scripts/import-blog-markdown.mjs.
export const BLOG_LOCALES = ["es", "en"];

const ARTICLES = { es: BLOG_ARTICLES, en: BLOG_ARTICLES_EN };

export const BLOG_SLUGS = BLOG_ARTICLES.map((article) => article.slug);

export const getBlogArticles = (locale) => ARTICLES[locale] || null;

export const getBlogArticle = (slug, locale) => ARTICLES[locale]?.find((article) => article.slug === slug) || null;

// Metadatos concisos cuando el título o la descripción original exceden los límites.
export const blogSeoFor = (slug, locale) => BLOG_SEO[locale]?.[slug] || {};

export { articleDates, pageDate };

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
