import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappCTA = () => {
  const t_globals = useTranslations("globals");

  return (
    <div
      className="fixed bottom-0 right-0 p-[20px]"
      onClick={() => {
        window.open("https://wa.me/5493515504011", "_blank");
      }}
    >
      <div className=" flex flex-row items-center gap-[10px]  cursor-pointer">
        <span className="bg-[#25D366] text-white drop-shadow-sm px-[10px] py-[2px] rounded-full">
          {t_globals("whatsappCTA")}
        </span>
        <span className="bg-[#25D366] text-white drop-shadow-sm p-[10px] rounded-full">
          <FaWhatsapp size={28} />
        </span>
      </div>
    </div>
  );
};

export default WhatsappCTA;
