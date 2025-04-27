import AgendarLLamadaButton, {
  AGENDAR_BUTTON_SIZES,
} from "@/components/atoms/AgendarLLamadaButton";
import Slider from "@/components/atoms/Slider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PaidMediaBilling = ({ pricesByCampaign }) => {
  const [value, setValue] = useState(0);

  const router = useRouter();

  const t_pricing_paidMediaTab = useTranslations("pricing.paidMediaTab");
  const t_pricing = useTranslations("pricing");

  if (!pricesByCampaign) return <></>;

  return (
    <>
      {/* <p className="text-base">{t_pricing_paidMediaTab("title")}</p> */}
      <section className="max-w-[600px]  p-[40px] flex flex-col gap-[40px] items-center text-center rounded-[10px] w-full">
        <h4 className="text-[28px] font-[500] leading-[36px]">
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
          <div className="flex gap-[4px] items-center text-center text-kliv-tertiary">
            {pricesByCampaign[value].price * pricesByCampaign[value].amount >
              0 && (
              <h5 className="font-[900] text-[48px] leading-[62px]">
                {pricesByCampaign[value].price * pricesByCampaign[value].amount}
              </h5>
            )}
            {pricesByCampaign[value].price * pricesByCampaign[value].amount >
              0 && <span className="text-[22px] font-[800]">USD</span>}
          </div>

          {pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0 && (
            <p className="leading-[24px] text-kliv-tertiary text-[20px] mb-[20px]">
              {t_pricing("perMonth")}
            </p>
          )}

          {!(
            pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0
          ) && (
            <p className="text-base leading-[24px]">
              {t_pricing_paidMediaTab("notSelectedTitle")}
            </p>
          )}

          <p className="text-base leading-[24px]">
            {pricesByCampaign[value].price * pricesByCampaign[value].amount >
            0 ? (
              <>
                {t_pricing_paidMediaTab.rich("selectedCampaigns", {
                  off: pricesByCampaign[value].off || 0,
                  price: pricesByCampaign[value].price,
                  strong: (str) => <strong>{str}</strong>,
                })}
              </>
            ) : (
              <strong>{t_pricing_paidMediaTab("notSelectedSubtitle")}</strong>
            )}
          </p>
        </div>

        <footer>
          <AgendarLLamadaButton size={AGENDAR_BUTTON_SIZES.SMALL} />
        </footer>
      </section>
    </>
  );
};

export default PaidMediaBilling;
