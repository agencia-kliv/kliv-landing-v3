import { BUSINESS } from "@/data/business";
import { getBlogArticles, pageDate } from "@/lib/blog";
import es from "@/messages/es.json";
import { absoluteUrl, localePath } from "@/lib/seo";
import { withoutDashes } from "@/lib/visibleText";

// /llms.txt (llmstxt.org): índice en Markdown pensado para asistentes de IA.
// Reutiliza el copy publicado y los datos confirmados en data/; no agrega
// afirmaciones nuevas. Se genera en build para seguir a blogArticles.js.
export const dynamic = "force-static";

const link = (label, path, description) =>
  `- [${label}](${absoluteUrl(path)})${description ? `: ${description}` : ""}`;

export function GET() {
  const home = localePath("es");

  const lines = [
    "# Agencia KLIV",
    "",
    `> ${es.metadata.description}`,
    "",
    `Agencia de performance marketing con oficina en ${BUSINESS.address.addressLocality}, Argentina. ` +
      `${es.services.subtitle} Sitio en español (canónico) e inglés.`,
    "",
    "## Sitio",
    "",
    link("Inicio", home, es.metadata.description),
    link("Home (English)", localePath("en"), "English version of the home page."),
    link("Servicios", `${home}#servicios`, `${es.services.title}: Meta Ads, Google Ads y TikTok Ads.`),
    link("Trayectoria", `${home}#trayectoria`, "Equipo y socios de la agencia."),
    link("Testimonios", `${home}#testimonios`, "Testimonios escritos y en video de clientes."),
    link("Preguntas frecuentes", `${home}#faq`, "Nueve preguntas sobre campañas, alcance del servicio, garantías, pagos y plazos."),
    link(es.quiz.title, localePath("es", "quiz"), "Formulario de evaluación previo a la auditoría gratuita."),
    link(es.bookACall.title, localePath("es", "book-a-call"), "Reserva de llamada de auditoría."),
    link("Política de privacidad", localePath("es", "politicas-de-privacidad")),
    "",
    `## Blog (${getBlogArticles("es").length} artículos, en español)`,
    "",
    link("Índice del blog", localePath("es", "blog"), `Última actualización: ${pageDate("blog", "es")}.`),
    ...getBlogArticles("es").map((article) =>
      link(withoutDashes(article.title), localePath("es", `blog/${article.slug}`), withoutDashes(article.description))
    ),
    "",
    `## Blog (${getBlogArticles("en").length} articles, in English)`,
    "",
    link("Blog index", localePath("en", "blog"), `Last updated: ${pageDate("blog", "en")}.`),
    ...getBlogArticles("en").map((article) =>
      link(withoutDashes(article.title, "en"), localePath("en", `blog/${article.slug}`), withoutDashes(article.description, "en"))
    ),
    "",
    "## Contacto",
    "",
    `- Dirección: ${BUSINESS.addressText}`,
    `- Teléfono: ${BUSINESS.displayTelephone}`,
    `- Email: ${BUSINESS.email}`,
    "- Instagram: https://www.instagram.com/agenciakliv/",
    "- LinkedIn: https://www.linkedin.com/company/agencia-kliv/",
    "",
    "## Optional",
    "",
    link("Sitemap", "/sitemap.xml"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
