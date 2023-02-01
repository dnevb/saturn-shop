import { Icon } from "@iconify/react";
import { T } from "components";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageProps {
  title: string;
  actions?: JSX.Element;
  children?: ReactNode;
  className?: string;
}

const Page: FC<PageProps> = (props) => {
  return (
    <div className="lg:px36 px8 py6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap2">
          <Link to="..">
            <Icon
              icon="fluent:arrow-left-16-filled"
              className="h6 w6 cursor-pointer"
            />
          </Link>
          <T size="h3">{props.title}</T>
        </div>
        <div className="flex items-center gap2">{props.actions}</div>
      </div>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className={props.className}>{props.children}</div>
    </div>
  );
};

export default Page;
