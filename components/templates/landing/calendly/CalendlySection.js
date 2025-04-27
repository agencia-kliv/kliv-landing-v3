import { useTranslations } from "next-intl";
import { InlineWidget } from "react-calendly";

const CalendlySection = () => {
  const t_calendly = useTranslations("calendly");

  return (
    <section className="bg-kliv-lightgreen" data-aos="fade-in">
      <div className="flex flex-col gap-[10px] items-center landing-section-container-large">
        <header className="flex flex-col gap-[10px] text-center items-center">
          {/* <HeadSection className="text-kliv-conversion">
            {t_calendly("title")}
          </HeadSection> */}
          <p className="text-base leading-[20px] max-w-[400px]">
            {t_calendly("subtitle")}
          </p>
        </header>
        <div className="w-full">
          <InlineWidget
            url="https://calendly.com/agenciakliv/agendavideollamada"
            styles={{
              minWidth: "320px",
              height: "850px",
              marginTop: "0",
              marginBottom: "0",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;
