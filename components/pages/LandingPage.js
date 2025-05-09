"use client";

import { FB_PIXEL_ID } from "@/lib/fpixel";
import { useEffect } from "react";
import ContactUsSection from "../templates/landing/contactUs/ContactUsSection";
import FAQSection from "../templates/landing/FAQSection";
import HeroSection from "../templates/landing/HeroSection";
import PartnersSection from "../templates/landing/partners/PartnersSection";
import ServicesSection from "../templates/landing/ServicesSection";
import TarifasSection from "../templates/landing/tarifas/TarifasSection";
import TeamMembersSection from "../templates/landing/TeamMembersSection";
import TestimonialsSection from "../templates/landing/TestimonialsSection";

const LandingPage = () => {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXEL_ID); // facebookPixelId
        ReactPixel.pageView();
      });
  }, []);

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
