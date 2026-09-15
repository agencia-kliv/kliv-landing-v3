import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

// Header propio para /cliente/*: mismo look que el sitio principal, pero sin
// depender de next-intl (estas páginas no tienen prefijo de idioma).
const PortalHeader = ({ showLogout = false, client = "" }) => {
  return (
    <header className="sticky top-0 z-50 flex min-h-[70px] w-full bg-white px-[20px] shadow-md lg:min-h-[80px] lg:px-[40px]">
      <div className="m-auto flex w-full max-w-[1350px] items-center justify-between lg:px-[15px]">
        <Link href={SITE_URL} className="flex items-center gap-[12px]">
          <Image width={115} height={43} src="/kliv-logo.svg" alt="Kliv" />
        </Link>

        <div className="flex items-center gap-[8px] lg:gap-[12px]">
          <a
            href="https://api.whatsapp.com/send/?phone=5493515504011&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-kliv-tertiary px-[18px] py-[9px] text-[14px] font-[500] tracking-[.04em] text-white transition-colors duration-150 hover:bg-kliv-tertiary-hover sm:block lg:px-[22px] lg:text-[16px]"
          >
            Hablar con KLIV
          </a>
          {showLogout && (
            <form action="/api/client-portal/logout/" method="post">
              <input type="hidden" name="client" value={client.toLowerCase()} />
              <button
                type="submit"
                className="rounded-full border border-kliv-text-6 bg-white px-[14px] py-[9px] text-[13px] font-[600] text-kliv-primary transition-colors duration-150 hover:bg-kliv-sand lg:px-[18px] lg:text-[14px]"
              >
                Cerrar sesión
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
