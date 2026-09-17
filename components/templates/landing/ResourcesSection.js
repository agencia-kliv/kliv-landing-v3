"use client";

import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import { getBlogCover } from "@/data/blogCovers";
import Image from "next/image";
import Link from "next-intl/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import { withoutDashes } from "@/lib/visibleText";
import styles from "./ResourcesSection.module.css";

const SPANISH_ITEMS = [
  { key: "performanceMarketing", slug: "que-es-performance-marketing-guia-completa", ready: true },
  { key: "ecommerce", slug: "performance-marketing-ecommerce", ready: true },
  { key: "services", slug: "performance-marketing-empresas-de-servicios", ready: true },
];

const ENGLISH_ITEMS = [
  { key: "highPerformance", slug: "claves-alto-performance", ready: true },
  { key: "soulfulBrands", slug: "marcas-con-alma" },
  { key: "convertingWebsite", slug: "claves-web" },
];

function itemHref(locale, slug) {
  return locale === "es" ? `/blog/${slug}/` : `/${slug}`;
}

const WORDS_PER_MINUTE = 220;
const ARTICLES_BY_SLUG = new Map(BLOG_ARTICLES.map((article) => [article.slug, article]));

function readingTime(slug) {
  const article = ARTICLES_BY_SLUG.get(slug);
  if (!article?.content) return null;

  const words = article.content
    .replace(/<[^>]*>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export default function ResourcesSection() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const items = locale === "es" ? SPANISH_ITEMS : ENGLISH_ITEMS;

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
          <Link href={locale === "es" ? "/blog/" : "/#blog"} className={styles.allLink}>
            {t("viewAll")} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.articleGrid}>
          {items.map((item, index) => (
            <Link key={item.slug} href={itemHref(locale, item.slug)} className={styles.articleCard}>
              {getBlogCover(item.slug) && (
                <div className={styles.articleCover}>
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
                    {readingTime(item.slug) && (
                      <span className={styles.readingTime}>
                        {t("readingTime", { minutes: readingTime(item.slug) })}
                      </span>
                    )}
                    <span className={styles.articleNumber}>{String(index + 1).padStart(2, "0")}</span>
                  </span>
                </div>
                <h3>{withoutDashes(t(`items.${item.key}.title`))}</h3>
                <p>{withoutDashes(t(`items.${item.key}.description`))}</p>
                <span className={styles.read}>{t("readArticle")} <FiArrowUpRight aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
