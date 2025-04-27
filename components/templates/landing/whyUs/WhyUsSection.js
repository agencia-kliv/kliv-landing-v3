import HeadSection from "@/components/atoms/HeadSection";
import { useTranslations } from "next-intl";
import { Carousel } from "react-responsive-carousel";
import { WhyUsCard } from "./WhyUsCard";
import { whyUsData } from "./whyUsData";

const WhyUsSection = () => {
  const t_whyUs = useTranslations("whyUs");

  return (
    <section
      className="landing-section-container"
      data-aos="fade-up"
      data-aos-delay={400}
    >
      <section className="flex flex-col gap-[30px] sm:gap-[50px] items-center w-full">
        <HeadSection className="text-kliv-conciencia max-w-[470px]">
          {t_whyUs("title")}
        </HeadSection>

        <section className="hidden flex w-full flex-col sm:grid sm:grid-cols-whyUs gap-[0px] sm:gap-[20px]">
          {whyUsData?.map((item) => (
            <WhyUsCard key={item.key} tKey={item.key} icon={item.icon} />
          ))}
        </section>

        <section className="lg:hidden">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            showArrows={false}
            // showIndicators={false}
            showStatus={false}
            showThumbs={false}
            centerMode={false}
            emulateTouch={true}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
            width={"90vw"}
            renderIndicator={(clickHandler, isSelected, index, label) => {
              //return dots in gray non-selected and in kliv-primary selected
              return (
                <span
                  onClick={clickHandler}
                  key={index}
                  title={label}
                  className={`inline-block w-[10px] cursor-pointer h-[10px] rounded-full mx-[8px] ${
                    isSelected ? "bg-kliv-primary" : "bg-kliv-text-6"
                  }`}
                ></span>
              );
            }}
          >
            {whyUsData?.map((item, index) => (
              <WhyUsCard key={item.key} tKey={item.key} icon={item.icon} />
            ))}
          </Carousel>
        </section>
      </section>
    </section>
  );
};

export default WhyUsSection;
