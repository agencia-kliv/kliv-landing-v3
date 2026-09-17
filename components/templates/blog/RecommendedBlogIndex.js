"use client";

import { getBlogCover } from "@/data/blogCovers";
import Image from "next/image";
import Link from "next-intl/link";
import { useMemo, useState } from "react";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import styles from "./RecommendedBlogIndex.module.css";

const COLLECTIONS = [
  { label: "Todo", value: "Todos" },
  { label: "Fundamentos", value: "Fundamentos" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Servicios", value: "Empresas de servicios" },
  { label: "Métricas", value: "Métricas" },
];

const DECISIONS = [
  {
    number: "01",
    title: "Entender",
    text: "Los conceptos que ordenan una operación de performance.",
    collection: "Fundamentos",
  },
  {
    number: "02",
    title: "Medir",
    text: "Las métricas que conectan inversión con rentabilidad.",
    collection: "Métricas",
  },
  {
    number: "03",
    title: "Escalar",
    text: "Los criterios para crecer sin romper el negocio.",
    collection: "E-commerce",
  },
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
  const featured = articles[0];

  const filteredArticles = useMemo(() => {
    if (activeCollection === "Todos") return articles;

    return articles.filter(
      (article) =>
        article.category === activeCollection ||
        article.tags?.includes(activeCollection)
    );
  }, [activeCollection, articles]);

  const secondaryArticles = filteredArticles.filter(
    (article) => article.slug !== featured?.slug
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>BLOG KLIV / PERFORMANCE</p>
            <h1>
              Lo que hace que una campaña <em>funcione de verdad.</em>
            </h1>
            <p className={styles.heroIntro}>
              Ideas y marcos de decisión para conectar la pauta con el negocio:
              adquisición, margen, rentabilidad y escala.
            </p>
            <div className={styles.heroActions}>
              <a href="#biblioteca" className={styles.primaryAction}>
                Entrar a la biblioteca <FiArrowUpRight aria-hidden="true" />
              </a>
              <span className={styles.heroNote}>Criterio antes que ruido</span>
            </div>
          </div>

          <aside className={styles.heroAside} aria-label="Criterio editorial">
            <p className={styles.asideKicker}>Una pregunta para empezar</p>
            <blockquote>
              “¿Qué tiene que pasar entre un clic y una venta para que el negocio
              realmente crezca?”
            </blockquote>
            <p className={styles.asideCaption}>
              Cada artículo baja esa pregunta a una decisión concreta.
            </p>
            <div className={styles.asideIndex}>
              <div className={styles.indexRow}>
                <span>01</span>
                <strong>Entender el problema</strong>
              </div>
              <div className={styles.indexRow}>
                <span>02</span>
                <strong>Medir lo que importa</strong>
              </div>
              <div className={styles.indexRow}>
                <span>03</span>
                <strong>Escalar con criterio</strong>
              </div>
            </div>
          </aside>
        </div>
        <div className={styles.heroBottom}>
          <span>Agencia KLIV</span>
          <span>Performance marketing</span>
          <span>Buenos Aires · Córdoba · LATAM</span>
        </div>
      </section>

      <section className={styles.content} id="biblioteca">
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.sectionKicker}>01 / Lo más importante</p>
            <h2>Una idea para empezar</h2>
          </div>
          <p>
            El artículo pilar funciona como punto de entrada y conecta con el
            resto del ecosistema editorial.
          </p>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}/`} className={styles.featured}>
            <div className={styles.featuredCover}>
              {getBlogCover(featured.slug) && (
                <Image
                  src={getBlogCover(featured.slug)}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 58vw"
                />
              )}
              <span className={styles.featuredBadge}>Pilar transversal</span>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.articleMeta}>
                <span>{featured.category}</span>
                <span>{readingTime(featured.content)} min de lectura</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <span className={styles.textAction}>
                Leer el artículo <FiArrowUpRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        <div className={styles.sectionIntroDecision}>
          <div>
            <p className={styles.sectionKicker}>02 / Navegar por decisión</p>
            <h2>Elegí qué necesitás resolver</h2>
          </div>
        </div>

        <div className={styles.decisions}>
          {DECISIONS.map((decision) => (
            <button
              type="button"
              key={decision.number}
              className={styles.decision}
              onClick={() => setActiveCollection(decision.collection)}
            >
              <span className={styles.decisionNumber}>{decision.number}</span>
              <span className={styles.decisionTitle}>{decision.title}</span>
              <span className={styles.decisionText}>{decision.text}</span>
              <FiChevronRight aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className={styles.libraryHeader}>
          <div>
            <p className={styles.sectionKicker}>03 / Biblioteca completa</p>
            <h2>Todos los artículos</h2>
          </div>
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
          {secondaryArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}/`} className={styles.articleRow}>
              <div className={styles.rowCover}>
                {getBlogCover(article.slug) && (
                  <Image
                    src={getBlogCover(article.slug)}
                    alt=""
                    fill
                    sizes="180px"
                  />
                )}
              </div>
              <div className={styles.rowBody}>
                <div className={styles.articleMeta}>
                  <span>{article.category}</span>
                  <span>{readingTime(article.content)} min de lectura</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
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
