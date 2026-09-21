import Link from "next-intl/link";
import { FiArrowUpRight } from "react-icons/fi";
import styles from "./caseStudies.module.css";

// Tarjeta simple de un caso: rubro, métrica destacada, nombre y una línea.
// La usan la home y el índice, así ambos cuentan lo mismo.
export default function CaseStudyCard({ item, href, readLabel }) {
  return (
    <Link href={href} className={styles.card}>
      <p className={styles.cardMeta}>
        <span>{item.sector}</span>
        <span className={styles.cardLocation}>{item.location}</span>
      </p>
      <p className={styles.metric}>
        <strong>{item.metric.value}</strong>
        <span>{item.metric.label}</span>
      </p>
      <h3>{item.name}</h3>
      <p className={styles.summary}>{item.summary}</p>
      <span className={styles.read}>
        {readLabel} <FiArrowUpRight aria-hidden="true" />
      </span>
    </Link>
  );
}
