"use client";

import { FB_PIXEL_ID } from "@/lib/fpixel";
import { useEffect } from "react";
import ContactUsSection from "../templates/landing/contactUs/ContactUsSection";
import FAQSection from "../templates/landing/FAQ/FAQSection";
import HeroSection from "../templates/landing/HeroSection";
import HowWeWorkSection from "../templates/landing/howWeWork/HowWeWorkSection";
import OurServicesSection from "../templates/landing/ourServices/OurServicesSection";
import PartnersSection from "../templates/landing/partners/PartnersSection";
import ServicesSection from "../templates/landing/ServicesSection";
import TarifasSection from "../templates/landing/tarifas/TarifasSection";
import TeamMembersSection from "../templates/landing/TeamMembersSection";
import WhyUsSection from "../templates/landing/whyUs/WhyUsSection";

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
      <TarifasSection />
      <WhyUsSection />
      <OurServicesSection />
      <HowWeWorkSection />
      <FAQSection />
      <ContactUsSection />
      {/* <CalendlySection /> */}
    </main>
  );
};

export default LandingPage;
