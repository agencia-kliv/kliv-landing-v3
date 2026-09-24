"use client";

import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import { getBlogCover } from "@/data/blogCovers";
import Image from "next/image";
import Link from "next-intl/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import { withoutDashes } from "@/lib/visibleText";
import styles from "./ResourcesSection.module.css";

// Los tres pilares del blog, por su slug español (identificador estable); el
// enlace usa el slug del idioma activo.
const ITEMS = [
  { key: "performanceMarketing", slug: "que-es-performance-marketing-guia-completa" },
  { key: "ecommerce", slug: "performance-marketing-ecommerce" },
  { key: "services", slug: "performance-marketing-empresas-de-servicios" },
];

// `articles` llega desde la página (servidor): slug del idioma activo y minutos
// de lectura por slug español. No importar lib/blog acá: arrastra los textos
// completos del blog al JS de la home.
export default function ResourcesSection({ articles = {} }) {
  const t = useTranslations("resources");
  const locale = useLocale();

  return (
    <section className={styles.section} id="blog" data-section="blog">
      <div className="landing-section-container">
        <div className={styles.heading}>
          <LogitoSection />
          <SectionTitle className="text-center max-w-[900px]">{t("title")}</SectionTitle>
          <SectionSubtitle className="text-center max-w-[650px]">
            {t("subtitle")}
          </SectionSubtitle>
        </div>

        <div className={styles.headingAction}>
          <Link href="/blog/" className={styles.allLink}>
            {t("viewAll")} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.articleGrid}>
          {ITEMS.map((item, index) => (
            <Link key={item.slug} href={`/blog/${articles[item.slug]?.slug || item.slug}/`} className={styles.articleCard}>
              {getBlogCover(item.slug) && (
                // `relative` va en Tailwind, no solo en el módulo CSS: el módulo
                // llega en un chunk que carga JS (la sección es un next/dynamic),
                // y sin contexto de posicionamiento la portada `fill` se estira
                // contra la ventana y aparece a pantalla completa sobre el hero.
                <div className={`relative ${styles.articleCover}`}>
                  <Image
                    src={getBlogCover(item.slug)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                  />
                </div>
              )}
              <div className={styles.articleBody}>
                <div className={styles.meta}>
                  <span>{index < 4 ? t("pillar") : t("guide")}</span>
                  <span className={styles.metaRight}>
                    {articles[item.slug]?.minutes && (
                      <span className={styles.readingTime}>
                        {t("readingTime", { minutes: articles[item.slug].minutes })}
                      </span>
                    )}
                    <span className={styles.articleNumber}>{String(index + 1).padStart(2, "0")}</span>
                  </span>
                </div>
                <h3>{withoutDashes(t(`items.${item.key}.title`), locale)}</h3>
                <p>{withoutDashes(t(`items.${item.key}.description`), locale)}</p>
                <span className={styles.read}>{t("readArticle")} <FiArrowUpRight aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
