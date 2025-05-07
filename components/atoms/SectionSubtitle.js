const SectionSubtitle = ({ className, isLargeSubitle, ...props }) => {
  return (
    <p
      className={`text-[16px] lg:text-[16px] ${
        isLargeSubitle ? "2xl:text-[22px]" : "2xl:text-[18px]"
      } font-[400] text-kliv-secondary ${className}`}
    >
      {props.children}
    </p>
  );
};

export default SectionSubtitle;
