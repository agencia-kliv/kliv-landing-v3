// TestimonialsSection.js
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import TestimonialCard from "@/components/atoms/TestimonialCard";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

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

  const items = [
    {
      id: "card1",
      logo: "/logos/camelinna.png",
      company: "Camelinna",
      name: "Lourdes H.",
      position: "CEO",
      video: "/testimonials/camelinna.mp4",
    },
    {
      id: "card2",
      logo: "/testimonials/saniito.png",
      company: "Saniito",
      name: "Alejandro A.",
      position: "CEO",
      text: t("saniito"),
    },
    {
      id: "card3",
      logo: "/logos/memeca.png",
      company: "Memeca",
      name: "Natalia S.",
      position: "CEO",
      video: "/testimonials/memeca.mp4",
    },
    {
      id: "card4",
      logo: "/testimonials/sol-millan.png",
      name: "Sol Millán.",
      text: t("solMillan"),
    },
    {
      id: "card5",
      logo: "/testimonials/valeria-rolicred.png",
      company: "Rolicred",
      name: "Valeria L.",
      text: t("rolicred"),
    },
    {
      id: "card6",
      logo: "/logos/amalfi.png",
      company: "Lima + Amalfi",
      name: "Ignacio D.",
      video: "/testimonials/lima-amalfi.mp4",
    },
  ];

  // Número de páginas (dots)
  const pageCount = Math.ceil(items.length / itemsPerPage);

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
          {items.map((item, idx) => (
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
