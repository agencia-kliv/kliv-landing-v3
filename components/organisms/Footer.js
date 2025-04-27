"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const SocialNetworkButton = ({ color, href, ...props }) => {
  return (
    <Link
      href={href}
      //open in new tab
      target="_blank"
      passHref={true}
      className={`text-[28px] cursor-pointer p-[7px] hover:bg-[#ffffff11] rounded-[5px] transition-all duration-300 ease-in-out ${
        color || "text-white"
      }`}
    >
      {props.children}
    </Link>
  );
};

const Footer = () => {
  const t_footer = useTranslations("footer");

  return (
    <footer className="bg-gradient-radial-green p-[20px] py-[40px] sm:p-0 sm:px-[50px] sm:pt-[40px] sm:pb-[80px] flex flex-col gap-[30px] items-center">
      <section className="flex flex-col gap-[20px] sm:gap-0 sm:grid sm:grid-cols-footer items-center w-full">
        <img width={"112"} src="/kliv-logo-blanco.png" alt="Kliv" />
        <div className="flex flex-col gap-[10px] items-center">
          <p className="text-white leading-[20px] text-center">
            {t_footer("address")}
          </p>
        </div>
        <div className="flex gap-[5px]">
          {/* <SocialNetworkButton href={"https://www.facebook.com/AgenciaKLIV"}>
            <FaLinkedinIn />
          </SocialNetworkButton> */}
          <SocialNetworkButton href="https://www.instagram.com/agenciakliv/">
            <FaInstagram />
          </SocialNetworkButton>
          <SocialNetworkButton href="https://www.facebook.com/AgenciaKLIV">
            <FaFacebookF />
          </SocialNetworkButton>
          <SocialNetworkButton href="https://api.whatsapp.com/send/?phone=5493515504011&text&type=phone_number&app_absent=0">
            <FaWhatsapp />
          </SocialNetworkButton>
        </div>
      </section>

      <Link
        className="text-white"
        href={{ pathname: `/politicas-de-privacidad` }}
      >
        {t_footer("privacyPolicy")}
      </Link>
    </footer>
  );
};

export default Footer;
