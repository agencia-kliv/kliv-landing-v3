import Image from "next/image";

const LogitoSection = ({ ...props }) => {
  return (
    <Image
      width={34}
      height={36}
      src={"/logito.svg"}
      alt="somos kliv"
      className={props.className}
    />
  );
};

export default LogitoSection;
