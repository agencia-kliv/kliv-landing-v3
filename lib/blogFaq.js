import { withoutDashes } from "./visibleText";

// Cada artículo cierra con bloques <div class="faq-item"><div class="q">…</div><p>…</p></div>.
// El mismo patrón alimenta el acordeón visible y el schema FAQPage, para que
// el texto marcado coincida con el que se muestra en pantalla.
export const FAQ_ITEM_PATTERN =
  /<div class="faq-item"><div class="q">([\s\S]*?)<\/div><p>([\s\S]*?)<\/p><\/div>/g;

const stripTags = (html, locale) => withoutDashes(html.replace(/<[^>]*>/g, "").replace(/\s+/g, " "), locale);

export function extractArticleFaqs(content, locale = "es") {
  return Array.from(content.matchAll(FAQ_ITEM_PATTERN), ([, question, answer]) => ({
    question: stripTags(question, locale),
    answer: stripTags(answer, locale),
  }));
}
