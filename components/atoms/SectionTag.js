const SectionTag = (props) => {
  return (
    <span className="absolute top-0 left-0 hidden lg:block text-[20px] px-[6px] py-[30px] bg-kliv-primary rounded-[0_0_1000px_0] text-white pb-[40px] [writing-mode:sideways-lr]">
      {props.children}
    </span>
  );
};

export default SectionTag;
