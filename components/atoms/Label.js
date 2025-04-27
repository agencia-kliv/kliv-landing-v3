const Label = (props) => {
  return (
    <label
      {...props}
      id={props.name}
      className="font-[500] text-base leading-[20px]"
    >
      {props.children}
    </label>
  );
};

export default Label;
