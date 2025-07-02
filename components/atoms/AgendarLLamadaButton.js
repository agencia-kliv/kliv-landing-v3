import { useTranslations } from "next-intl";
import Link from "next-intl/link";

export const AGENDAR_BUTTON_SIZES = {
  SMALL:
    "px-[34px] py-[14px] lg:py-[9px] lg:px-[22px] text-[16px] lg:text-[16px]",
  LARGE:
    "px-[34px] py-[14px] lg:py-[9px] lg:px-[22px] text-[16px] lg:text-[16px]",
};

const AgendarLLamadaButton = ({
  size = AGENDAR_BUTTON_SIZES.LARGE,
  definitive,
}) => {
  const t_globals = useTranslations("globals");

  return (
    <Link
      scroll={true}
      href={definitive ? { pathname: `/book-a-call` } : { pathname: `/quiz` }}
      className={`text-white font-[500] min-w-[200px] tracking-[.04em]  grid place-items-center bg-kliv-tertiary rounded-full hover:bg-kliv-tertiary-hover transition-colors duration-150 ${size}`}
    >
      {t_globals("scheduleCall")}
    </Link>
  );
};

export default AgendarLLamadaButton;
