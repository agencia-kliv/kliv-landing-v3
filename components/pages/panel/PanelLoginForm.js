import Button from "@/components/atoms/Button";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import InputForm from "@/components/molecule/InputForm";
import { useState } from "react";

const credentials = {
  user: "admin",
  password: "123123asdasd",
};

const PanelLoginForm = ({ onLogin }) => {
  const [errors, setErrors] = useState({
    user: "",
    password: "",
    invalidCredentials: false,
  });

  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      form.user !== credentials.user ||
      form.password !== credentials.password
    ) {
      setErrors({
        ...errors,
        invalidCredentials: true,
      });
      return;
    }

    onLogin();
  };

  return (
    <section className="flex-1 m-auto w-full max-w-[300px]">
      <form onSubmit={handleLogin} className="flex flex-col gap-[40px] ">
        <div className="flex flex-col gap-[20px] ">
          <InputForm
            type={"text"}
            name={"user"}
            label={"Usuario: *"}
            error={errors["user"]}
            errorMessage={errors["user"]}
            onChange={handleChange}
          />
          <InputForm
            type={"password"}
            name={"password"}
            label={"Contraseña: *"}
            error={errors["password"]}
            errorMessage={errors["password"]}
            onChange={handleChange}
          />
        </div>
        {errors["invalidCredentials"] && (
          <ErrorMessage>Credenciales incorrectas</ErrorMessage>
        )}
        <Button>Entrar</Button>
      </form>
    </section>
  );
};

export default PanelLoginForm;
