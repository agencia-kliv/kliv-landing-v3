import LabelButton from "@/components/atoms/LabelButton";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import BillingFeatures from "./BillingFeatures";
import { PricingRowTitle } from "./TarifasSection";

const BillingPlans = ({
  plans,
  withItems,
  showMore,
  setShowMore,
  showOnlyStrongItems,
  forceShow,
  tTab,
  tFeatures,
}) => {
  const t_pricing = useTranslations("pricing");

  const cols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const plansContainerRef = useRef(null);

  const gridCols = cols[plans.items.length + 1];

  return (
    <>
      <div
        className={` ${
          showOnlyStrongItems
            ? ""
            : showMore || forceShow
            ? "h-auto"
            : "h-[495px] [mask-image:_linear-gradient(to_bottom,_black_calc(100%-0px),transparent_100%)]"
        }`}
      >
        <section className="border-[2px] border-kliv-primary rounded-[10px] ">
          <table
            ref={plansContainerRef}
            className={`w-full relative  gap-[1px] p-[1px] rounded-[10px]`}
          >
            <thead
              className={`${
                showMore ? "sticky z-30 top-[57px] lg:top-[60px]" : ""
              } left-0 `}
            >
              <tr className={`w-full grid ${gridCols} z-30`}>
                <td className="bg-white w-full p-[20px]"></td>
                {plans.items.map((plan) => (
                  <PricingRowTitle
                    sincePrice={plan.sincePrice}
                    title={plan.name}
                    key={plan.id}
                    id={plan.id}
                    price={plan.price}
                  />
                ))}
              </tr>
            </thead>

            <BillingFeatures
              billingFeatures={plans.features}
              t={tFeatures}
              cols={gridCols}
              showOnlyStrongItems={showOnlyStrongItems}
              showAllItems={showMore}
              billingItems={plans.items}
            />
          </table>
        </section>

        {withItems && showMore && (
          <footer className="flex flex-col items-center text-center py-[20px]">
            <p className="text-tiny text-kliv-text-4">{t_pricing("item1")}</p>

            <p className="text-tiny text-kliv-text-4">{t_pricing("item2")}</p>

            <p className="text-tiny text-kliv-text-4">{t_pricing("item3")}</p>

            <p className="text-tiny text-kliv-text-4">{t_pricing("item4")}</p>

            <p className="text-tiny text-kliv-text-4">{t_pricing("item5")}</p>
          </footer>
        )}
      </div>
      {!forceShow && (
        <LabelButton
          onClick={() => {
            setShowMore(!showMore);
            //scroll to plans-container plus 100px further up

            plansContainerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          {showMore ? t_pricing("shrink") : t_pricing("expand")}
        </LabelButton>
      )}
    </>
  );
};

export default BillingPlans;
