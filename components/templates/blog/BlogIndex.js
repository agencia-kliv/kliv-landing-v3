"use client";

import { getBlogCover } from "@/data/blogCovers";
import Link from "next-intl/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import styles from "./BlogIndex.module.css";

const WORDS_PER_MINUTE = 220;

function readingTime(content) {
  const words = content
    .replace(/<[^>]*>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export default function BlogIndex({ articles }) {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = useMemo(
    () => [
      "Todos",
      ...new Set(articles.flatMap((article) => [article.category, ...(article.tags || [])])),
    ],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    if (activeFilter === "Todos") return articles;

    return articles.filter(
      (article) =>
        article.category === activeFilter || article.tags?.includes(activeFilter)
    );
  }, [activeFilter, articles]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> Volver a la home
          </Link>
          <p className={styles.eyebrow}>BLOG KLIV</p>
          <h1>Performance marketing para tomar mejores decisiones</h1>
          <p className={styles.intro}>
            Ideas, estrategias y aprendizajes para mejorar el rendimiento de tu
            publicidad, entender tus números y crecer con más claridad.
          </p>
        </div>
      </section>

      <section className={styles.library} aria-labelledby="blog-library-title">
        <div className={styles.libraryHeader}>
          <div>
            <p className={styles.sectionLabel}>Biblioteca KLIV</p>
            <h2 id="blog-library-title">Todos los artículos</h2>
          </div>
          <p className={styles.count} aria-live="polite">
            {filteredArticles.length} {filteredArticles.length === 1 ? "artículo" : "artículos"}
          </p>
        </div>

        <div className={styles.filters} aria-label="Filtrar artículos">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilter === filter ? styles.filterActive : styles.filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}/`}
              className={styles.card}
            >
              <div className={styles.cover}>
                {getBlogCover(article.slug) && (
                  <Image
                    src={getBlogCover(article.slug)}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span>{article.category}</span>
                  <span>{readingTime(article.content)} min de lectura</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className={styles.tags}>
                  {(article.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className={styles.read}>
                  Leer artículo <FiArrowUpRight aria-hidden="true" />
                </span>
              </div>
              {index === 0 && <span className={styles.featured}>Destacado</span>}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
