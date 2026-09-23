import { CASE_STUDIES_ES } from "@/data/caseStudies";
import { CASE_STUDIES_EN } from "@/data/caseStudies.en";
import { CASE_STUDIES_PATHS as PATHS, CASE_STUDY_SLUGS_EN } from "@/data/caseStudySlugs";
import { DEFAULT_LOCALE, localePath } from "./seo";

// Casos de éxito por idioma. Cada idioma tiene su propio slug de índice
// (/es/casos-de-exito/, /en/case-studies/) y cada caso su página propia debajo
// (/es/casos-de-exito/rolicred/). El español es el original; el `id` de cada
// caso es su slug español y el identificador estable entre idiomas. Los slugs
// viven en data/caseStudySlugs.js para que los componentes cliente los usen
// sin importar este módulo (que arrastra todo el contenido).
const CONTENT = { es: CASE_STUDIES_ES, en: CASE_STUDIES_EN };

export const CASE_STUDIES_LOCALES = Object.keys(CONTENT);

// Solo los idiomas publicados.
export const CASE_STUDIES_PATHS = Object.fromEntries(CASE_STUDIES_LOCALES.map((locale) => [locale, PATHS[locale]]));

export const getCaseStudies = (locale) => CONTENT[locale] || null;

// Slug del caso en un idioma, a partir de su `id`.
export const caseSlug = (locale, id) => (locale === "en" && CASE_STUDY_SLUGS_EN[id]) || id;

export const getCaseStudy = (locale, slug) =>
  CONTENT[locale]?.cases.find((item) => caseSlug(locale, item.id) === slug) || null;

export const caseStudiesPath = (locale) => CASE_STUDIES_PATHS[locale];

// Ruta sin locale de un caso a partir de su `id`, ej. "case-studies/educational-institute".
export const caseStudyPath = (locale, id) => `${CASE_STUDIES_PATHS[locale]}/${caseSlug(locale, id)}`;

// Enlace de cada caso por `id`, para las tarjetas (componentes cliente).
export const caseStudyHrefs = (locale) =>
  Object.fromEntries(CONTENT[locale].cases.map((item) => [item.id, `/${caseStudyPath(locale, item.id)}/`]));

// Locale cuyo slug de índice coincide con `resource`, si existe.
export const caseStudiesLocaleFor = (resource) =>
  Object.keys(CASE_STUDIES_PATHS).find((locale) => CASE_STUDIES_PATHS[locale] === resource);

// canonical + hreflang solo entre los idiomas publicados (no comparten slug).
// Sin `id` es el índice; con `id`, ese caso en cada idioma que lo tenga.
export function caseStudiesAlternates(locale, id) {
  const languages = Object.fromEntries(
    CASE_STUDIES_LOCALES.filter((lang) => !id || CONTENT[lang].cases.some((item) => item.id === id)).map((lang) => [
      lang,
      localePath(lang, id ? caseStudyPath(lang, id) : CASE_STUDIES_PATHS[lang]),
    ])
  );
  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages[DEFAULT_LOCALE] || languages[locale] },
  };
}
