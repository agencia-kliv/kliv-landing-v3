import HeadSection from "@/components/atoms/HeadSection";
import LabelButton from "@/components/atoms/LabelButton";
import Popup from "@/components/atoms/Popup";
import { useModal } from "@/hooks/useModal";
import { useTranslations } from "next-intl";
import { OurServicesData } from "./ourServicesData";

export const ServicePopupContainer = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <div className="flex flex-col gap-[40px]">
      <header className="flex gap-[15px]">
        <div>
          <h4 className="font-[500] text-[24px] leading-[31px]">{title}</h4>
          <p className="text-base leading-[21px]">{description}</p>
        </div>
        <figure className="w-[100px] shrink-0">
          <img src={icon} />
        </figure>
      </header>
      {children}
    </div>
  );
};

const OurServiceItem = ({ item }) => {
  const [isOpenService, openService, closeService] = useModal();

  const t_ourServices_items = useTranslations("ourServices.items");
  const t_ourServices_item = useTranslations(
    `ourServices.items.item${item.id}`
  );
  const t_ourServices_item_popup = useTranslations(
    `ourServices.items.item${item.id}.popup`
  );

  if (!item) return <></>;

  return (
    <>
      <article key={item.id} className="flex gap-[15px] p-[15px]">
        <figure className="w-[60px] sm:w-[100px] shrink-0">
          <img src={item?.icon} alt={t_ourServices_item("title")} />
        </figure>
        <div className="flex flex-col gap-[2px]">
          <h3 className="title head-h5 text-kliv-text-2 leading-[26px] font-[500]">
            {t_ourServices_item("title")}
          </h3>
          <p className="description text-small text-kliv-text-3 leading-[24px]">
            {t_ourServices_item("content")}
          </p>
          <footer className="pt-[12px]">
            <LabelButton
              onClick={() => {
                openService();
              }}
            >
              {t_ourServices_items("viewMore")}
            </LabelButton>
          </footer>
        </div>
      </article>

      <Popup
        isOpen={isOpenService}
        closePopup={() => {
          closeService();
        }}
        maxWidth={"620px"}
      >
        <ServicePopupContainer
          description={t_ourServices_item("content")}
          title={t_ourServices_item("title")}
          icon={item?.icon}
        >
          {item?.popupComponent(t_ourServices_item_popup)}
        </ServicePopupContainer>
      </Popup>
    </>
  );
};

const OurServicesSection = () => {
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [isOpenService, openService, closeService] = useModal();

  const t_ourServices = useTranslations("ourServices");

  return (
    <section id="servicios" data-section="servicios">
      <div className="flex flex-col gap-[30px] sm:gap-[50px] items-center landing-section-container">
        <HeadSection className="text-kliv-consideracion max-w-[495px]">
          {t_ourServices("title")}
        </HeadSection>

        <section className="flex flex-col sm:grid sm:grid-cols-whyUs gap-[20px]">
          {OurServicesData.map((item) => (
            <OurServiceItem
              item={item}
              // onViewMoreClick={() => {
              //   setSelectedItem(item);
              //   openService();
              // }}
              key={item.id}
            />
          ))}
        </section>
      </div>

      {/* <Popup
        isOpen={isOpenService}
        closePopup={() => {
          closeService();
        }}
        maxWidth={"620px"}
      >
        <ServicePopupContainer
          description={selectedItem?.description}
          title={selectedItem?.title}
          icon={selectedItem?.icon}
        >
          {selectedItem?.popupComponent()}
        </ServicePopupContainer>
      </Popup> */}
    </section>
  );
};

export default OurServicesSection;
