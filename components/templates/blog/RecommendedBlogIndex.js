"use client";

import Link from "next-intl/link";
import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { withoutDashes } from "@/lib/visibleText";
import styles from "./RecommendedBlogIndex.module.css";

const ALL = "*";

// Las colecciones filtran por la categoría de cada artículo en su idioma.
const COPY = {
  es: {
    collections: [
      { label: "Todo", value: ALL },
      { label: "Fundamentos", value: "Fundamentos" },
      { label: "Ecommerce", value: "E-commerce" },
      { label: "Servicios", value: "Empresas de servicios" },
      { label: "Productos digitales", value: "Productos digitales" },
      { label: "Métricas", value: "Métricas" },
    ],
    kicker: "BLOG KLIV / PERFORMANCE",
    titleStart: "Lo que hace que tu publicidad",
    titleAccent: "funcione de verdad",
    subtitle: "Ideas y marcos de decisión para conectar la pauta con el negocio: adquisición, margen, rentabilidad y escala.",
    library: "Biblioteca completa",
    result: "resultado",
    results: "resultados",
    filterLabel: "Filtrar colecciones",
    readingTime: (minutes) => `${minutes} min de lectura`,
    pressKicker: "Prensa",
    pressTitle: "KLIV en los medios",
    pressRead: "Leer más",
    pressLanguage: {},
    cta: "¿Tu empresa está lista para escalar con Performance Marketing?",
    ctaAction: "Autoevaluación de 1 min",
  },
  en: {
    collections: [
      { label: "All", value: ALL },
      { label: "Fundamentals", value: "Fundamentals" },
      { label: "Ecommerce", value: "E-commerce" },
      { label: "Services", value: "Service businesses" },
      { label: "Digital products", value: "Digital products" },
      { label: "Metrics", value: "Metrics" },
    ],
    kicker: "KLIV BLOG / PERFORMANCE",
    titleStart: "What makes your advertising",
    titleAccent: "actually work",
    subtitle: "Ideas and decision frameworks to connect ad spend with the business: acquisition, margin, profitability and scale.",
    library: "Full library",
    result: "result",
    results: "results",
    filterLabel: "Filter collections",
    readingTime: (minutes) => `${minutes} min read`,
    pressKicker: "Press",
    pressTitle: "KLIV in the media",
    pressRead: "Read more",
    pressLanguage: { es: "In Spanish" },
    cta: "Is your business ready to scale with Performance Marketing?",
    ctaAction: "1-minute self-assessment",
  },
};

// En UTC para que el servidor y el navegador muestren el mismo día.
const pressDate = (date, locale) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString(locale === "en" ? "en-US" : "es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

// `articles` viene de blogListItems(): sin el texto completo, con los minutos
// de lectura ya calculados en el servidor. `press` son notas externas
// (data/press.js): solo título, medio, fecha y enlace a la nota original.
export default function RecommendedBlogIndex({ articles, press = [], locale = "es" }) {
  const copy = COPY[locale] || COPY.es;
  const [activeCollection, setActiveCollection] = useState(ALL);

  const filteredArticles = useMemo(() => {
    if (activeCollection === ALL) return articles;

    return articles.filter(
      (article) =>
        article.category === activeCollection ||
        article.tags?.includes(activeCollection)
    );
  }, [activeCollection, articles]);

  return (
    <main className={styles.page}>
      <section className={styles.content} id="biblioteca">
        <div className={styles.libraryIntro}>
          <p className={styles.sectionKicker}>{copy.kicker}</p>
          <h1>
            {copy.titleStart}{" "}
            <span className={styles.titleAccent}>{copy.titleAccent}</span>
          </h1>
          <p className={styles.librarySubtitle}>{copy.subtitle}</p>
        </div>

        <div className={styles.libraryHeader}>
          <p className={styles.sectionKicker}>{copy.library}</p>
          <span className={styles.resultCount} aria-live="polite">
            {filteredArticles.length} {filteredArticles.length === 1 ? copy.result : copy.results}
          </span>
        </div>

        <div className={styles.filters} aria-label={copy.filterLabel}>
          {copy.collections.map((collection) => (
            <button
              type="button"
              key={collection.value}
              className={activeCollection === collection.value ? styles.filterActive : styles.filter}
              aria-pressed={activeCollection === collection.value}
              onClick={() => setActiveCollection(collection.value)}
            >
              {collection.label}
            </button>
          ))}
          {press.length > 0 && (
            <a href="#prensa" className={styles.filter}>
              {copy.pressKicker}
            </a>
          )}
        </div>

        <div className={styles.articleList}>
          {filteredArticles.map((article, index) => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className={styles.articleRow}>
              <span className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.rowBody}>
                <div className={styles.articleMeta}>
                  <span>{withoutDashes(article.category, locale)}</span>
                  <span>{copy.readingTime(article.minutes)}</span>
                </div>
                <h2>{withoutDashes(article.title, locale)}</h2>
                <p>{withoutDashes(article.description, locale)}</p>
              </div>
              <span className={styles.rowArrow} aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </Link>
          ))}
        </div>

        {press.length > 0 && (
          <section className={styles.press} id="prensa" aria-labelledby="prensa-title">
            <p className={styles.sectionKicker}>{copy.pressKicker}</p>
            <h2 id="prensa-title" className={styles.pressTitle}>{copy.pressTitle}</h2>
            <div className={styles.articleList}>
              {press.map((item) => (
                <a key={item.url} href={item.url} target="_blank" rel="noopener" className={styles.articleRow}>
                  <span className={styles.rowNumber} aria-hidden="true" />
                  <div className={styles.rowBody}>
                    <div className={styles.articleMeta}>
                      <span>{item.outlet}</span>
                      <time dateTime={item.datePublished}>{pressDate(item.datePublished, locale)}</time>
                      {copy.pressLanguage[item.inLanguage] && <span>{copy.pressLanguage[item.inLanguage]}</span>}
                    </div>
                    <h3 lang={item.inLanguage}>{item.title}</h3>
                    <span className={styles.pressRead}>
                      {copy.pressRead} <FiArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                  <span className={styles.rowArrow} aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className={styles.cta}>
          <div>
            <h2>{copy.cta}</h2>
          </div>
          <Link href="/quiz/" className={styles.ctaAction}>
            {copy.ctaAction} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      </section>
    </main>
  );
}
