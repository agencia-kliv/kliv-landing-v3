// URLs de los casos de éxito por idioma. Archivo chico a propósito: lo usan
// componentes cliente (home, artículos del blog, LocaleSwitcher) sin arrastrar
// el contenido de los casos al bundle.
//
// El índice tiene slug propio en cada idioma y cada caso vive debajo. El `id`
// de cada caso (su slug en español) es el identificador estable que empareja
// los idiomas; los casos con nombre de marca conservan el mismo slug.
export const CASE_STUDIES_PATHS = { es: "casos-de-exito", en: "case-studies" };

export const CASE_STUDY_SLUGS_EN = {
  rolicred: "rolicred",
  "desarrolladora-departamentos-de-lujo": "luxury-apartment-developer",
  saniito: "saniito",
  "instituto-educativo": "educational-institute",
};
