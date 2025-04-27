import { useTranslations } from "next-intl";
import { MdCheck, MdClose } from "react-icons/md";

export const ROW_ITEM_TYPES = {
  TITLE: "title",
  SUBTITLE: "subtitle",
  ICON: "icon",
  ITEM_CHECK: "itemCheck",
  SUBTITLE_CHECK: "subtitleCheck",
};

const RowItem = ({ type, content }) => {
  const t_planItems = useTranslations("planItems");

  switch (type) {
    case ROW_ITEM_TYPES.TITLE:
      return (
        <h5 className="text-tiny lg:text-small text-kliv-text-2">
          {t_planItems(content)}
        </h5>
      );
    case ROW_ITEM_TYPES.ITEM_CHECK:
      return (
        <div className="flex items-center gap-[5px]">
          <span className="text-small lg:text-base text-green-600">
            <MdCheck />
          </span>
          <span className="text-small lg:text-base leading-[20px] font-[500] text-kliv-text-2">
            {t_planItems(content)}
          </span>
        </div>
      );
    case ROW_ITEM_TYPES.SUBTITLE:
      return (
        <p
          className="text-[12px] lg:text-tiny text-kliv-text-4"
          // dangerouslySetInnerHTML={{
          //   __html: t_planItems.rich(content, {
          //     strong: (text) => <strong>{text}</strong>,
          //   }),
          // }}
        >
          {t_planItems.rich(content, {
            strong: (text) => <strong>{text}</strong>,
          })}
        </p>
      );
    case ROW_ITEM_TYPES.SUBTITLE_CHECK:
      return (
        <p
          className="ml-[23px] mt-[-5px] text-[12px] lg:text-tiny leading-[16px] text-kliv-text-4"
          dangerouslySetInnerHTML={{ __html: t_planItems(content) }}
        ></p>
      );
    case ROW_ITEM_TYPES.ICON:
      switch (content) {
        case "check":
          return (
            <span className="head-h4 lg:head-h3 text-green-600">
              <MdCheck />
            </span>
          );
        case "cross":
          return (
            <span className="head-h4 lg:head-h3 text-red-600">
              <MdClose />
            </span>
          );
        default:
          return <></>;
      }
    default:
      return <></>;
  }
};

export default RowItem;
