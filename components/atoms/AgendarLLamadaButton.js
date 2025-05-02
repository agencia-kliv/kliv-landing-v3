import { useTranslations } from "next-intl";
import Link from "next-intl/link";

export const AGENDAR_BUTTON_SIZES = {
  SMALL:
    "px-[34px] py-[14px] lg:py-[9px] lg:px-[22px] text-[24px] lg:text-[16px]",
  LARGE:
    "px-[40px] py-[16px] lg:py-[10px] lg:px-[28px] 2xl:px-[45px] 2xl:py-[16px] text-[24px] lg:text-[16px] 2xl:text-[25px]",
};

const AgendarLLamadaButton = ({ size = AGENDAR_BUTTON_SIZES.LARGE }) => {
  const t_globals = useTranslations("globals");

  return (
    <Link
      href={{ pathname: `/book-a-call` }}
      className={`text-white font-[700] tracking-[.04em]  grid place-items-center bg-kliv-tertiary rounded-full hover:bg-kliv-tertiary-hover transition-colors duration-150 ${size}`}
    >
      {t_globals("scheduleCall")}
    </Link>
  );
};

export default AgendarLLamadaButton;
