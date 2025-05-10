const PillFilter = ({ isActive, onClick, children }) => {
  const border = !isActive ? "border-transparent" : "border-kliv-tertiary";
  const color = isActive ? "text-kliv-tertiary" : "text-kliv-text-3";

  return (
    <button
      onClick={onClick}
      className={`font-[500] leading-[24px] text-[18px] py-[8px] border-b-[3px] ${border} ${color} 
        transition-colors duration-300 ease-in-out
      `}
    >
      {children}
    </button>
  );
};

export default PillFilter;
