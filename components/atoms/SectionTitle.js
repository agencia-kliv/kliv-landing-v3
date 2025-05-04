const SectionTitle = ({ className, isLargeText, ...props }) => {
  return (
    <h2
      className={`font-[700] text-[28px] lg:text-[28px] ${
        isLargeText ? "2xl:text-[40px]" : "2xl:text-[32px]"
      } text-kliv-secondary leading-[40px] lg:leading-[30px] 2xl:leading-[50px] ${className}`}
    >
      {props.children}
    </h2>
  );
};

export default SectionTitle;
