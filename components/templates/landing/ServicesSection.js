import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTag from "@/components/atoms/SectionTag";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CardItem = ({ title, description, image, bg, zIndex }) => {
  return (
    <article
      className={`flex flex-col relative items-center gap-[10px] md:gap-[30px] p-[50px] pt-[50px] px-[40px] pb-[90px] lg:[&:not(:last-child)]:pb-[60px] mb-[-90px] lg:mb-0 lg:p-[30px] 2xl:p-[40px] 2xl:pb-[100px] lg:pt-[50px] 2xl:pt-[70px] rounded-[28px] lg:rounded-[18px] 2xl:rounded-[28px] ${zIndex} ${bg} bg-no-repeat bg-cover bg-right-top hover:scale-105 transition-transform duration-200`}
    >
      <div className="pt-[20px] h-[80px] w-[80px] 2xl:w-[100px] 2xl:h-[100px] relative ">
        <Image src={image} alt={title} fill />
      </div>

      <div className="flex flex-col items-center gap-[20px] md:gap-[13px]">
        <h3 className="text-[18px] lg:text-[18px] 2xl:text-[24px] font-[700] text-white">
          {title}
        </h3>
        <p className="text-[16px] sm:text-[16px] lg:text-[14px] 2xl:text-[16px] font-[400] text-white max-w-[350px]">
          {description}
        </p>
      </div>
    </article>
  );
};

const ServicesSection = () => {
  const t_services = useTranslations("services");
  const t_header = useTranslations("header");

  return (
    <section
      className="landing-section-container relative !mb-[80px] lg:!mb-0"
      id="servicios"
      data-section="servicios"
    >
      <div className="w-full flex flex-col items-center text-center gap-[70px]">
        <div className="relative w-full flex flex-col gap-[50px] 2xl:gap-[60px] items-center text-center">
          <SectionTag>{t_header("services")}</SectionTag>
          <div className="w-full flex flex-col gap-[32px] items-center">
            <div className="w-full flex flex-col gap-[22px] items-center">
              <LogitoSection />
              <SectionTitle className={"max-w-[523px] 2xl:max-w-[605px]"}>
                {t_services("title")}
              </SectionTitle>
            </div>
            <div className="w-full flex items-center gap-[100px] justify-center lg:py-[40px]">
              <div className="lg:grid gap-[5px] hidden grid-cols-3 w-full max-w-[320px] lg:max-w-[380px] 2xl:max-w-[400px]">
                <div className="w-full aspect-[1.14] relative">
                  <Image
                    src={"/images/meta_logo.png"}
                    alt="Meta Ads"
                    fill={true}
                  />
                </div>
                <div className="w-full aspect-[1.14] relative">
                  <Image
                    src={"/images/google_logo.png"}
                    alt="Google Ads"
                    fill={true}
                  />
                </div>
                <div className="w-full aspect-[1.14] relative">
                  <Image
                    src={"/images/ia.png"}
                    alt="LinkedIn Ads"
                    fill={true}
                  />
                </div>
              </div>
              <div className="lg:text-right flex flex-col gap-[30px] text-center items-center max-w-[439px] lg:max-w-[390px] 2xl:max-w-[500px]">
                <SectionSubtitle>{t_services("subtitle")}</SectionSubtitle>
                <SectionSubtitle className={"font-[700]"}>
                  {t_services("perks")} {t_services("iaBoost")}
                </SectionSubtitle>
                {/* <SectionSubtitle className={"italic mt-[-20px] mb-[-20px]"}>
                {t_services("iaBoost")}
              </SectionSubtitle> */}
              </div>
            </div>
          </div>

          {/* ads logos */}
          <div className="lg:hidden gap-[5px] grid grid-cols-3 w-full max-w-[320px] 2xl:max-w-[400px]">
            <div className="w-full aspect-[1.14] relative">
              <Image src={"/images/meta_logo.png"} alt="Meta Ads" fill={true} />
            </div>
            <div className="w-full aspect-[1.14] relative">
              <Image
                src={"/images/google_logo.png"}
                alt="Google Ads"
                fill={true}
              />
            </div>
            <div className="w-full aspect-[1.14] relative">
              <Image src={"/images/ia.png"} alt="LinkedIn Ads" fill={true} />
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-3 items-stretch relative max-w-[466px] lg:max-w-[936px] 2xl:max-w-max gap-[20px] lg:gap-[10px] 2xl:gap-[20px]">
          <CardItem
            image={"/illustrations/more-roi.svg"}
            title={t_services("moreROI")}
            description={t_services("moreROIText")}
            zIndex={"z-[1]"}
            bg={"bg-[url(/shapes/folder-shape-secondary.png)]"}
            index={1}
          />

          {/* <div className="bg-[url(/shapes/folder-shape-primary.png)]"> */}
          <CardItem
            image={"/illustrations/more-scalability.svg"}
            title={t_services("moreScalability")}
            description={t_services("moreScalabilityText")}
            zIndex={"z-[2]"}
            bg={"bg-[url(/shapes/folder-shape-primary.png)]"}
            index={2}
          />
          {/* </div> */}
          {/* <div className="bg-[url(/shapes/folder-shape-tertiary.png)]"> */}
          <CardItem
            image={"/illustrations/more-transparency.svg"}
            title={t_services("moreTransparency")}
            description={t_services("moreTransparencyText")}
            bg={"bg-[url(/shapes/folder-shape-tertiary.png)]"}
            zIndex={"z-[3]"}
            index={3}
          />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
