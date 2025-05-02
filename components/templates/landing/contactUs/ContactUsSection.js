import AgendarLLamadaButton, {
  AGENDAR_BUTTON_SIZES,
} from "@/components/atoms/AgendarLLamadaButton";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";

const ContactUsSection = () => {
  const t_contactUs = useTranslations("contactUs");

  return (
    <div className="bg-kliv-primary">
      <section
        className="landing-section-container flex flex-col items-center gap-[20px]"
        id="contactanos"
        data-section="contactanos"
        data-aos="fade-up"
      >
        <SectionTitle className={"text-white max-w-[450px] text-center"}>
          {t_contactUs("title")}
        </SectionTitle>
        <SectionSubtitle className={"text-white text-center"}>
          {t_contactUs("subtitle")}
        </SectionSubtitle>
        <AgendarLLamadaButton size={AGENDAR_BUTTON_SIZES.SMALL} />
      </section>
    </div>
  );
};

export default ContactUsSection;
