"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const SocialNetworkButton = ({ color, href, ...props }) => {
  return (
    <Link
      href={href}
      //open in new tab
      target="_blank"
      passHref={true}
      className={`text-[28px]  cursor-pointer p-[7px] lg:text-[16px] 2xl:text-[28px] rounded-full transition-all duration-300 ease-in-out ${
        color || "text-kliv-primary"
      }`}
    >
      {props.children}
    </Link>
  );
};

const Footer = () => {
  const t_footer = useTranslations("footer");

  return (
    <footer className="mt-auto">
      <div className="flex lg:hidden flex-col gap-[40px] w-full items-center py-[30px]">
        <div className="flex flex-col gap-[10px] w-full items-start px-[20px]">
          <div className="flex w-full justify-between items-center">
            © 2025 Agencia Kliv LLC
            <div className="flex gap-[5px]">
              <SocialNetworkButton href="https://www.instagram.com/agenciakliv/">
                <FaInstagram />
              </SocialNetworkButton>
              <SocialNetworkButton
                href={"https://www.linkedin.com/company/agencia-kliv/"}
              >
                <FaLinkedinIn />
              </SocialNetworkButton>
              {/* <SocialNetworkButton href="https://api.whatsapp.com/send/?phone=5493515504011&text&type=phone_number&app_absent=0">
            <FaWhatsapp />
          </SocialNetworkButton> */}
            </div>
          </div>
          <Link
            className="text-kliv-secondary font-[500] text-[14px] text-left leading-[38px]"
            href={{ pathname: `/politicas-de-privacidad` }}
          >
            {t_footer("privacyPolicy")} - {t_footer("termsAndConditions")}
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex flex-row gap-[25px] items-center max-w-[1350px] py-[30px] mx-auto w-full justify-between">
        <div className="flex gap-[25px] items-center">
          {/* <figure className="flex items-center relative justify-center w-[100px] h-[150px]">
            <Image fill src="/kliv-logo.svg" alt="Kliv" />
          </figure> */}
          © 2025 Agencia Kliv LLC
          <Link
            className="text-kliv-secondary font-[500] text-[22px] lg:text-[16px] 2xl:text-[14px] text-center leading-[38px]"
            href={{ pathname: `/politicas-de-privacidad` }}
          >
            {t_footer("privacyPolicy")} - {t_footer("termsAndConditions")}
          </Link>
        </div>
        <div className="flex gap-[20px] lg:gap-[10px]">
          <SocialNetworkButton href="https://www.instagram.com/agenciakliv/">
            <FaInstagram />
          </SocialNetworkButton>
          <SocialNetworkButton
            href={"https://www.linkedin.com/company/agencia-kliv/"}
          >
            <FaLinkedinIn />
          </SocialNetworkButton>
          {/* <SocialNetworkButton href="https://api.whatsapp.com/send/?phone=5493515504011&text&type=phone_number&app_absent=0">
            <FaWhatsapp />
          </SocialNetworkButton> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
