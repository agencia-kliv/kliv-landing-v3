import CarouselCustom from "@/components/atoms/CarouselCustom";
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

const TestimonialCard = ({ logo, name, company, position, video, text }) => {
  return (
    <div className="px-[20px] lg:px-[10px] mb-[50px] max-w-[350px] md:max-w-[400px] mx-auto">
      <div className="aspect-[0.68] w-full p-[20px_30px] md:p-[30px] pt-[50px] md:pt-[70px] lg:pt-[60px] flex flex-col gap-[20px] bg-[url(/shapes/vertical-upside-folder-shape-primary.png)] bg-no-repeat bg-contain bg-right-top">
        <header className="w-full flex gap-[20px] items-center [&_*]:pointer-events-none [&_*]:select-none">
          <figure className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full bg-white">
            <Image src={logo} alt={name} fill objectFit="contain" />
          </figure>

          <div className="flex flex-col items-start gap-[0px]">
            <h5 className="text-[22px] lg:text-[26px] font-[700] leading-[34px] text-white">
              {name}
            </h5>
            {(company || position) && (
              <div className="flex flex-col items-start">
                <h6 className="text-[18px] lg:text-[21px] font-[700] leading-[25px] text-white">
                  {company}
                </h6>
                {position && (
                  <span className="text-[18px] lg:text-[21px] font-[400] leading-[25px] text-white">
                    {position}
                  </span>
                )}
              </div>
            )}
          </div>
        </header>
        <section className=" flex-1 w-full overflow-auto">
          {video && (
            <video
              controls
              className="px-[30px] aspect-[4:5] h-full w-auto mx-auto object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
          {text && (
            <p className="text-[14px] text-left md:text-[16px] font-[400] leading-[23px] md:leading-[28px] text-white pointer-events-none select-none">
              {text}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const t = useTranslations("testimonials");

  return (
    <section className="landing-section-container">
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col items-center gap-[20px]">
          <LogitoSection />
          <SectionTitle>{t("title")}</SectionTitle>
        </div>
        <section className="block md:hidden">
          <CarouselCustom>
            <TestimonialCard
              logo={"/logos/camelinna.png"}
              company={"Camelinna"}
              name={"Lourdes H."}
              position={"CEO"}
              video={"/testimonials/camelinna.mp4"}
            />

            <TestimonialCard
              logo={"/testimonials/saniito.png"}
              company={"Saniito"}
              name={"Alejandro A."}
              position={"CEO"}
              text={t("saniito")}
            />
            <TestimonialCard
              logo={"/logos/memeca.png"}
              company={"Memeca"}
              name={"Natalia S."}
              position={"CEO"}
              video={"/testimonials/memeca.mp4"}
            />
            <TestimonialCard
              logo={"/testimonials/sol-millan.png"}
              //   company={"Sol Millán"}
              name={"Sol Millán."}
              //   position={"CEO"}
              text={t("solMillan")}
            />
            <TestimonialCard
              logo={"/logos/frenck.png"}
              company={"Frenck System"}
              name={"Javier F."}
              //   position={"CEO"}
              video={"/testimonials/frenck-system.mp4"}
            />
            <TestimonialCard
              logo={"/testimonials/valeria-rolicred.png"}
              company={"Rolicred"}
              name={"Valeria L."}
              //   position={"CEO"}
              text={t("rolicred")}
            />
            <TestimonialCard
              logo={"/logos/amalfi.png"}
              company={"Lima + Amalfi"}
              name={"Ignacio D."}
              //   position={"CEO"}
              video={"/testimonials/lima-amalfi.mp4"}
            />
            <TestimonialCard
              logo={"/logos/nexa.png"}
              company={"Nexa"}
              name={"Augusto F."}
              //   position={"CEO"}
              video={"/testimonials/nexa.mp4"}
            />
          </CarouselCustom>
        </section>
        <section className="hidden md:block">
          <CarouselCustom>
            <div className="flex gap-[0px] max-w-max mx-auto">
              <TestimonialCard
                logo={"/logos/camelinna.png"}
                company={"Camelinna"}
                name={"Lourdes H."}
                position={"CEO"}
                video={"/testimonials/camelinna.mp4"}
              />

              <TestimonialCard
                logo={"/testimonials/saniito.png"}
                company={"Saniito"}
                name={"Alejandro A."}
                position={"CEO"}
                text={t("saniito")}
              />
            </div>
            <div className="flex gap-[0px] max-w-max mx-auto">
              <TestimonialCard
                logo={"/logos/memeca.png"}
                company={"Memeca"}
                name={"Natalia S."}
                position={"CEO"}
                video={"/testimonials/memeca.mp4"}
              />
              <TestimonialCard
                logo={"/testimonials/sol-millan.png"}
                //   company={"Sol Millán"}
                name={"Sol Millán."}
                //   position={"CEO"}
                text={t("solMillan")}
              />
            </div>
            <div className="flex gap-[0px] max-w-max mx-auto">
              <TestimonialCard
                logo={"/logos/frenck.png"}
                company={"Frenck System"}
                name={"Javier F."}
                //   position={"CEO"}
                video={"/testimonials/frenck-system.mp4"}
              />
              <TestimonialCard
                logo={"/testimonials/valeria-rolicred.png"}
                company={"Rolicred"}
                name={"Valeria L."}
                //   position={"CEO"}
                text={t("rolicred")}
              />
            </div>
            <div className="flex gap-[0px] max-w-max mx-auto">
              <TestimonialCard
                logo={"/logos/amalfi.png"}
                company={"Lima + Amalfi"}
                name={"Ignacio D."}
                //   position={"CEO"}
                video={"/testimonials/lima-amalfi.mp4"}
              />
              <TestimonialCard
                logo={"/logos/nexa.png"}
                company={"Nexa"}
                name={"Augusto F."}
                //   position={"CEO"}
                video={"/testimonials/nexa.mp4"}
              />
            </div>
          </CarouselCustom>
        </section>
      </div>
    </section>
  );
};

export default TestimonialsSection;
