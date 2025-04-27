import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTag from "@/components/atoms/SectionTag";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CardItem = ({ title, description, image, bg, zIndex, index }) => {
  return (
    <article
      className={`2xl:min-w-[483px] 2xl:[&:not(:last-child)]:pr-[90px] lg:min-w-[340px] lg:[&:not(:last-child)]:pr-[50px] flex flex-col relative items-center gap-[30px] p-[50px] [&:not(:last-child)]:pb-[130px] lg:[&:not(:last-child)]:pb-[60px] 2xl:[&:not(:last-child)]:pb-[110px] pb-[90px] mb-[-80px] lg:mb-0 lg:p-[30px] 2xl:p-[40px] lg:pt-[50px] 2xl:pt-[70px] rounded-[28px] lg:rounded-[18px] 2xl:rounded-[28px] ${zIndex} ${bg} bg-no-repeat bg-cover bg-right-top`}
    >
      <div className="pt-[20px] h-[80px] w-[80px] 2xl:w-[100px] 2xl:h-[100px] relative ">
        <Image src={image} alt={title} fill />
      </div>

      <div className="flex flex-col items-center gap-[13px]">
        <h3 className="text-[22px] lg:text-[16px] 2xl:text-[22px] font-[700] text-white">
          {title}
        </h3>
        <p className="text-[22px] lg:text-[16px] 2xl:text-[22px] font-[400] text-white max-w-[350px]">
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
        <SectionTag>{t_header("services")}</SectionTag>
        <div className="w-full flex flex-col gap-[50px] 2xl:gap-[60px] items-center text-center">
          <div className="w-full flex flex-col gap-[32px] items-center">
            <div className="w-full flex flex-col gap-[22px] items-center">
              <LogitoSection />
              <SectionTitle className={"max-w-[523px] 2xl:max-w-[605px]"}>
                {t_services("title")}
              </SectionTitle>
            </div>
            <div className="flex flex-col gap-[30px] text-center items-center max-w-[439px] lg:max-w-[490px] 2xl:max-w-[715px]">
              <SectionSubtitle>{t_services("subtitle")}</SectionSubtitle>
              <SectionSubtitle className={"font-[700]"}>
                {t_services("perks")}
              </SectionSubtitle>
            </div>
          </div>

          {/* ads logos */}
          <div className="gap-[5px] grid grid-cols-3 w-full max-w-[400px] 2xl:max-w-[600px]">
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
              <Image
                src={"/images/linkedin_logo.png"}
                alt="LinkedIn Ads"
                fill={true}
              />
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-3 items-stretch relative max-w-[466px] lg:max-w-[936px] 2xl:max-w-max">
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
