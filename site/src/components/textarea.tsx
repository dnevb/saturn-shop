import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes, useId } from "react";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = forwardRef<any, TextAreaProps>((props, ref) => {
  const uid = useId();
  const id = props.id || uid;

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <textarea
        rows={4}
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
      ></textarea>
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

export default TextArea;
