export function withoutDashes(value) {
  if (typeof value !== "string") return value;

  return value
    .replace(
      /(\d+(?:[.,]\d+)?[%x]?)\s*[-‐‑‒–—]\s*(\d+(?:[.,]\d+)?[%x]?)/gi,
      "$1 a $2"
    )
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/[-‐‑‒]/g, " ")
    .replace(/,\s*([.,;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function withoutDashesInHtml(html) {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith("<") ? part : withoutDashes(part)))
    .join("");
}
