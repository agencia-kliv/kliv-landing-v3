const Input = (props) => {
  const styles = `w-full px-[10px] py-[8px] rounded-[5px] bg-kliv-sand text-base leading-[20px] ring-1 ${
    props.error ? "ring-red-500" : "ring-kliv-text-5"
  } focus:outline-none focus:ring-2 ${
    props.error ? "focus:ring-red-500" : "focus:ring-kliv-primary"
  } focus:border-transparent `;

  switch (props.type) {
    case "textarea":
      return (
        <textarea
          {...props}
          error={props.error?.toString()}
          className={styles}
        />
      );
    default:
      return (
        <input {...props} error={props.error?.toString()} className={styles} />
      );
  }
};

export default Input;
