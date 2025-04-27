"use client";

import { useTranslations } from "next-intl";

export const WhyUsCard = ({ tKey, icon }) => {
  const t_whyUs_cards = useTranslations(`whyUs.cards.${tKey}`);

  return (
    <article className="relative flex p-[15px] gap-[15px] rounded-[10px] mb-[50px] flex-col items-center lg:items-start lg:flex-row lg:mb-0">
      <figure
        className={`text-[64px] lg:text-[44px] text-kliv-primary flex-shrink-0`}
      >
        {icon}
      </figure>
      <div className="flex flex-col gap-[2px]">
        <h3
          className={`title head-h5 leading-[26px] font-[500] text-kliv-primary`}
        >
          {t_whyUs_cards("title")}
        </h3>
        <p className="description text-small text-kliv-text-3 leading-[24px]">
          {t_whyUs_cards("content")}
        </p>
      </div>
    </article>
  );
};
