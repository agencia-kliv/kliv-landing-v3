const HeadSection = (props) => {
  return (
    <h3
      className={`text-[24px] sm:text-[36px] max-w-[850px] mb-[0px] lg:mb-[40px] m-auto text-center tracking-tighter font-[700] text-kliv-secondary opacity-80 ${props.className}`}
    >
      {props.children}
    </h3>
  );
};

export default HeadSection;
