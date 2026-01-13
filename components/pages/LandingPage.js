"use client";

import dynamic from "next/dynamic";
import HeroSection from "../templates/landing/HeroSection";
import ServicesSection from "../templates/landing/ServicesSection";

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

const LandingPage = () => {
  return (
    <main className=" flex flex-col">
      <HeroSection />
      <ServicesSection />
      <TeamMembersSection />
      <PartnersSection />
      <TestimonialsSection />
      <TarifasSection />
      {/* <WhyUsSection /> */}
      {/* <OurServicesSection /> */}
      {/* <HowWeWorkSection /> */}
      <FAQSection />
      <ContactUsSection />
      {/* <CalendlySection /> */}
    </main>
  );
};

export default LandingPage;
