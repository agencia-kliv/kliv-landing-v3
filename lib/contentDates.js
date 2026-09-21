import contentDates from "@/data/contentDates.json";

// Fechas de contenido real (data/contentDates.json), nunca la del build.
// Módulo aparte y liviano: lo importan componentes cliente sin arrastrar los artículos.
export const articleDates = (slug, locale) => contentDates.articles[slug]?.[locale];

export function pageDate(path, locale) {
  const value = contentDates.pages[path];
  return typeof value === "object" && value !== null ? value[locale] : value;
}
