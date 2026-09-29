"use client";

import dynamic from "next/dynamic";
import HeroSection from "../templates/landing/HeroSection";
import ServicesSection from "../templates/landing/ServicesSection";
import { ALL_PLATFORMS } from "../atoms/AdPlatformLogos";

// Lazy load components that are below the fold
const TeamMembersSection = dynamic(
  () => import("../templates/landing/TeamMembersSection"),
  { ssr: true }
);
const PartnersSection = dynamic(
  () => import("../templates/landing/partners/PartnersSection"),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("../templates/landing/TestimonialsSection"),
  { ssr: true }
);
const TarifasSection = dynamic(
  () => import("../templates/landing/tarifas/TarifasSection"),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import("../templates/landing/FAQSection"),
  { ssr: true }
);
const ContactUsSection = dynamic(
  () => import("../templates/landing/contactUs/ContactUsSection"),
  { ssr: true }
);
const ResourcesSection = dynamic(
  () => import("../templates/landing/ResourcesSection"),
  { ssr: true }
);

const LandingPage = ({ blogArticles, platforms = ALL_PLATFORMS }) => {
  return (
    <main className=" flex flex-col">
      <HeroSection platforms={platforms} />
      <ServicesSection platforms={platforms} />
      <TeamMembersSection />
      <PartnersSection />
      <TestimonialsSection />
      <TarifasSection />
      {/* <WhyUsSection /> */}
      {/* <OurServicesSection /> */}
      {/* <HowWeWorkSection /> */}
      <FAQSection />
      <ContactUsSection />
      <ResourcesSection articles={blogArticles} />
      {/* <CalendlySection /> */}
    </main>
  );
};

export default LandingPage;
