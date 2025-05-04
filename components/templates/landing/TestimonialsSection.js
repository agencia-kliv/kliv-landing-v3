import CarouselCustom from "@/components/atoms/CarouselCustom";
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

const TestimonialCard = ({ logo, name, company, position, video, text }) => {
  return (
    <div className="w-full flex-1 px-[10px] lg:px-[10px] mb-[50px] max-w-[450px] md:max-w-[400px] lg:max-w-[450px] mx-auto">
      <div className="aspect-[0.68] w-full p-[20px_30px] md:p-[30px] flex flex-col gap-[30px] border-[2px] border-kliv-primary rounded-[30px]">
        <header className="w-full flex flex-col gap-[10px] items-start [&_*]:pointer-events-none [&_*]:select-none">
          <figure className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full bg-white">
            <Image src={logo} alt={name} fill objectFit="contain" />
          </figure>

          <div className="flex flex-col items-start gap-[0px]">
            <h5 className="text-[22px] lg:text-[18px] font-[700] text-kliv-primary">
              {name}
            </h5>
            {(company || position) && (
              <div className="flex flex-col items-start">
                <h6 className="text-[18px] lg:text-[18px] font-[400] leading-[25px] text-kliv-primary">
                  {company}
                </h6>
                {position && (
                  <span className="text-[18px] lg:text-[21px] font-[400] leading-[25px] text-kliv-primary">
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
              className="px-[30px] aspect-[5_/_4] h-full w-auto mx-auto object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
          {text && (
            <p className="text-[14px] sm:text-[18px] sm:leading-normal text-left md:text-[16px] 2xl:text-[16px] font-[400] leading-[23px] md:leading-[28px] 2xl:leading-normal text-kliv-text-2 pointer-events-none select-none">
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
        <section className="hidden lg:block">
          <CarouselCustom>
            <div className="flex gap-[0px] max-w-max mx-auto">
              <TestimonialCard
                logo={"/logos/camelinna.png"}
                company={"Camelinna"}
                name={"Lourdes H."}
                // position={"CEO"}
                video={"/testimonials/camelinna.mp4"}
              />

              <TestimonialCard
                logo={"/testimonials/saniito.png"}
                company={"Saniito"}
                name={"Alejandro A."}
                // position={"CEO"}
                text={t("saniito")}
              />
              <TestimonialCard
                logo={"/logos/memeca.png"}
                company={"Memeca"}
                name={"Natalia S."}
                // position={"CEO"}
                video={"/testimonials/memeca.mp4"}
              />
            </div>
            <div className="flex gap-[0px] max-w-max mx-auto">
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
            </div>
            <div className="flex gap-[0px] max-w-max mx-auto">
              <TestimonialCard
                logo={"/logos/amalfi.png"}
                company={"Lima + Amalfi"}
                name={"Ignacio D."}
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
