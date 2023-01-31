import { Icon } from "@iconify/react";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
  loading?: boolean;
}

const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const { loading, ...rest } = props;

  return (
    <button
      {...rest}
      ref={ref}
      disabled={props.disabled || loading}
      className={clsx(
        sizes[props.size || "base"],
        colors[props.color || "brand"],
        "inline-flex items-center justify-center",
        props.className
      )}
    >
      {loading && (
        <Icon icon="ei:spinner-3" className="h6 w6 animate-spin" />
      )}
      {props.children}
    </button>
  );
});

const colors = {
  brand:
    "bg-brand enabled:hover:bg-brand-dark text-white disabled:opacity-60",
};

const sizes = {
  base: "font-medium rounded-lg text-sm px-5 py-2.5",
};

export default Button;
