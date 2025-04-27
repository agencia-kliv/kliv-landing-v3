import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = useLocale();

  const changeLanguage = (newLocale) => {
    // change the locale

    router.push(
      `/${newLocale}/${pathname.replace(`/${currentLanguage}`, "") || ""}`
    );
  };

  return (
    <div
      className="flex items-center gap-[0px] text-kliv-secondary underline-offset-[2px] [&_*]:font-[500] cursor-pointer hover:underline"
      onClick={() => {
        if (currentLanguage === "en") changeLanguage("es");
        else changeLanguage("en");
      }}
    >
      {currentLanguage === "en" ? (
        <span className="w-[60px]">
          <u>EN</u>
          {" / ES "}
        </span>
      ) : (
        <span className="w-[60px]">
          {" EN / "}
          <u>ES</u>
        </span>
      )}
    </div>
  );
};

export default LocaleSwitcher;
