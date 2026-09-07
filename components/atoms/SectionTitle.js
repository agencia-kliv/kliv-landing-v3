const SectionTitle = ({ as: Tag = "h2", className, isLargeText, ...props }) => {
  return (
    <Tag
      className={`font-[700] text-[30px] lg:text-[32px] ${
        isLargeText ? "2xl:text-[42px]" : "2xl:text-[34px]"
      } text-kliv-secondary leading-tight ${className}`}
    >
      {props.children}
    </Tag>
  );
};

export default SectionTitle;
