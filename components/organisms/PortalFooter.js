import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SITE_URL } from "@/lib/seo";

const PortalFooter = () => {
  return (
    <footer className="mt-auto border-t border-kliv-text-6">
      <div className="mx-auto flex w-full max-w-[1350px] flex-col-reverse items-center gap-[16px] px-[20px] py-[30px] lg:flex-row lg:justify-between">
        <span className="text-[14px] text-kliv-text-4">© 2026 Agencia Kliv LLC</span>
        <div className="flex items-center gap-[20px]">
          <Link
            className="text-[14px] font-[500] text-kliv-secondary"
            href={`${SITE_URL}/es/politicas-de-privacidad/`}
          >
            Políticas de privacidad
          </Link>
          <div className="flex gap-[10px]">
            <a
              href="https://www.instagram.com/agenciakliv/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full p-[7px] text-[22px] text-kliv-primary transition-colors duration-150"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/agencia-kliv/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full p-[7px] text-[22px] text-kliv-primary transition-colors duration-150"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PortalFooter;
