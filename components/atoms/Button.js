"use client";

import Spinner from "./Spinner";

export const BUTTONS_VARIANTS = {
  FILLED: "filled",
  OUTLINED: "outlined",
  TEXT: "text",
};

export const BUTTONS_COLORS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DANGER: "danger",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
  LIGHT: "light",
  DARK: "dark",
};

const Button = ({ variant = BUTTONS_VARIANTS.FILLED, loading, ...props }) => {
  const backgroundColor =
    variant === BUTTONS_VARIANTS.FILLED ? `bg-kliv-primary` : "bg-transparent";

  const hoverColor =
    variant === BUTTONS_VARIANTS.FILLED
      ? `hover:bg-kliv-primary-hover`
      : "hover:bg-kliv-primary-hover-light";

  const textColor =
    variant === BUTTONS_VARIANTS.FILLED ? `text-white` : "text-kliv-primary";

  return (
    <button
      className={`inline-flex gap-[10px] h-[48px] text-tiny lg:text-small px-[24px] py-[12px] justify-center items-center shrink-0  border border-kliv-primary ${backgroundColor} ${textColor} rounded-[5px] ${props?.className} transition-colors duration-200 ease-in-out ${hoverColor}`}
      onClick={() => {
        if (loading) return;
        if (props.onClick) props.onClick();
      }}
    >
      {loading && <Spinner />}
      <strong>{props.children}</strong>
    </button>
  );
};

export default Button;
