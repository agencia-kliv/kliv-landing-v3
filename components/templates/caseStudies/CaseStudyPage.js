"use client";

import AgendarLLamadaButton from "@/components/atoms/AgendarLLamadaButton";
import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import CaseStudyCard, { CaseStudyVisual } from "./CaseStudyCard";
import styles from "./caseStudies.module.css";

// Página de un caso: resultados antes/después arriba (tabla semántica), luego
// desafío y solución, y al final los demás casos para seguir leyendo.
export default function CaseStudyPage({ content, item, labels, basePath }) {
  const others = content.cases.filter((other) => other.id !== item.id);

  return (
    <>
      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
          <Link href={basePath} className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> {labels.title}
          </Link>
          <p className={styles.eyebrow}>
            <span>{item.sector}</span>
            <span className={styles.eyebrowLocation}>{item.location}</span>
          </p>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.intro}>
            {item.profile}
            {item.website && (
              <>
                {" "}
                <a href={item.website} target="_blank" rel="noopener noreferrer">
                  {item.website.replace(/^https?:\/\//, "")}
                </a>
              </>
            )}
          </p>
          </div>
          <aside className={styles.heroProof} aria-label={item.metric.label}>
            <CaseStudyVisual item={item} compact />
            <p className={styles.heroMetric}>
              <strong>{item.metric.value}</strong>
              <span>{item.metric.label}</span>
            </p>
          </aside>
        </div>
      </header>

      <main className={`${styles.container} ${styles.main} ${styles.narrow}`}>
        <section className={styles.results}>
          <h2>{item.resultsTitle}</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">{item.resultsHeading || labels.metric}</th>
                <th scope="col">{labels.before}</th>
                <th scope="col">{labels.after}</th>
              </tr>
            </thead>
            <tbody>
              {item.results.map((row) => (
                <tr key={row.metric}>
                  <th scope="row">{row.metric}</th>
                  <td>
                    <span className={styles.cellLabel}>{labels.before}</span>
                    {row.before}
                  </td>
                  <td className={styles.after}>
                    <span className={styles.cellLabel}>{labels.after}</span>
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className={styles.storyGrid}>
          <section className={`${styles.story} ${styles.challenge}`}>
            <span className={styles.storyNumber}>01</span>
            <h2>{labels.challenge}</h2>
            <p>{item.challenge}</p>
          </section>

          <section className={`${styles.story} ${styles.solution}`}>
            <span className={styles.storyNumber}>02</span>
            <h2>{labels.solution}</h2>
            <ul>
              {item.solution.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>
        </div>

        {item.outcome && <p className={styles.outcome}>{item.outcome}</p>}
        {item.note && (
          <p className={styles.callout}>
            <strong>{item.note.label}</strong>
            {item.note.text}
          </p>
        )}

        <section className={styles.cta}>
          <div>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.text}</p>
          </div>
          <AgendarLLamadaButton />
        </section>

        <section className={styles.block}>
          <h2>{labels.moreCases}</h2>
          <div className={`${styles.grid} ${styles.gridThree}`}>
            {others.map((other) => (
              <CaseStudyCard key={other.id} item={other} href={`${basePath}${other.id}/`} readLabel={labels.readCase} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
