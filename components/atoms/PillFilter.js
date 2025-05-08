const PillFilter = ({ isActive, onClick, children }) => {
  const border = !isActive ? "border-transparent" : "border-kliv-tertiary";
  const color = isActive ? "text-kliv-tertiary" : "text-kliv-text-3";
  const bg = isActive ? "bg-kliv-tertiary" : "bg-white";

  const hoverColor = isActive
    ? `hover:bg-kliv-primary-hover-light`
    : "hover:bg-kliv-primary-hover-light";

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
