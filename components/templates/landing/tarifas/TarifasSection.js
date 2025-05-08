"use client";
import Button, { BUTTONS_VARIANTS } from "@/components/atoms/Button";
import LabelButton from "@/components/atoms/LabelButton";
import LogitoSection from "@/components/atoms/LogitoSection";
import PillFilter from "@/components/atoms/PillFilter";
import SectionTag from "@/components/atoms/SectionTag";
import SectionTitle from "@/components/atoms/SectionTitle";
import usePackageBillingData from "@/hooks/usePackageBillingData";
import { Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import BillingFeatures from "./BillingFeatures";
import AgenciesBilling from "./agencies/AgenciesBilling";
import PackagesBilling from "./packages/PackagesBilling";
import PaidMediaBilling from "./paidMedia/PaidMediaBilling";

export const TARIFAS_TABS = {
  PAQUETES: "PAQUETES",
  PAID_MEDIA: "PAID_MEDIA",
  AGENCIAS: "AGENCIAS",
};

export const PricingCard = ({
  title,
  price,
  id,
  sincePrice,
  features,
  showMore,
  billingItems,
  setShowMore,
  tFeatures,
}) => {
  const pricingCardRef = useRef();

  const t_pricing = useTranslations("pricing");

  return (
    <article
      ref={pricingCardRef}
      className="bg-white relative rounded-[10px] max-w-[90vw] border-[2px] border-kliv-primary m-auto h-auto mb-[40px] sm:mb-none flex flex-col items-stretch"
    >
      <div className="p-[15px] sticky top-[20px] left-0 pb-[30px] flex flex-col items-stretch text-center gap-[20px] w-full">
        <h5 className="head-h5">{title}</h5>

        {id !== "enterprise" ? (
          <div className="flex flex-col items-center">
            <div className="flex gap-[5px] items-end">
              {sincePrice && (
                <p className="text-base font-[500] text-gray-500">
                  {t_pricing("from")}
                </p>
              )}
              <p className="font-[500] text-[22px] leading-[28px] text-kliv-text-2">
                {/* show price with thousand dot */}
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} USD
              </p>
              {/* <p className="text-base">
                <strong>USD</strong>
              </p> */}
              <p className="text-base font-[500] text-gray-500">
                {t_pricing("perMonth")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-[5px]">
            <p className="font-[500] text-[22px] leading-[28px] text-kliv-text-2">
              {price}
            </p>
          </div>
        )}

        <footer className="flex flex-col items-stretch w-full">
          {id !== "enterprise" ? (
            <Button
              className="flex-1"
              onClick={() => {
                router.push("#contactanos");
              }}
            >
              {t_pricing("startNow")}
            </Button>
          ) : (
            <Button
              className="flex-1"
              variant={BUTTONS_VARIANTS.OUTLINED}
              onClick={() => {
                router.push("#contactanos");
              }}
            >
              {t_pricing("quote")}
            </Button>
          )}
        </footer>
      </div>

      <table className="flex flex-col items-stretch my-[20px]  lg:border-t">
        <BillingFeatures
          billingFeatures={features}
          showOnlyStrongItems={true}
          showAllItems={showMore}
          onlyKey={id}
          billingItems={billingItems}
          t={tFeatures}
          cols={"grid-cols-2"}
        />
      </table>

      <div className="p-[20px]">
        <LabelButton
          onClick={() => {
            setShowMore(!showMore);
            //scroll to plans-container plus 100px further up

            pricingCardRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          {showMore ? t_pricing("shrink") : t_pricing("expand")}
        </LabelButton>
      </div>
    </article>
  );
};

export const PricingRowTitle = ({ title, price, id, sincePrice }) => {
  const router = useRouter();

  const t_pricing = useTranslations("pricing");

  return (
    <td className="bg-white w-full p-[20px]">
      <div className="flex flex-col items-stretch text-center gap-[13px] w-full">
        <h5 className="text-base">{title}</h5>

        {id !== "enterprise" ? (
          <div className="flex flex-col items-center">
            <div className="flex gap-[5px] items-end">
              {sincePrice && (
                <p className="text-base font-[500] text-gray-500">
                  {t_pricing("from")}
                </p>
              )}
              <p className="font-[500] head-h5 leading-[28px] text-kliv-text-2">
                {/* show price with thousand dot */}
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} USD
              </p>
              {/* <p className="text-base">
                <strong>USD</strong>
              </p> */}
              <p className="text-base font-[500] text-gray-500">
                {t_pricing("perMonth")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-[5px]">
            <p className="font-[500] head-h5 leading-[28px] text-kliv-text-2">
              {price}
            </p>
          </div>
        )}

        <footer className="flex flex-col items-stretch w-full">
          {id !== "enterprise" ? (
            <Button
              className="flex-1"
              onClick={() => {
                router.push("#contactanos");
              }}
            >
              {t_pricing("startNow")}
            </Button>
          ) : (
            <Button
              className="flex-1"
              variant={BUTTONS_VARIANTS.OUTLINED}
              onClick={() => {
                router.push("#contactanos");
              }}
            >
              {t_pricing("quote")}
            </Button>
          )}
        </footer>
      </div>
    </td>
  );
};

export const FeaturesHeaderGrid = ({
  gridCols,
  isStrong,
  children,
  description,
  ...props
}) => {
  const titleColor = isStrong ? "text-kliv-primary" : "text-kliv-primary-dark";

  const [innerWidth, setInnerWidth] = useState(0);

  const handleResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Container = ({ children }) => {
    return description && !description?.includes(".description") ? (
      <Tooltip
        title={
          <span className="text-tiny--white font-DM Sans">{description}</span>
        }
        placement={innerWidth > 1270 ? "left" : "bottom"}
        // disableInteractive={true}
      >
        {children}
      </Tooltip>
    ) : (
      <>{children}</>
    );
  };

  return (
    <Container>
      <td
        className={`p-[15px] bg-kliv-sand flex items-center relative z-10 justify-center `}
        {...props}
      >
        <h5
          className={`${titleColor} font-[500] ${
            isStrong ? "text-small lg:head-h5" : "text-[12px] lg:text-small"
          } leading-[18px] text-center `}
        >
          {children}
        </h5>
      </td>
    </Container>
  );
};

export const FeaturesRowGrid = ({ children }) => {
  return (
    <td className={`p-[15px] bg-white flex items-center justify-center`}>
      {children}
    </td>
  );
};

const TarifasSection = () => {
  const [selectedTab, setSelectedTab] = useState(TARIFAS_TABS.PAID_MEDIA);

  const t_pricing = useTranslations("pricing");
  const t_header = useTranslations("header");

  const { data: packagesBillingData } = usePackageBillingData();

  const SelectedBillingSection = useCallback(() => {
    switch (selectedTab) {
      case TARIFAS_TABS.PAQUETES:
        return <PackagesBilling packagesBillingData={packagesBillingData} />;
      case TARIFAS_TABS.PAID_MEDIA:
        return (
          <PaidMediaBilling pricesByCampaign={packagesBillingData?.campaigns} />
        );
      case TARIFAS_TABS.AGENCIAS:
        return <AgenciesBilling packagesBillingData={packagesBillingData} />;
      default:
        return PackagesBilling;
    }
  }, [selectedTab, packagesBillingData]);

  return (
    <>
      <section
        className="bg-kliv-sand"
        id="tarifas"
        data-aos="fade-up"
        data-section="tarifas"
      >
        <div className="landing-section-container-large ">
          <div className="relative flex flex-col gap-[22px] items-center ">
            <SectionTag>{t_header("pricing")}</SectionTag>
            <LogitoSection />
            <SectionTitle className="max-w-[440px] text-center">
              {t_pricing("title")}
            </SectionTitle>
            <nav className="flex gap-[20px] items-center justify-center">
              {/* <PillFilter
              isActive={selectedTab === TARIFAS_TABS.PAQUETES}
              onClick={() => setSelectedTab(TARIFAS_TABS.PAQUETES)}
            >
              {t_pricing("packages")}
            </PillFilter> */}
              <PillFilter
                isActive={selectedTab === TARIFAS_TABS.PAID_MEDIA}
                onClick={() => setSelectedTab(TARIFAS_TABS.PAID_MEDIA)}
              >
                {t_pricing("paidMedia")}
              </PillFilter>
              <PillFilter
                isActive={selectedTab === TARIFAS_TABS.AGENCIAS}
                onClick={() => setSelectedTab(TARIFAS_TABS.AGENCIAS)}
              >
                {t_pricing("agencies")}
              </PillFilter>
            </nav>

            <SelectedBillingSection />
          </div>
        </div>
      </section>
      {/* <section className="">
        <AdditionalServices />
      </section> */}
    </>
  );
};

export default TarifasSection;
