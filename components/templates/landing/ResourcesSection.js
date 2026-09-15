"use client";

import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen } from "react-icons/fi";
import styles from "./ResourcesSection.module.css";

const ITEMS = [
  { key: "highPerformance", slug: "claves-alto-performance", ready: true },
  { key: "soulfulBrands", slug: "marcas-con-alma" },
  { key: "convertingWebsite", slug: "claves-web" },
  { key: "whatsappSales", slug: "claves-whatsapp" },
];

const LOOP_ITEMS = [-1, 0, 1].flatMap((copy) =>
  ITEMS.map((item, index) => ({ ...item, copy, index })),
);

export default function ResourcesSection() {
  const t = useTranslations("resources");
  const rail = useRef(null);
  const scrollTimer = useRef(null);
  const [paused, setPaused] = useState(false);

  const getStep = () => {
    const card = rail.current?.firstElementChild;
    return card ? card.getBoundingClientRect().width + 18 : 360;
  };

  const normalizePosition = () => {
    const element = rail.current;
    if (!element) return;

    const blockWidth = ITEMS.length * getStep();
    if (element.scrollLeft < blockWidth) {
      element.scrollLeft += blockWidth;
    } else if (element.scrollLeft >= blockWidth * 2) {
      element.scrollLeft -= blockWidth;
    }
  };

  const move = (direction) => {
    rail.current?.scrollBy({
      left: direction * getStep(),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const element = rail.current;
    if (!element) return;

    element.scrollLeft = ITEMS.length * getStep();

    return () => window.clearTimeout(scrollTimer.current);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const element = rail.current;
      if (!element) return;
      element.scrollBy({
        left: getStep(),
        behavior: "smooth",
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className={styles.section} id="recursos" data-section="recursos">
      <div className="landing-section-container">
        <div className={styles.heading}>
          <LogitoSection />
          <SectionTitle className="text-center max-w-[900px]">{t("title")}</SectionTitle>
          <SectionSubtitle className="text-center max-w-[650px]">
            {t("subtitle")}
          </SectionSubtitle>
        </div>

        <div className={styles.controls} aria-label={t("navigationLabel")}>
          <button type="button" onClick={() => move(-1)} aria-label={t("previous")}>
            <FiArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={t("next")}>
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>

        <div
          className={styles.rail}
          ref={rail}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onScroll={() => {
            window.clearTimeout(scrollTimer.current);
            scrollTimer.current = window.setTimeout(normalizePosition, 140);
          }}
        >
          {LOOP_ITEMS.map((item) => (
            <article
              className={styles.card}
              key={`${item.copy}-${item.slug}`}
              aria-hidden={item.copy !== 0}
            >
              <div>
                <div className={styles.cardTop}>
                  <span className={styles.number}>{String(item.index + 1).padStart(2, "0")}</span>
                  <FiBookOpen aria-hidden="true" />
                </div>
                <h3>{t(`items.${item.key}.title`)}</h3>
                <p>{t(`items.${item.key}.description`)}</p>
              </div>
              <Link
                href={`/${item.slug}`}
                className={styles.link}
                tabIndex={item.copy === 0 ? undefined : -1}
              >
                {item.ready ? t("readArticle") : t("previewArticle")} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
