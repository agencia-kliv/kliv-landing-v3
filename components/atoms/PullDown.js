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
    <div className={`flex flex-col gap-[0px] w-full relative border-t-[1px]`}>
      <div
        className="flex items-center justify-between cursor-pointer relative z-[2]  gap-[10px]  p-[25px] rounded-[10px] transition-colors duration-300 ease-in-out bg-white"
        onClick={toggle}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <h4 className="text-[18px] font-[700] xl:text-[16px] 2xl:text-[18px] text-kliv-secondary">
          {t_faq_questions("title")}
        </h4>
        <span
          className={`text-[20px] ${
            !isOpen ? "rotate-[180deg]" : "rotate-[270deg]"
          } transition-transform duration-[300ms] ease-out`}
        >
          <MdArrowBackIos />
        </span>
      </div>
      {isOpen && (
        <div
          className="p-[25px] pt-[0] text-[18px] xl:text-[16px] 2xl:text-[16px]  text-kliv-secondary bg-white relative z-[1] whitespace-pre-wrap"
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
