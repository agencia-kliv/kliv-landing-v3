import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";

const PullDown = ({ isOpen, onToggle, questionNumber }) => {
  const t = useTranslations(`faq.questions.question${questionNumber}`);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Cuando abra/cierre, actualizamos la altura objetivo
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="w-full border-t-[1px]">
      {/* Header clickeable */}
      <div
        className="flex items-center justify-between cursor-pointer gap-[10px] py-[25px] bg-white rounded-[10px] transition-colors duration-300 ease-in-out"
        onClick={onToggle}
        onMouseDown={(e) => e.preventDefault()}
      >
        <h4 className="text-[16px] font-[700] 2xl:text-[18px] text-kliv-secondary">
          {t("title")}
        </h4>
        <span
          className={`text-[20px] transition-transform duration-300 ease-out ${
            isOpen ? "rotate-[270deg]" : "rotate-[180deg]"
          }`}
        >
          <MdArrowBackIos />
        </span>
      </div>

      {/* Contenido siempre renderizado, con overflow-hidden y transición de max-height */}
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-white"
      >
        <div className="py-[25px] pt-0 text-[14px] 2xl:text-[16px] text-kliv-secondary whitespace-pre-wrap">
          {t.rich("content", {
            italic: (chunks) => <span className="italic">{chunks}</span>,
          })}
        </div>
      </div>
    </div>
  );
};

export default PullDown;
