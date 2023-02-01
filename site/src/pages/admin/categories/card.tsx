import clsx from "clsx";
import { format } from "date-fns";
import { FC } from "react";
import { Link } from "react-router-dom";

const CategoryCard: FC<any> = (props) => {
  const date = format(new Date(props["created"]), "MMM dd yyyy");
  return (
    <li key={props["_id"]}>
      <Link className={clsx(styles.item)} to={props["_id"]}>
        <div className="h16 w16 rounded-md bg-white">
          {props["uri"] && (
            <img
              src={props["uri"]}
              className="object-cover hfull wfull rounded-md"
            />
          )}
        </div>
        <div>
          <p className="text-xl">{props["name"]}</p>
          <p className="text-gray-600">
            <span className="text-black">Created: </span>
            {date}
          </p>
        </div>
      </Link>
    </li>
  );
};

const styles = {
  item: [
    "p2 bg-gray-200 rounded-xl my1 flex gap4 items-center",
    "hover:bg-gray-300",
  ],
};

export default CategoryCard;
