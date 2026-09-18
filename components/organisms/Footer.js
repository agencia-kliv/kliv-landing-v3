"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BUSINESS } from "@/data/business";

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
    <footer className="mt-auto border-t border-kliv-primary/10 bg-kliv-lightgreen text-kliv-secondary">
      <div className="mx-auto max-w-[1350px] px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid gap-7 md:grid-cols-[1fr_1fr_auto] md:gap-10">
          <div>
            <p className="mb-3 text-[18px] font-semibold">{BUSINESS.name}</p>
            <address className="not-italic text-[14px] leading-6 text-kliv-secondary/75">
              <span className="block">{BUSINESS.address.streetAddress}</span>
              <span className="block">{BUSINESS.address.postalCode} · {BUSINESS.address.addressLocality}, Argentina</span>
            </address>
          </div>
          <div className="flex flex-col items-start gap-2 text-[14px] leading-6 md:pt-1">
            <a className="transition-colors hover:text-kliv-primary hover:underline underline-offset-4" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
            <a className="text-kliv-secondary/75 transition-colors hover:text-kliv-primary hover:underline underline-offset-4" href={`tel:${BUSINESS.telephone}`}>
              {BUSINESS.displayTelephone}
            </a>
          </div>
          <div className="flex items-start gap-3 md:pt-1">
            <a href="https://www.instagram.com/agenciakliv/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-kliv-primary/20 text-[20px] text-kliv-primary transition-colors hover:bg-kliv-primary/10">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/agencia-kliv/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-kliv-primary/20 text-[20px] text-kliv-primary transition-colors hover:bg-kliv-primary/10">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="mt-7 flex flex-col gap-3 border-t border-kliv-primary/10 pt-5 text-[12px] leading-5 text-kliv-secondary/65 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Agencia Kliv LLC</span>
          <Link className="transition-colors hover:text-kliv-primary" href={{ pathname: "/politicas-de-privacidad" }}>
            {t_footer("privacyPolicy")} · {t_footer("termsAndConditions")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
