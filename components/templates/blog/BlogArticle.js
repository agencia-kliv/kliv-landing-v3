"use client";

import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import { withoutDashes, withoutDashesInHtml } from "@/lib/visibleText";
import { FAQ_ITEM_PATTERN } from "@/lib/blogFaq";
import { faqId } from "@/lib/faq";
import styles from "./BlogArticle.module.css";
import { articleDates } from "@/lib/contentDates";
import { CASE_STUDIES_PATHS } from "@/data/caseStudySlugs";
import BlogQuizPrompt from "./BlogQuizPrompt";

// Cada pregunta lleva un id (mismo criterio que el FAQ de la home) para poder
// enlazarla por fragmento, y va en <h3> para que conserve jerarquía semántica.
function withCollapsibleFaqs(content, locale) {
  return content.replace(FAQ_ITEM_PATTERN, (_item, question, answer) => {
    const id = faqId(withoutDashes(question.replace(/<[^>]*>/g, ""), locale));
    return `<details class="faq-item" id="${id}"><summary><h3>${question}</h3></summary><p>${answer}</p></details>`;
  });
}

const RECOMMENDED_LINK_ALIASES = {
  "/blog/marca-solo-vende-con-promociones":
    "/blog/por-que-tu-marca-solo-vende-con-promociones",
  "/blog/optimizar-seguimiento-de-leads-para-vender-mas":
    "/blog/seguimiento-de-leads-para-aumentar-conversion",
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

function recommendedHref(target, locale) {
  // Los destinos del export apuntan al sitio en español; se siguen en el locale activo.
  const spanishTarget = target.replace(/^\/en\//, "/es/");
  const normalizedTarget = RECOMMENDED_LINK_ALIASES[spanishTarget] ?? spanishTarget;
  const blogMatch = normalizedTarget.match(/^\/blog\/([^/?#]+)\/?$/);

  // Relative URLs preserve the active locale (/es or /en) inside the blog.
  if (blogMatch) return `../${blogMatch[1]}/`;

  // Casos de éxito tiene slug propio por idioma; sin versión en ese idioma, va a la trayectoria de la home.
  if (normalizedTarget === `/es/${CASE_STUDIES_PATHS.es}/`) {
    return CASE_STUDIES_PATHS[locale] ? `/${locale}/${CASE_STUDIES_PATHS[locale]}/` : `/${locale}/#trayectoria`;
  }

  return normalizedTarget.replace(/^\/es\//, `/${locale}/`);
}

const COPY = {
  es: { back: "Volver al Blog", breadcrumb: "Ruta de navegación", home: "Inicio", blog: "Blog", published: "Publicado el", updated: "Actualizado el", sources: "Fuentes y lecturas recomendadas", sourcesIntro: "Documentación oficial consultada para ampliar y verificar los conceptos del artículo.", dateLocale: "es-AR" },
  en: { back: "Back to the Blog", breadcrumb: "Breadcrumb", home: "Home", blog: "Blog", published: "Published on", updated: "Updated on", sources: "Sources and recommended reading", sourcesIntro: "Official documentation consulted to expand and verify the concepts in this article.", dateLocale: "en-US" },
};

function withRecommendedLinks(content, locale) {
  return content.replace(
    /<li><span class="anchor">([\s\S]*?)<\/span>\s*→\s*<span class="target">([\s\S]*?)<\/span>[\s\S]*?<\/li>/g,
    (_item, rawLabel, rawTarget) => {
      const cleanedLabel = rawLabel.trim().replace(/^["“”]+|["“”]+$/g, "");
      const label = cleanedLabel.replace(/^\p{L}/u, (letter) =>
        letter.toLocaleUpperCase(locale)
      );
      const target = rawTarget.replace(/<[^>]*>/g, "").trim();
      const href = recommendedHref(target, locale);

      return `<li><a href="${href}">${label}<span aria-hidden="true">→</span></a></li>`;
    }
  );
}

export default function BlogArticle({ article, locale = "es" }) {
  const copy = COPY[locale] || COPY.es;
  const content = withoutDashesInHtml(
    withCollapsibleFaqs(withRecommendedLinks(article.content, locale), locale),
    locale
  );
  const dates = articleDates(article.sourceSlug || article.slug, locale);
  const formatDate = (date) => new Intl.DateTimeFormat(copy.dateLocale, {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(date));

  return (
    <main>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/blog/" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> {copy.back}
          </Link>
          <p className={styles.eyebrow}>Blog KLIV · {withoutDashes(article.category, locale)}</p>
          <nav aria-label={copy.breadcrumb} className="flex flex-wrap gap-[8px] text-[14px] mb-[16px]">
            <Link href="/">{copy.home}</Link><span aria-hidden="true">/</span><Link href="/blog/">{copy.blog}</Link>
          </nav>
          <h1 className={styles.title}>{withoutDashes(article.title, locale)}</h1>
          <p className={styles.description}>{withoutDashes(article.description, locale)}</p>
          {dates && (
            <p className="text-[14px] mt-[16px]">
              {copy.published} <time dateTime={dates.datePublished}>{formatDate(dates.datePublished)}</time>
              {dates.dateModified !== dates.datePublished && <> · {copy.updated} <time dateTime={dates.dateModified}>{formatDate(dates.dateModified)}</time></>}
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
            <h2 id="article-sources">{copy.sources}</h2>
            <p>{copy.sourcesIntro}</p>
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
      <BlogQuizPrompt article={article.sourceSlug || article.slug} locale={locale} />
    </main>
  );
}
