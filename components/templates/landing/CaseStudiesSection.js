"use client";

import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import CaseStudyCard from "@/components/templates/caseStudies/CaseStudyCard";
import { caseStudiesPath, getCaseStudies } from "@/lib/caseStudies";
import Link from "next-intl/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import styles from "./CaseStudiesSection.module.css";

// Adelanto de los casos de éxito en la home: las mismas tarjetas del índice,
// cada una hacia la página de su caso. Sin datos en el idioma activo, no se muestra.
export default function CaseStudiesSection() {
  const t = useTranslations("caseStudies");
  const locale = useLocale();
  const content = getCaseStudies(locale);
  if (!content) return null;

  const basePath = `/${caseStudiesPath(locale)}/`;

  return (
    <section className={styles.section} id="casos-de-exito" data-section="casos-de-exito">
      <div className="landing-section-container">
        <div className={styles.heading}>
          <LogitoSection />
          <SectionTitle className="text-center max-w-[900px]">{t("title")}</SectionTitle>
          <SectionSubtitle className="text-center max-w-[650px]">{t("subtitle")}</SectionSubtitle>
        </div>

        <div className={styles.headingAction}>
          <Link href={basePath} className={styles.allLink}>
            {t("viewAll")} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.grid}>
          {content.cases.map((item) => (
            <CaseStudyCard key={item.id} item={item} href={`${basePath}${item.id}/`} readLabel={t("readCase")} />
          ))}
        </div>
      </div>
    </section>
  );
}
