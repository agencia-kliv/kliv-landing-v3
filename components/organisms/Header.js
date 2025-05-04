"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";
import AgendarLLamadaButton, {
  AGENDAR_BUTTON_SIZES,
} from "../atoms/AgendarLLamadaButton";
import LocaleSwitcher from "../atoms/LocaleSwitcher";
import TabItem from "../atoms/TabItem";
import { SocialNetworkButton } from "./Footer";

const Header = () => {
  const router = useRouter();

  const t_header = useTranslations("header");

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [activeSection, setActiveSection] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    //create new instance and pass a callback function
    observer.current = new IntersectionObserver((entries) => {
      const visibleSection = entries.find(
        (entry) => entry.isIntersecting
      )?.target;
      //Update state with the visible section ID
      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    });

    //Get custom attribute data-section from all sections
    const sections = document.querySelectorAll("[data-section]");

    sections.forEach((section) => {
      observer.current.observe(section);
    });
    //Cleanup function to remove observer
    return () => {
      sections.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <header className="px-[20px] sticky top-0 z-50  bg-white min-h-[70px] lg:min-h-[70px] 2xl:min-h-[80px] flex w-full lg:px-[40px] shadow-md">
        <div className="max-w-[1350px] lg:px-[15px] flex justify-between grid-cols-header items-center lg:grid m-auto w-full">
          <Link href={"/"}>
            <Image
              width={"115"}
              height={"43"}
              src="/kliv-logo.svg"
              alt="Kliv"
            />
          </Link>

          <nav className="hidden items-center justify-center lg:flex gap-[60px]">
            <TabItem
              href={"/#servicios"}
              isActive={activeSection === "servicios"}
            >
              {t_header("services")}
            </TabItem>
            <TabItem
              href={"/#trayectoria"}
              isActive={activeSection === "trayectoria"}
            >
              {t_header("trajectory")}
            </TabItem>
            <TabItem href={"/#tarifas"} isActive={activeSection === "tarifas"}>
              {t_header("pricing")}
            </TabItem>
            {/* <TabItem
              href={"/#nosotros"}
              isActive={activeSection === "nosotros"}
            >
              {t_header("aboutUs")}
            </TabItem>
            <TabItem
              href={"/#nuestros-socios"}
              isActive={activeSection === "nuestros-socios"}
            >
              {t_header("ourPartners")}
            </TabItem> */}
          </nav>

          <span className="hidden"></span>

          <div className="flex w-full items-center gap-[15px] justify-end">
            <LocaleSwitcher />
            <div className="hidden lg:block">
              <AgendarLLamadaButton size={AGENDAR_BUTTON_SIZES.SMALL} />
            </div>
            <span
              className="block lg:hidden w-[24px] h-[24px] text-[24px] text-kliv-text-2"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
            >
              {isOpenMenu ? <MdClose /> : <MdMenu />}
            </span>
          </div>
        </div>
      </header>

      {/* hamburger menu container */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-40 transition-transform  duration-200 ${
          isOpenMenu ? "translate-x-0" : "translate-x-full"
        }`}
        // data-aos="fade-up"
      >
        {/* hamburger menu */}

        <div className="flex flex-col gap-[40px] items-center justify-center h-full">
          <nav className="flex flex-col items-center justify-center gap-[10px]">
            <TabItem
              href={"/#servicios"}
              isActive={activeSection === "servicios"}
            >
              {t_header("services")}
            </TabItem>
            <TabItem
              href={"/#trayectoria"}
              isActive={activeSection === "trayectoria"}
            >
              {t_header("trajectory")}
            </TabItem>
            <TabItem href={"/#tarifas"} isActive={activeSection === "tarifas"}>
              {t_header("pricing")}
            </TabItem>
          </nav>

          <AgendarLLamadaButton />

          <div className="flex gap-[5px]">
            {/* <SocialNetworkButton href={"https://www.facebook.com/AgenciaKLIV"}>
            <FaLinkedinIn />
          </SocialNetworkButton> */}
            <SocialNetworkButton
              href="https://www.instagram.com/agenciakliv/"
              color="text-kliv-primary"
            >
              <FaInstagram />
            </SocialNetworkButton>
            <SocialNetworkButton
              href="https://www.facebook.com/AgenciaKLIV"
              color="text-kliv-primary"
            >
              <FaFacebookF />
            </SocialNetworkButton>
            <SocialNetworkButton
              href="https://api.whatsapp.com/send/?phone=5493515504011&text&type=phone_number&app_absent=0"
              color="text-kliv-primary"
            >
              <FaWhatsapp />
            </SocialNetworkButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
