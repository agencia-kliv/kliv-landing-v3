const SectionTitle = ({ className, isLargeText, ...props }) => {
  return (
    <h2
      className={`font-[700] text-[40px] lg:text-[28px] ${
        isLargeText ? "2xl:text-[44px]" : "2xl:text-[36px]"
      } text-kliv-secondary leading-[40px] lg:leading-[30px] 2xl:leading-[50px] ${className}`}
    >
      {props.children}
    </h2>
  );
};

export default SectionTitle;
