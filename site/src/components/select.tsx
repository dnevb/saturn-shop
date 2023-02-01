import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select = forwardRef<any, InputProps>((props, ref) => {
  const uid = useId();
  const id = props.id || uid;
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {props.label}
      </label>
      <select
        {...props}
        ref={ref}
        id={id}
        className={clsx(
          styles.shape,
          styles.text,
          styles.border,
          styles.colors,
          props.className
        )}
      />
    </div>
  );
});

const styles = {
  label: "block mb-2 text-sm font-medium text-gray-900",
  shape: "rounded-lg p-2.5 w-full block",
  text: "text-gray-900 text-sm ",
  border: "border border-gray-300 focus:border-brand",
  colors: "bg-gray-50 focus:ring-blue-500 outline-none",
};

export default Select;
