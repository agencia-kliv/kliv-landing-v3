// TestimonialsSection.js
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import TestimonialCard from "@/components/atoms/TestimonialCard";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// Hook para detectar desktop (lg+)
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

const TestimonialsSection = () => {
  const t = useTranslations("testimonials");
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Detectamos desktop vs mobile
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const itemsPerPage = isDesktop ? 3 : 1;

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
      logo: "/logos/Logo Saniito (Color).png",
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
      logo: "/logos/Logo Sol Millán (Color).png",
      company: "Dra. Sol M.",
      name: "Sol Millán.",
      text: t("solMillan"),
    },
    {
      id: "card5",
      logo: "/logos/Logo Rolicred (Color).png",
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

  // Número de páginas
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const [activePage, setActivePage] = useState(0);

  // ** SOLO PARA DESKTOP: drag-to-scroll **
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 1) Mouse down
  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - containerRef.current.getBoundingClientRect().left;
    setStartX(x);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // 2) Mouse move
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.getBoundingClientRect().left;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 3) Mouse up → stop drag + manual snap
  const onMouseUp = () => {
    setIsDragging(false);
    const container = containerRef.current;
    const scrollPos = container.scrollLeft;
    const cardWidth = cardRefs.current[0].getBoundingClientRect().width;
    const nearestIdx = Math.round(scrollPos / cardWidth);
    cardRefs.current[nearestIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  };

  // 4) Cancelar drag
  const onMouseLeave = () => {
    if (isDragging) onMouseUp();
  };

  // Scroll listener para actualizar el dot activo
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const pos = container.scrollLeft;
      const cardW = cardRefs.current[0]?.getBoundingClientRect().width || 1;
      const idx = Math.round(pos / cardW);
      const page = Math.floor(idx / itemsPerPage);
      setActivePage(Math.min(page, pageCount - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
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

        {/* Contenedor scrollable sin CSS snap durante drag */}
        <section
          ref={containerRef}
          className={`
            hidden lg:flex flex-row flex-nowrap gap-0 
            overflow-x-auto scrollbar-hide 
            ${
              isDesktop
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-auto"
            } 
            select-none
          `}
          {...(isDesktop && {
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave,
            onDragStart: (e) => e.preventDefault(),
          })}
        >
          {items.map((item, idx) => (
            <TestimonialCard
              key={item.id}
              innerRef={(el) => (cardRefs.current[idx] = el)}
              {...item}
            />
          ))}
        </section>

        <nav className="flex lg:hidden justify-center gap-4 mt-6">
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

        {/* Dots de navegación */}
        <nav className="hidden lg:flex justify-center gap-4 mt-6">
          {Array.from({ length: pageCount }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => {
                const target = pageIdx * itemsPerPage;
                cardRefs.current[target]?.scrollIntoView({
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

export default TestimonialsSection;
