import { useTranslations } from "next-intl";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import BillingPlans from "../BillingPlans";
import { PricingCard } from "../TarifasSection";

const PackagesBilling = ({ packagesBillingData }) => {
  const [showMore, setShowMore] = useState(false);

  const t_pricing_packagesTab = useTranslations("pricing.packagesTab");
  const t_pricing_packagesTab_features = useTranslations(
    "pricing.packagesTab.features"
  );

  if (!packagesBillingData) return <></>;

  return (
    <>
      <p className="text-small lg:text-base">
        {t_pricing_packagesTab("title")}
      </p>
      <section className="hidden w-full flex-col gap-[40px] items-center sm:flex">
        <BillingPlans
          plans={packagesBillingData.packages}
          tFeatures={t_pricing_packagesTab_features}
          withItems={true}
          showMore={showMore}
          setShowMore={setShowMore}
          showOnlyStrongItems={true}
        />
      </section>
      <section className={`block sm:hidden gap-[20px]`}>
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
          {packagesBillingData.packages.items.map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              price={plan.price}
              sincePrice={plan.sincePrice}
              title={plan.name}
              features={packagesBillingData.packages.features}
              setShowMore={setShowMore}
              showMore={showMore}
              tFeatures={t_pricing_packagesTab_features}
              billingItems={packagesBillingData.packages.items}
            />
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default PackagesBilling;
