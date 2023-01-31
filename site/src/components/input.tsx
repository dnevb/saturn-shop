import clsx from "clsx";
import { FC, InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = (props) => {
  const uid = useId();
  const id = props.id || uid;
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {props.label}
        <input
          {...props}
          id={id}
          className={clsx(
            styles.shape,
            styles.text,
            styles.border,
            styles.colors,
            props.className
          )}
        />
      </label>
    </div>
  );
};

const styles = {
  label: "block mb-2 text-sm font-medium text-gray-900",
  shape: "rounded-lg p-2.5 w-full block",
  text: "text-gray-900 text-sm ",
  border: "border border-gray-300 focus:border-brand",
  colors: "bg-gray-50 focus:ring-blue-500 outline-none",
};

export default Input;
