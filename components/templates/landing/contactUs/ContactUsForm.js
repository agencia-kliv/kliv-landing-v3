import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecule/InputForm";
import emailjs from "@emailjs/browser";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ContactUsForm = ({ t }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    content: false,
  });

  const handleIsError = (name, value) => {
    if (name === "name") {
      return value.length < 3;
    }
    if (name === "email") {
      return !value.includes("@");
    }
    if (name === "phone") {
      return value.length < 10;
    }
    if (name === "company") {
      return value.length < 3;
    }
    if (name === "content") {
      return value.length < 10;
    }
  };

  const handleChange = (e) => {
    if (handleIsError(e.target.name, e.target.value.trim())) {
      setErrors({
        ...errors,
        [e.target.name]: true,
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //check if errors

    const firstError = Object.keys(errors).find((key) => errors[key] === true);
    if (firstError) {
      //set focus on first error
      e.target[firstError].focus();
      return;
    }

    if (!form.name || !form.email || !form.content) {
      alert(t("completeForm"));
      return;
    }

    setLoading(true);

    const serviceID = "service_kliv_contact";
    const templateID = "kliv-landing-template";

    emailjs
      .sendForm(serviceID, templateID, e.target, "31m48Fe1F9KeWHQns")
      .then(
        () => {
          setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            content: "",
          });
          e.target.reset();
          // alert(t("success"));
          router.push(`${pathname}thank-you`);
          return;
        },
        () => {
          alert(t("error"));
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="w-full max-w-[425px] m-auto" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-[30px]">
        <InputForm
          type={"text"}
          name={"name"}
          label={`${t("name")}: *`}
          error={errors["name"]}
          errorMessage={t("nameError")}
          onChange={handleChange}
        />
        <InputForm
          type={"email"}
          name={"email"}
          label={`${t("email")}: *`}
          error={errors["email"]}
          errorMessage={t("emailError")}
          onChange={handleChange}
        />
        <InputForm
          type={"phone"}
          name={"phone"}
          label={`${t("phone")}:`}
          error={errors["phone"]}
          errorMessage={t("phoneError")}
          onChange={handleChange}
        />
        <InputForm
          type={"text"}
          name={"company"}
          label={`${t("company")}:`}
          error={errors["company"]}
          errorMessage={t("companyError")}
          onChange={handleChange}
        />
        <InputForm
          type={"textarea"}
          name={"content"}
          rows={5}
          label={`${t("content")}: *`}
          error={errors["content"]}
          errorMessage={t("contentError")}
          onChange={handleChange}
        />
        <footer className="w-full flex justify-end">
          <Button type={"submit"} loading={loading}>
            {t("submit")}
          </Button>
        </footer>
      </div>
    </form>
  );
};

export default ContactUsForm;
