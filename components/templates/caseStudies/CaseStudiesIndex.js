"use client";

import AgendarLLamadaButton from "@/components/atoms/AgendarLLamadaButton";
import Link from "next-intl/link";
import { FiArrowLeft } from "react-icons/fi";
import CaseStudyCard from "./CaseStudyCard";
import styles from "./caseStudies.module.css";

// Índice de casos de éxito: tarjetas que llevan a la página de cada caso y
// otros rubros. La trayectoria y las preguntas frecuentes viven en la home.
export default function CaseStudiesIndex({ content, labels, hrefs }) {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>
            <FiArrowLeft aria-hidden="true" /> {labels.home}
          </Link>
          <p className={styles.eyebrow}>{content.tagline}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
        </div>
      </header>

      <main className={`${styles.container} ${styles.main}`}>
        <div className={styles.grid}>
          {content.cases.map((item) => (
            <CaseStudyCard key={item.id} item={item} href={hrefs[item.id]} readLabel={labels.readCase} />
          ))}
        </div>

        <section className={styles.block} id="otros-rubros">
          <h2>{content.others.title}</h2>
          <ul className={styles.others}>
            {content.others.items.map((item) => (
              <li key={item.name}>
                <h3>{item.name}</h3>
                <p className={styles.othersLocation}>{item.location}</p>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.cta}>
          <div>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.text}</p>
          </div>
          <AgendarLLamadaButton />
        </section>
      </main>
    </>
  );
}
