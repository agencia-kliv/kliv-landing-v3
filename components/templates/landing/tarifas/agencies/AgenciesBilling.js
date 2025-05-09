import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import BillingPlans from "../BillingPlans";
import { PricingCard } from "../TarifasSection";

const AgenciesBilling = ({ packagesBillingData }) => {
  const [showMore, setShowMore] = useState(false);

  const t_pricing_agenciesTab = useTranslations("pricing.agenciesTab");
  const t_pricing_agenciesTab_features = useTranslations(
    "pricing.agenciesTab.features"
  );

  if (!packagesBillingData) return <></>;

  return (
    <>
      <SectionSubtitle className="text-center">
        {t_pricing_agenciesTab("title")}
      </SectionSubtitle>
      <section className="hidden flex-col gap-[40px] items-center sm:flex w-full">
        <BillingPlans
          plans={packagesBillingData.agencies}
          forceShow={true}
          tFeatures={t_pricing_agenciesTab_features}
        />
      </section>
      <section className="flex flex-col gap-[40px] items-center sm:hidden">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          centerMode={false}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
          // emulateTouch={true}
          width={"100vw"}
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
          {packagesBillingData.agencies.items.map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              price={plan.price}
              sincePrice={plan.sincePrice}
              title={plan.name}
              features={packagesBillingData.agencies.features}
              setShowMore={setShowMore}
              showMore={showMore}
              tFeatures={t_pricing_agenciesTab_features}
              billingItems={packagesBillingData.agencies.items}
            />
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default AgenciesBilling;
