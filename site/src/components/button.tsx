import clsx from "clsx";
import { FC, HtmlHTMLAttributes } from "react";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
}

const Button: FC<ButtonProps> = (props) => (
  <button
    {...props}
    className={clsx(
      sizes[props.size || "base"],
      colors[props.color || "brand"],
      props.className
    )}
  />
);

const colors = {
  brand: "bg-brand hover:bg-brand-dark text-white",
};

const sizes = {
  base: "font-medium rounded-lg text-sm px-5 py-2.5",
};

export default Button;
