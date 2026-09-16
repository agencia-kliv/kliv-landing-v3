"use client";

import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./BlogArticle.module.css";

export default function BlogArticle({ article }) {
  return (
    <main>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/#blog" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> Volver al Blog
          </Link>
          <p className={styles.eyebrow}>Blog KLIV · {article.category}</p>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
        </div>
      </header>

      <article className={styles.article}>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: article.content }} />
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
