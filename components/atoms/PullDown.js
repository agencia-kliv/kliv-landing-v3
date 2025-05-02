//create a pulldown component that receives a title and a content with props.children

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";

const PullDown = ({ startOpened, questionNumber }) => {
  const [isOpen, setIsOpen] = useState(startOpened);

  const t_faq_questions = useTranslations(
    `faq.questions.question${questionNumber}`
  );

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`flex flex-col gap-[0px] w-full relative`}>
      <div
        className="flex items-center justify-between cursor-pointer relative z-[2]  gap-[10px]  p-[25px] rounded-[10px] transition-colors duration-300 ease-in-out shadow-[0px_3.63px_9.02px_0px_#00000040]  bg-white"
        onClick={toggle}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <h4 className="text-[18px] font-[700] xl:text-[16px] 2xl:text-[22px] text-kliv-secondary">
          {t_faq_questions("title")}
        </h4>
        <span
          className={`text-[40px] ${
            !isOpen ? "rotate-[-90deg]" : "rotate-90"
          } transition-transform origin-[15px_20px] duration-[500ms] ease-out`}
        >
          <MdArrowBackIos />
        </span>
      </div>
      {isOpen && (
        <div
          className="p-[25px] text-[18px] xl:text-[16px] 2xl:text-[22px] pt-[40px] mb-[-20px] translate-y-[-20px] rounded-[10px] text-kliv-secondary shadow-[0px_3.63px_9.02px_0px_#00000040]  bg-white relative z-[1] whitespace-pre-wrap"
          data-aos="fade-in"
          data-aos-duration={500}
        >
          {t_faq_questions.rich("content", {
            italic: (chunks) => <span className="italic">{chunks}</span>,
          })}
          {/* <hr /> */}
        </div>
      )}
    </div>
  );
};

export default PullDown;
