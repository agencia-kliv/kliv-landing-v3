import { useTranslations } from "next-intl";
import Link from "next-intl/link";

export const AGENDAR_BUTTON_SIZES = {
  SMALL:
    "px-[34px] py-[14px] lg:py-[9px] lg:px-[22px] text-[24px] lg:text-[16px]",
  LARGE:
    "px-[30px] py-[15px] lg:py-[10px] lg:px-[28px] 2xl:px-[30px] 2xl:py-[12px] text-[18px] lg:text-[16px] 2xl:text-[22px]",
};

const AgendarLLamadaButton = ({ size = AGENDAR_BUTTON_SIZES.LARGE }) => {
  const t_globals = useTranslations("globals");

  return (
    <Link
      href={{ pathname: `/book-a-call` }}
      className={`text-white font-[500] tracking-[.04em]  grid place-items-center bg-kliv-tertiary rounded-full hover:bg-kliv-tertiary-hover transition-colors duration-150 ${size}`}
    >
      {t_globals("scheduleCall")}
    </Link>
  );
};

export default AgendarLLamadaButton;
