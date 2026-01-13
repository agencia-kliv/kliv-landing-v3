// PartnersSection.js
import usePartnersImages from "@/hooks/usePartnersImages";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PartnerCard = ({ src, alt }) => (
  <figure className="w-[180px] md:w-[140px] lg:w-[160px] 2xl:w-[180px] h-[150px] lg:h-[150px] relative bg-background_elements rounded-small shadow-landing overflow-hidden lg:rounded-medium flex-shrink-0">
    <Image
      src={src}
      alt={alt}
      width={180}
      height={150}
      style={{ objectFit: "cover" }}
      draggable={false}
      loading="lazy"
      quality={85}
    />
  </figure>
);

const PartnersSection = () => {
  const { data: partnersImages } = usePartnersImages();
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const speed = 100; // px per second

  // Auto-scroll logic
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = now - lastTime;
      lastTime = now;
      if (!isHovered && !isDragging && containerRef.current) {
        containerRef.current.scrollLeft += (speed * delta) / 1000;
        // loop back when end reached
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Drag handlers
  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.getBoundingClientRect().left);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.getBoundingClientRect().left;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => {
    setIsDragging(false);
  };
  const onMouseLeave = () => {
    if (isDragging) onMouseUp();
  };

  // Touch handlers (reusing mouse logic)
  const onTouchStart = (e) => {
    setIsDragging(true);
    setStartX(
      e.touches[0].pageX - containerRef.current.getBoundingClientRect().left
    );
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const x =
      e.touches[0].pageX - containerRef.current.getBoundingClientRect().left;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const onTouchEnd = () => setIsDragging(false);

  if (!partnersImages) return null;

  // duplicate images for seamless looping
  const imgs = [...partnersImages.links, ...partnersImages.links];

  return (
    <section className="max-w-[1370px] mx-auto w-full py-[0px] px-[15px] flex flex-col items-center lg:py-[0px]">
      <div className="relative w-full overflow-hidden">
        {/* gradient overlays */}
        <div className="absolute left-0 top-0 h-full w-[10dvw] z-10 bg-gradient-to-r from-white to-transparent select-none" />
        <div className="absolute right-0 top-0 h-full w-[10dvw] z-10 bg-gradient-to-l from-white to-transparent select-none" />

        {/* scroll container */}
        <div
          ref={containerRef}
          className="flex gap-[0px] lg:gap-[40px] overflow-x-auto scroll-snap-type-none scrollbar-hide cursor-grab select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            onMouseLeave();
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          {imgs.map((src, idx) => (
            <PartnerCard key={idx} src={src} alt={`partner-${idx}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
