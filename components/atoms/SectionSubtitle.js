const SectionSubtitle = ({ className, isLargeSubitle, ...props }) => {
  return (
    <p
      className={`text-[18px] lg:text-[16px] ${
        isLargeSubitle ? "2xl:text-[24px]" : "2xl:text-[20px]"
      } font-[400] text-kliv-secondary ${className}`}
    >
      {props.children}
    </p>
  );
};

export default SectionSubtitle;
