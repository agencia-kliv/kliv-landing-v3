"use client";

import Link from "next-intl/link";
import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { withoutDashes } from "@/lib/visibleText";
import styles from "./RecommendedBlogIndex.module.css";

const COLLECTIONS = [
  { label: "Todo", value: "Todos" },
  { label: "Fundamentos", value: "Fundamentos" },
  { label: "Ecommerce", value: "E-commerce" },
  { label: "Servicios", value: "Empresas de servicios" },
  { label: "Productos digitales", value: "Productos digitales" },
  { label: "Métricas", value: "Métricas" },
];

function readingTime(content) {
  const words = content
    .replace(/<[^>]*>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export default function RecommendedBlogIndex({ articles }) {
  const [activeCollection, setActiveCollection] = useState("Todos");

  const filteredArticles = useMemo(() => {
    if (activeCollection === "Todos") return articles;

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
          <p className={styles.sectionKicker}>BLOG KLIV / PERFORMANCE</p>
          <h1>
            Lo que hace que tu publicidad{" "}
            <span className={styles.titleAccent}>funcione de verdad</span>
          </h1>
          <p className={styles.librarySubtitle}>
            Ideas y marcos de decisión para conectar la pauta con el negocio:
            adquisición, margen, rentabilidad y escala.
          </p>
        </div>

        <div className={styles.libraryHeader}>
          <p className={styles.sectionKicker}>Biblioteca completa</p>
          <span className={styles.resultCount} aria-live="polite">
            {filteredArticles.length} {filteredArticles.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>

        <div className={styles.filters} aria-label="Filtrar colecciones">
          {COLLECTIONS.map((collection) => (
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
        </div>

        <div className={styles.articleList}>
          {filteredArticles.map((article, index) => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className={styles.articleRow}>
              <span className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.rowBody}>
                <div className={styles.articleMeta}>
                  <span>{withoutDashes(article.category)}</span>
                  <span>{readingTime(article.content)} min de lectura</span>
                </div>
                <h2>{withoutDashes(article.title)}</h2>
                <p>{withoutDashes(article.description)}</p>
              </div>
              <span className={styles.rowArrow} aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </Link>
          ))}
        </div>

        <section className={styles.cta}>
          <div>
            <h2>Encontrá qué está frenando tu crecimiento y qué mover primero.</h2>
          </div>
          <Link href="/quiz/" className={styles.ctaAction}>
            Agendar una llamada <FiArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      </section>
    </main>
  );
}
