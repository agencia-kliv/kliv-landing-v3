import HeadSection from "@/components/atoms/HeadSection";
import { useTranslations } from "next-intl";
import ContactUsForm from "./ContactUsForm";

const ContactUsSection = () => {
  const t_contactUs = useTranslations("contactUs");

  return (
    <section
      className="landing-section-container"
      id="contactanos"
      data-section="contactanos"
      data-aos="fade-up"
    >
      <section className="flex flex-col gap-[50px] m-auto  w-full">
        <header className="flex flex-col gap-[10px] px-[10px] text-center items-center">
          <HeadSection className="max-w-[490px]">
            {t_contactUs("title")}
          </HeadSection>
        </header>
        <ContactUsForm t={t_contactUs} />
      </section>
    </section>
  );
};

export default ContactUsSection;
