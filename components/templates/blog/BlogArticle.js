"use client";

import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./BlogArticle.module.css";

function withCollapsibleFaqs(content) {
  return content.replace(
    /<div class="faq-item"><div class="q">([\s\S]*?)<\/div><p>([\s\S]*?)<\/p><\/div>/g,
    '<details class="faq-item"><summary>$1</summary><p>$2</p></details>'
  );
}

const ACRONYM_DEFINITIONS = {
  API: "interfaz de programación de aplicaciones",
  B2B: "empresa a empresa",
  B2C: "empresa a consumidor",
  CAC: "costo de adquisición de clientes",
  CPA: "costo por adquisición o acción",
  CPL: "costo por lead o contacto potencial",
  CRO: "optimización de la tasa de conversión",
  CTR: "tasa de clics",
  CRM: "sistema de gestión de relaciones con clientes",
  D2C: "venta directa al consumidor",
  LTV: "valor de vida del cliente",
  MER: "ratio de eficiencia de marketing",
  PM: "performance marketing",
  ROAS: "retorno de la inversión publicitaria",
  SaaS: "software como servicio",
  SKU: "unidad de mantenimiento de inventario",
};

function withAcronymExpansions(content, used = new Set()) {
  const acronymPattern = new RegExp(
    `\\b(${Object.keys(ACRONYM_DEFINITIONS).join("|")})\\b`,
    "g"
  );

  return content
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith("<")) return part;

      return part.replace(acronymPattern, (match, acronym, offset, text) => {
        if (used.has(acronym)) return match;

        const afterMatch = text.slice(offset + match.length);
        if (/^\s*\(/.test(afterMatch)) {
          used.add(acronym);
          return match;
        }

        used.add(acronym);
        return `${match} (${ACRONYM_DEFINITIONS[acronym]})`;
      });
    })
    .join("");
}

export default function BlogArticle({ article }) {
  const usedAcronyms = new Set();
  const description = withAcronymExpansions(article.description, usedAcronyms);
  const content = withCollapsibleFaqs(
    withAcronymExpansions(article.content, usedAcronyms)
  );

  return (
    <main>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/blog/" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> Volver al Blog
          </Link>
          <p className={styles.eyebrow}>Blog KLIV · {article.category}</p>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{description}</p>
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
