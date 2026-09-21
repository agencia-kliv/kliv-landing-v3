"use client";

import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import { withoutDashes, withoutDashesInHtml } from "@/lib/visibleText";
import { FAQ_ITEM_PATTERN } from "@/lib/blogFaq";
import { faqId } from "@/lib/faq";
import styles from "./BlogArticle.module.css";
import contentDates from "@/data/contentDates.json";

// Cada pregunta lleva un id (mismo criterio que el FAQ de la home) para poder
// enlazarla por fragmento, y va en <h3> para que conserve jerarquía semántica.
function withCollapsibleFaqs(content) {
  return content.replace(FAQ_ITEM_PATTERN, (_item, question, answer) => {
    const id = faqId(withoutDashes(question.replace(/<[^>]*>/g, "")));
    return `<details class="faq-item" id="${id}"><summary><h3>${question}</h3></summary><p>${answer}</p></details>`;
  });
}

const RECOMMENDED_LINK_ALIASES = {
  "/blog/marca-solo-vende-con-promociones":
    "/blog/por-que-tu-marca-solo-vende-con-promociones",
  "/blog/optimizar-seguimiento-de-leads-para-vender-mas":
    "/blog/seguimiento-de-leads-para-aumentar-conversion",
  "/es/casos-de-exito/": "/es/#trayectoria",
  "/es/cro/": "/es/#servicios",
  "/es/google-ads/": "/es/#servicios",
  "/es/implementacion-crm/":
    "/blog/seguimiento-de-leads-para-aumentar-conversion",
  "/es/meta-ads/": "/es/#servicios",
  "/es/performance-marketing-empresas-de-servicios/":
    "/blog/performance-marketing-empresas-de-servicios",
  "/es/performance-marketing-productos-digitales/":
    "/blog/performance-marketing-productos-digitales",
};

function recommendedHref(target) {
  const normalizedTarget = RECOMMENDED_LINK_ALIASES[target] ?? target;
  const blogMatch = normalizedTarget.match(/^\/blog\/([^/?#]+)\/?$/);

  // Relative URLs preserve the active locale (/es or /en) inside the blog.
  if (blogMatch) return `../${blogMatch[1]}/`;

  return normalizedTarget;
}

function withRecommendedLinks(content) {
  return content.replace(
    /<li><span class="anchor">([\s\S]*?)<\/span>\s*→\s*<span class="target">([\s\S]*?)<\/span>[\s\S]*?<\/li>/g,
    (_item, rawLabel, rawTarget) => {
      const cleanedLabel = rawLabel.trim().replace(/^["“”]+|["“”]+$/g, "");
      const label = cleanedLabel.replace(/^\p{L}/u, (letter) =>
        letter.toLocaleUpperCase("es")
      );
      const target = rawTarget.replace(/<[^>]*>/g, "").trim();
      const href = recommendedHref(target);

      return `<li><a href="${href}">${label}<span aria-hidden="true">→</span></a></li>`;
    }
  );
}

export default function BlogArticle({ article }) {
  const content = withoutDashesInHtml(
    withCollapsibleFaqs(withRecommendedLinks(article.content))
  );
  const dates = contentDates.articles[article.slug];
  const formatDate = (date) => new Intl.DateTimeFormat("es-AR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(date));

  return (
    <main>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/blog/" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> Volver al Blog
          </Link>
          <p className={styles.eyebrow}>Blog KLIV · {withoutDashes(article.category)}</p>
          <nav aria-label="Ruta de navegación" className="flex flex-wrap gap-[8px] text-[14px] mb-[16px]">
            <Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/blog/">Blog</Link>
          </nav>
          <h1 className={styles.title}>{withoutDashes(article.title)}</h1>
          <p className={styles.description}>{withoutDashes(article.description)}</p>
          {dates && (
            <p className="text-[14px] mt-[16px]">
              Publicado el <time dateTime={dates.datePublished}>{formatDate(dates.datePublished)}</time>
              {dates.dateModified !== dates.datePublished && <> · Actualizado el <time dateTime={dates.dateModified}>{formatDate(dates.dateModified)}</time></>}
            </p>
          )}
        </div>
      </header>

      <article className={styles.article}>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {article.sources?.length > 0 && (
          <section className={styles.sources} aria-labelledby="article-sources">
            <h2 id="article-sources">Fuentes y lecturas recomendadas</h2>
            <p>Documentación oficial consultada para ampliar y verificar los conceptos del artículo.</p>
            <ul>
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
