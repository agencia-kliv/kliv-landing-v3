"use client";

import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import { withoutDashes, withoutDashesInHtml } from "@/lib/visibleText";
import styles from "./BlogArticle.module.css";

function withCollapsibleFaqs(content) {
  return content.replace(
    /<div class="faq-item"><div class="q">([\s\S]*?)<\/div><p>([\s\S]*?)<\/p><\/div>/g,
    '<details class="faq-item"><summary>$1</summary><p>$2</p></details>'
  );
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

  return (
    <main>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/blog/" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> Volver al Blog
          </Link>
          <p className={styles.eyebrow}>Blog KLIV · {withoutDashes(article.category)}</p>
          <h1 className={styles.title}>{withoutDashes(article.title)}</h1>
          <p className={styles.description}>{withoutDashes(article.description)}</p>
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
