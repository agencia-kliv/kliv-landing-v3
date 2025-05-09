// TestimonialsSection.js
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import TestimonialCard from "@/components/atoms/TestimonialCard";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIAL_ITEMS } from "./TestimonialsSection";

// Hook simple para detectar breakpoints
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const TestimonialsSectionV2 = () => {
  const t = useTranslations("testimonials");
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Detectamos móvil vs lg+
  const isLg = useMediaQuery("(min-width:1024px)");
  const itemsPerPage = isLg ? 3 : 1;

  // Número de páginas (dots)
  const pageCount = Math.ceil(TESTIMONIAL_ITEMS.length / itemsPerPage);

  // Estado de la página activa
  const [activePage, setActivePage] = useState(0);

  // Al hacer scroll, calculamos qué página estamos viendo
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollPos = container.scrollLeft;
      const cardWidth = cardRefs.current[0]?.getBoundingClientRect().width || 1;
      const cardIndex = Math.round(scrollPos / cardWidth);
      const page = Math.floor(cardIndex / itemsPerPage);
      setActivePage(Math.min(page, pageCount - 1));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    // Inicializamos
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, [itemsPerPage, pageCount]);

  return (
    <section className="landing-section-container">
      <div className="flex flex-col gap-[60px]">
        {/* Título */}
        <div className="flex flex-col items-center gap-[20px]">
          <LogitoSection />
          <SectionTitle>{t("title")}</SectionTitle>
        </div>

        {/* Scroll snap container */}
        <section
          ref={containerRef}
          className="
            flex flex-row flex-nowrap gap-0 
            overflow-x-auto scrollbar-hide 
            snap-x snap-mandatory 
            cursor-grab select-none
          "
        >
          {TESTIMONIAL_ITEMS.map((item, idx) => (
            <TestimonialCard
              key={item.id}
              innerRef={(el) => (cardRefs.current[idx] = el)}
              {...item}
            />
          ))}
        </section>

        {/* Dots de navegación */}
        <nav className="flex justify-center gap-4 mt-6">
          {Array.from({ length: pageCount }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => {
                // Scroll a la página correspondiente
                const targetIdx = pageIdx * itemsPerPage;
                cardRefs.current[targetIdx]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "start",
                });
              }}
              className={`
                w-4 h-4 rounded-full transition 
                ${
                  activePage === pageIdx
                    ? "bg-kliv-primary"
                    : "bg-kliv-primary/30 hover:bg-kliv-primary/60"
                }
              `}
            />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default TestimonialsSectionV2;
