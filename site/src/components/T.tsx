import clsx from "clsx";
import { createElement, FC, HtmlHTMLAttributes } from "react";

interface TProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  size?: keyof typeof sizes;
}

const T: FC<TProps> = (props) => {
  const size = props.size || "p";
  return createElement(
    size,
    { ...props, className: clsx(sizes[size], props.className) },
    props.children
  );
};

const sizes = {
  h1: "text-5xl font-extrabold",
  h2: "text-4xl font-bold",
  h3: "text-3xl font-bold",
  h4: "text-2xl font-bold",
  h5: "text-1xl font-bold",
  h6: "text-xl font-bold",
  p: "font-light text-gray-400 ",
};

export default T;
