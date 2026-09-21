import { CASE_STUDIES_ES, CASE_STUDIES_PATH_ES } from "@/data/caseStudies";
import { DEFAULT_LOCALE, localePath } from "./seo";

// Casos de éxito por idioma. Cada idioma tiene su propio slug de índice
// (/es/casos-de-exito/, /en/case-studies/) y cada caso su página propia debajo
// (/es/casos-de-exito/rolicred/). El español es el original; el inglés se suma
// con data/caseStudies.en.js y su entrada en CONTENT y PATHS. Hasta entonces
// las rutas en inglés responden 404 y la sección de la home en inglés no se
// muestra.
const CONTENT = { es: CASE_STUDIES_ES };

export const CASE_STUDIES_PATHS = { es: CASE_STUDIES_PATH_ES };

export const CASE_STUDIES_LOCALES = Object.keys(CONTENT);

export const getCaseStudies = (locale) => CONTENT[locale] || null;

export const getCaseStudy = (locale, slug) => CONTENT[locale]?.cases.find((item) => item.id === slug) || null;

export const caseStudiesPath = (locale) => CASE_STUDIES_PATHS[locale];

// Ruta sin locale de un caso, ej. "casos-de-exito/rolicred".
export const caseStudyPath = (locale, slug) => `${CASE_STUDIES_PATHS[locale]}/${slug}`;

// Locale cuyo slug de índice coincide con `resource`, si existe.
export const caseStudiesLocaleFor = (resource) =>
  Object.keys(CASE_STUDIES_PATHS).find((locale) => CASE_STUDIES_PATHS[locale] === resource);

// canonical + hreflang solo entre los idiomas publicados (no comparten slug).
// El `id` de cada caso es el mismo en todos los idiomas.
export function caseStudiesAlternates(locale, slug) {
  const languages = Object.fromEntries(
    Object.entries(CASE_STUDIES_PATHS).map(([lang, path]) => [lang, localePath(lang, slug ? `${path}/${slug}` : path)])
  );
  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages[DEFAULT_LOCALE] || languages[locale] },
  };
}
