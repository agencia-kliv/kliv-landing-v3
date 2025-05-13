// TestimonialsSection.js
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import TestimonialCard from "@/components/atoms/TestimonialCard";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const TESTIMONIAL_ITEMS = [
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
    text: "saniito",
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
    text: "solMillan",
  },
  {
    id: "card6",
    logo: "/logos/amalfi.png",
    company: "Lima + Amalfi",
    name: "Ignacio D.",
    video: "/testimonials/lima-amalfi.mp4",
  },
  {
    id: "card5",
    logo: "/logos/Logo Rolicred (Color).png",
    company: "Rolicred",
    name: "Valeria L.",
    text: "rolicred",
  },
];

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

  return (
    <section className="landing-section-container">
      <div className="flex flex-col gap-[60px]">
        {/* Título */}
        <div className="flex flex-col items-center gap-[20px]">
          <LogitoSection />
          <SectionTitle>{t("title")}</SectionTitle>
        </div>

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
      </div>
    </section>
  );
};

export default TestimonialsSection;
