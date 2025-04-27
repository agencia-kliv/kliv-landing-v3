const SectionSubtitle = ({ className, isLargeSubitle, ...props }) => {
  return (
    <p
      className={`text-[22px] lg:text-[16px] ${
        isLargeSubitle ? "2xl:text-[25px]" : "2xl:text-[22px]"
      } font-[400] text-kliv-secondary ${className}`}
    >
      {props.children}
    </p>
  );
};

export default SectionSubtitle;
