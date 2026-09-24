import Image from "next/image";
import Link from "next-intl/link";
import { FiArrowUpRight, FiBookOpen, FiCreditCard, FiHome, FiPackage } from "react-icons/fi";
import styles from "./caseStudies.module.css";

const CASE_ICONS = {
  rolicred: FiCreditCard,
  "desarrolladora-departamentos-de-lujo": FiHome,
  saniito: FiPackage,
  "instituto-educativo": FiBookOpen,
};

export function CaseStudyVisual({ item, compact = false }) {
  const Icon = CASE_ICONS[item.id] || FiArrowUpRight;

  return (
    <div className={`${styles.cardVisual} ${compact ? styles.cardVisualCompact : ""}`} aria-hidden="true">
      <span className={styles.visualGlow} />
      {item.logo ? (
        <Image className={styles.caseLogo} src={item.logo} alt="" width={180} height={72} />
      ) : (
        <span className={styles.caseIcon}><Icon /></span>
      )}
    </div>
  );
}

// Tarjeta simple de un caso: nombre en la cabecera (el logo si lo hay, si no el
// texto), rubro, métrica destacada y una línea. La usan el índice y las páginas
// de cada caso, así ambos cuentan lo mismo.
export default function CaseStudyCard({ item, href, readLabel }) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardVisual}>
        <span className={styles.visualGlow} aria-hidden="true" />
        <h3 className={styles.cardName}>
          {item.logo ? (
            <Image className={styles.caseLogo} src={item.logo} alt={item.name} width={180} height={72} />
          ) : (
            item.name
          )}
        </h3>
      </div>
      <p className={styles.cardMeta}>
        <span>{item.sector}</span>
        <span className={styles.cardLocation}>{item.location}</span>
      </p>
      <p className={styles.metric}>
        <strong>{item.metric.value}</strong>
        <span>{item.metric.label}</span>
      </p>
      <p className={styles.summary}>{item.summary}</p>
      <span className={styles.read}>
        {readLabel} <FiArrowUpRight aria-hidden="true" />
      </span>
    </Link>
  );
}
