import AgendarLLamadaButton from "@/components/atoms/AgendarLLamadaButton";
import LogitoSection from "@/components/atoms/LogitoSection";
import SectionSubtitle from "@/components/atoms/SectionSubtitle";
import SectionTag from "@/components/atoms/SectionTag";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const MEMBERS = [
  {
    id: 1,
    name: "Agustín Ibáñez",
    photoPath: "/teamPhotos/agustin-ibanez_small.webp",
  },
  {
    id: 2,
    name: "Gonzalo Nazar",
    photoPath: "/teamPhotos/gonzalo-nazar_small.webp",
  },
  {
    id: 3,
    name: "Rocío Cambría",
    photoPath: "/teamPhotos/rocio-cambria_small.webp",
  },
  {
    id: 4,
    name: "Valentina Vivanco",
    photoPath: "/teamPhotos/valentina-vivanco_small.webp",
  },
  {
    id: 5,
    name: "Ailín Rubio",
    photoPath: "/teamPhotos/ailin-rubio_small.webp",
  },
  {
    id: 6,
    name: "Franco Montini",
    photoPath: "/teamPhotos/franco-montini_small.webp",
  },
  {
    id: 7,
    name: "Manuela Beverina",
    photoPath: "/teamPhotos/manuela-beverina_small.webp",
  },
  {
    id: 8,
    name: "Ezequiel Ruiz",
    photoPath: "/teamPhotos/ezequiel-ruiz_small.webp",
  },
  {
    id: 9,
    name: "Ana Paula Heredia",
    photoPath: "/teamPhotos/ana-paula-heredia_small.webp",
  },
  {
    id: 10,
    name: "Paula Gómez",
    photoPath: "/teamPhotos/paula-gomez_small.webp",
  },
  {
    id: 11,
    name: "Daniela Gómez",
    photoPath: "/teamPhotos/daniela-gomez_small.webp",
  },
];

const TeamCard = ({ image }) => {
  return (
    <figure className="relative w-full aspect-square rounded-full border-[1px] border-[#D9D9D9] overflow-hidden">
      <Image src={image} alt="Team member" fill objectFit="cover" />
    </figure>
  );
};

const TeamMembersSection = () => {
  const t_team = useTranslations("team");
  const t_header = useTranslations("header");

  return (
    <section
      className="w-full landing-section-container relative"
      id="trayectoria"
    >
      <div className="w-full flex flex-col gap-[50px] m-auto relative">
        <SectionTag>{t_header("trajectory")}</SectionTag>

        <div className="flex flex-col items-center text-center gap-[20px] ">
          <LogitoSection />
          <SectionTitle
            className={
              "max-w-[400px] lg:max-w-[457px] 2xl:max-w-[630px] lg:!font-[800]"
            }
          >
            {t_team.rich("title", {
              br: () => <br />,
            })}
          </SectionTitle>
        </div>
        <div className="w-full flex flex-col items-center text-center gap-[70px] lg:flex-row lg:max-w-[850px] 2xl:max-w-full lg:gap-[100px] 2xl:gap-[200px] lg:mx-auto">
          <div className="flex 2xl:flex-1 2xl:justify-end">
            <div className="flex flex-col gap-[20px] items-center text-center max-w-[430px] lg:items-start lg:text-left lg:max-w-[328px] 2xl:max-w-[405px]">
              <SectionSubtitle className={"2xl:max-w-[405px]"}>
                {t_team.rich("subtitle", {
                  strong: (children) => <strong>{children}</strong>,
                })}
              </SectionSubtitle>
              <AgendarLLamadaButton />
            </div>
            <div />
          </div>
          <div className="w-full grid grid-cols-3 gap-y-[50px] gap-x-[50px] lg:gap-y-[13px] px-[100px] lg:px-0 lg:flex-1 2xl:max-w-full 2xl:flex-1">
            <TeamCard image={"/teamPhotos/agustin-ibanez_small.webp"} />
            <TeamCard image="/teamPhotos/gonzalo-nazar_small.webp" />
            <TeamCard image="/teamPhotos/ezequiel-ruiz_small.webp" />
            <TeamCard image="/teamPhotos/franco-montini_small.webp" />
            <TeamCard image="/teamPhotos/rocio-cambria_small.webp" />
            <TeamCard image="/teamPhotos/ailin-rubio_small.webp" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;
