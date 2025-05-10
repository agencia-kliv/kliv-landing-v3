import AgendarLLamadaButton, {
  AGENDAR_BUTTON_SIZES,
} from "@/components/atoms/AgendarLLamadaButton";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import Slider from "@/components/atoms/Slider";
import { useTranslations } from "next-intl";
import { useState } from "react";

const PaidMediaBilling = ({ pricesByCampaign }) => {
  const [value, setValue] = useState(0);

  const t_pricing_paidMediaTab = useTranslations("pricing.paidMediaTab");
  const t_pricing = useTranslations("pricing");

  if (!pricesByCampaign) return <></>;

  return (
    <>
      {/* <p className="text-base">{t_pricing_paidMediaTab("title")}</p> */}
      <section className="max-w-[580px] p-[0px] md:p-[40px] flex flex-col gap-[40px] items-center text-center rounded-[10px] w-full">
        <h4 className="text-[28px] font-[700] leading-[36px]">
          {t_pricing_paidMediaTab.rich("campaignByMonth", {
            campaigns: pricesByCampaign[value].amount,
          })}
        </h4>
        <Slider
          min={0}
          max={4}
          step={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col gap-[0px] items-center text-center">
          {pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0 && (
            <div className="flex gap-[4px] items-center text-center text-kliv-tertiary">
              {pricesByCampaign[value].price * pricesByCampaign[value].amount >
                0 && (
                <h5 className="font-[900] text-[48px] leading-[62px]">
                  {pricesByCampaign[value].price *
                    pricesByCampaign[value].amount}
                </h5>
              )}
              {pricesByCampaign[value].price * pricesByCampaign[value].amount >
                0 && <span className="text-[22px] font-[800]">USD</span>}
            </div>
          )}

          {pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0 && (
            <SectionSubtitle className="text-kliv-tertiary mb-[20px]">
              {t_pricing("perMonth")}
            </SectionSubtitle>
          )}

          {!(
            pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0
          ) && (
            <div className="flex flex-col gap-[20px]">
              <SectionSubtitle className="">
                {t_pricing_paidMediaTab("notSelectedTitle")}
              </SectionSubtitle>
              <SectionSubtitle className="font-[600]">
                {t_pricing_paidMediaTab("notSelectedSubtitle")}
              </SectionSubtitle>
            </div>
          )}

          {pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0 && (
            <p className="text-base leading-[24px]">
              {t_pricing_paidMediaTab.rich("selectedCampaigns", {
                off: pricesByCampaign[value].off || 0,
                price: pricesByCampaign[value].price,
                strong: (str) => <strong>{str}</strong>,
              })}
            </p>
          )}
        </div>

        <footer>
          <AgendarLLamadaButton size={AGENDAR_BUTTON_SIZES.SMALL} />
        </footer>
      </section>
    </>
  );
};

export default PaidMediaBilling;
