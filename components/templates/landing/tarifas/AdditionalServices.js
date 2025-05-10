import Button, { BUTTONS_VARIANTS } from "@/components/atoms/Button";
import HeadSection from "@/components/atoms/HeadSection";
import usePackageBillingData from "@/hooks/usePackageBillingData";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import RowItem from "./RowItem";

const AdditionalServiceCard = ({ service, index, packagesBillingData }) => {
  const router = useRouter();

  const t_pricing_additionalServices_features = useTranslations(
    "pricing.additionalServicesTab.features"
  );
  const t_pricing = useTranslations("pricing");

  return (
    <article
      key={service.id}
      data-aos="fade-down"
      data-aos-delay={index * 400}
      data-aos-duration={
        index === packagesBillingData.additionalServices.length - 1
          ? 2000
          : 1000
      }
      className="mb-[60px] h-[calc(100%-60px)] sm:h-auto sm:mb-none flex flex-col gap-[40px] items-stretch justify-between px-[25px] py-[40px] border-[2px] max-w-[90vw]  sm:max-w-none m-auto sm:m-[unset] border-kliv-primary rounded-[10px]"
    >
      <header className="flex flex-col gap-[30px]">
        <h4 className="text-[20px] leading-[26px] font-[500] text-kliv-text-1">
          {t_pricing_additionalServices_features(`${service.id}.name`)}
        </h4>
        <div className="flex items-center justify-center gap-[4px]">
          {service.sincePrice && (
            <span className="text-small font-[500] text-kliv-text-2">
              {t_pricing("from")}
            </span>
          )}
          <h5 className="text-[48px] leading-[62px] font-[500] text-kliv-text-2">
            {service.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h5>

          <span className="text-base font-[700] text-kliv-text-2">USD</span>
        </div>
      </header>

      <div className="flex flex-col gap-[15px] text-start flex-1">
        {service.features.map((feature, index) => (
          <RowItem key={index} type={feature.type} content={feature.content} />
        ))}
      </div>

      <footer className="w-full flex flex-col items-stretch">
        {service.sincePrice ? (
          <Button
            variant={BUTTONS_VARIANTS.OUTLINED}
            onClick={() => {
              router.push("#contactanos");
            }}
          >
            {t_pricing("quote")}
          </Button>
        ) : (
          <Button
            onClick={() => {
              router.push("#contactanos");
            }}
          >
            {t_pricing("contract")}
          </Button>
        )}
      </footer>
    </article>
  );
};

const AdditionalServices = () => {
  const { data: packagesBillingData } = usePackageBillingData();

  const t_pricing_additionalServices = useTranslations(
    "pricing.additionalServicesTab"
  );

  if (!packagesBillingData) return <></>;

  const cols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const gridCols = cols[packagesBillingData.additionalServices.length];

  return (
    <div className="landing-section-container text-center flex flex-col gap-[30px]">
      <HeadSection>{t_pricing_additionalServices("title")}</HeadSection>

      <section className={`hidden sm:grid ${gridCols} gap-[20px]`}>
        {packagesBillingData.additionalServices.map((service, index) => (
          <AdditionalServiceCard
            packagesBillingData={packagesBillingData}
            service={service}
            index={index}
            key={service.id}
          />
        ))}
      </section>

      <section className={`block sm:hidden ${gridCols} gap-[20px]`}>
        <Carousel
          // autoPlay={true}
          // infiniteLoop={true}
          // interval={5000}
          showArrows={false}
          // showIndicators={false}
          showStatus={false}
          showThumbs={false}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
          centerMode={false}
          emulateTouch={true}
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
          {packagesBillingData.additionalServices.map((service, index) => (
            <AdditionalServiceCard
              packagesBillingData={packagesBillingData}
              service={service}
              index={index}
              key={service.id}
            />
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default AdditionalServices;
