const PillFilter = ({ isActive, onClick, children }) => {
  const border = !isActive ? "border-kliv-text-5" : "border-kliv-tertiary";
  const color = isActive ? "text-white" : "text-kliv-text-3";
  const bg = isActive ? "bg-kliv-tertiary" : "bg-white";

  const hoverColor = isActive
    ? `hover:bg-kliv-tertiary-hover`
    : "hover:bg-kliv-primary-hover-light";

  return (
    <button
      onClick={onClick}
      className={`font-[500] leading-[24px] px-[16px] py-[8px] ${bg} border ${border} ${color} ${hoverColor} rounded-[1000px]
        transition-colors duration-300 ease-in-out
      `}
    >
      {children}
    </button>
  );
};

export default PillFilter;
