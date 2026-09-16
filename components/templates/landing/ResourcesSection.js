"use client";

import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import Link from "next-intl/link";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./ResourcesSection.module.css";

const SPANISH_ITEMS = [
  { key: "performanceMarketing", slug: "que-es-performance-marketing-guia-completa", ready: true },
  { key: "ecommerce", slug: "performance-marketing-ecommerce", ready: true },
  { key: "services", slug: "performance-marketing-empresas-de-servicios", ready: true },
  { key: "digitalProducts", slug: "performance-marketing-productos-digitales", ready: true },
  { key: "metrics", slug: "roas-mer-cac-que-metrica-mirar", ready: true },
];

const ENGLISH_ITEMS = [
  { key: "highPerformance", slug: "claves-alto-performance", ready: true },
  { key: "soulfulBrands", slug: "marcas-con-alma" },
  { key: "convertingWebsite", slug: "claves-web" },
  { key: "whatsappSales", slug: "claves-whatsapp" },
];

const RESPONSIVE = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

export default function ResourcesSection() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const items = locale === "es" ? SPANISH_ITEMS : ENGLISH_ITEMS;
  const carousel = useRef(null);

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

        <div className={styles.controls} aria-label={t("navigationLabel")}>
          <button type="button" onClick={() => carousel.current?.previous()} aria-label={t("previous")}>
            <FiArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => carousel.current?.next()} aria-label={t("next")}>
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>

        <Carousel
          ref={carousel}
          responsive={RESPONSIVE}
          infinite
          autoPlay
          autoPlaySpeed={4500}
          transitionDuration={500}
          pauseOnHover
          arrows={false}
          swipeable
          draggable
          containerClass={styles.rail}
          itemClass={styles.slide}
        >
          {items.map((item, index) => (
            <article className={styles.card} key={item.slug}>
              <div>
                <div className={styles.cardTop}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <FiBookOpen aria-hidden="true" />
                </div>
                <h3>{t(`items.${item.key}.title`)}</h3>
                <p>{t(`items.${item.key}.description`)}</p>
              </div>
              <Link
                href={locale === "es" ? `/blog/${item.slug}` : `/${item.slug}`}
                className={styles.link}
              >
                {item.ready ? t("readArticle") : t("previewArticle")} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
