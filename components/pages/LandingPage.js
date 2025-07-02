"use client";

import ContactUsSection from "../templates/landing/contactUs/ContactUsSection";
import FAQSection from "../templates/landing/FAQSection";
import HeroSection from "../templates/landing/HeroSection";
import PartnersSection from "../templates/landing/partners/PartnersSection";
import ServicesSection from "../templates/landing/ServicesSection";
import TarifasSection from "../templates/landing/tarifas/TarifasSection";
import TeamMembersSection from "../templates/landing/TeamMembersSection";
import TestimonialsSection from "../templates/landing/TestimonialsSection";

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
