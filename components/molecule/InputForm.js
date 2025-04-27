import ErrorMessage from "../atoms/ErrorMessage";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

const InputForm = ({ label, name, type, error, errorMessage, ...props }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <Label htmlFor={name}>{label}</Label>
      <Input {...props} name={name} error={error} type={type} />
      {errorMessage && error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default InputForm;
