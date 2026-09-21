// TestimonialsSection.js
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import TestimonialCard from "@/components/atoms/TestimonialCard";
import { TESTIMONIAL_ITEMS } from "@/data/testimonials";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 0 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TestimonialsSection = () => {
  const t = useTranslations("testimonials");

  const [reproducingVideoID, setReproducingVideoID] = useState(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    setInteractive(true);
  }, []);

  return (
    <section className="landing-section-container" id="testimonios">
      <div className="flex flex-col gap-[60px]">
        {/* Título */}
        <div className="flex flex-col items-center gap-[20px]">
          <LogitoSection />
          <SectionTitle>{t("title")}</SectionTitle>
        </div>

        {!interactive ? (
          <ul className="flex overflow-x-auto snap-x snap-mandatory" data-testimonials="initial">
            {TESTIMONIAL_ITEMS.filter((item) => item.text).map((item) => (
              <li key={item.id} className="shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 snap-start">
                <TestimonialCard {...item} />
              </li>
            ))}
          </ul>
        ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          showDots={true}
          arrows={false}
          beforeChange={() => {
            setReproducingVideoID(null);
          }}
        >
          {TESTIMONIAL_ITEMS.map((item) => (
            <TestimonialCard
              key={item.id}
              reproducingVideoID={reproducingVideoID}
              onVideoPause={() => {
                setReproducingVideoID(null);
              }}
              onVideoPlay={() => {
                setReproducingVideoID(item.id);
              }}
              {...item}
            />
          ))}
        </Carousel>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
