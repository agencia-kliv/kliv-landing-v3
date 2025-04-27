//create a pulldown component that receives a title and a content with props.children

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdExpandLess } from "react-icons/md";

const PullDown = ({ startOpened, questionNumber }) => {
  const [isOpen, setIsOpen] = useState(startOpened);

  const t_faq_questions = useTranslations(
    `faq.questions.question${questionNumber}`
  );

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`flex flex-col gap-[5px] w-full`}>
      <div
        className="flex items-center justify-between cursor-pointer py-[20px] gap-[10px]  px-[15px] rounded-[10px] transition-colors duration-300 ease-in-out"
        onClick={toggle}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <h4 className="text-[18px] font-[500] leading-[23px]">
          {t_faq_questions("title")}
        </h4>
        <span
          className={`text-[24px] ${
            !isOpen ? "rotate-180" : ""
          } transition-transform duration-[500ms] ease-out`}
        >
          <MdExpandLess />
        </span>
      </div>
      {isOpen && (
        <div
          className="px-[15px] text-[16px] pb-[40px] leading-[26px] text-kliv-text-3 whitespace-pre-wrap"
          data-aos="fade-in"
          data-aos-duration={500}
        >
          {t_faq_questions("content")}
          {/* <hr /> */}
        </div>
      )}
    </div>
  );
};

export default PullDown;
