const LabelButton = (props) => {
  return (
    <button
      {...props}
      className={`text-[16px] font-[500] leading-[18px] text-kliv-blue hover:text-kliv-blue-hover ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default LabelButton;
