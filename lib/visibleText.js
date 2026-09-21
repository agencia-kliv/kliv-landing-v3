// Los rangos numéricos ("5-10%") se leen con la preposición del idioma.
const RANGE_WORD = { es: "a", en: "to" };

export function withoutDashes(value, locale = "es") {
  if (typeof value !== "string") return value;

  return value
    .replace(
      /(\d+(?:[.,]\d+)?[%x]?)\s*[-‐‑‒–—]\s*(\d+(?:[.,]\d+)?[%x]?)/gi,
      `$1 ${RANGE_WORD[locale] || RANGE_WORD.es} $2`
    )
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/[-‐‑‒]/g, " ")
    .replace(/,\s*([.,;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function withoutDashesInHtml(html, locale = "es") {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith("<") || !part.trim()) return part;

      const leadingWhitespace = part.match(/^\s+/)?.[0] || "";
      const trailingWhitespace = part.match(/\s+$/)?.[0] || "";

      return `${leadingWhitespace}${withoutDashes(part, locale)}${trailingWhitespace}`;
    })
    .join("");
}
