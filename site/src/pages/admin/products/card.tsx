import clsx from "clsx";
import { format } from "date-fns";
import { FC } from "react";
import { Link } from "react-router-dom";

const ProductCard: FC<any> = (props) => {
  const created = format(new Date(props["created"]), "MMM dd, yyyy");
  return (
    <li>
      <Link to={props["_id"]} className={clsx(styles.root)}>
        <img src={props["uri"]} className={clsx(styles.img)} />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props["name"]}
          </h5>
          <p className={styles.desc}>
            <strong>Category: </strong>
            {props["category"]["name"]}
          </p>
          <p className={styles.desc}>
            <strong>Price: </strong>${props["price"]}
          </p>
          <p className={styles.desc}>
            <strong>Stock: </strong>
            {props["stock"]}
          </p>
          <p className={styles.desc}>
            <strong>Created: </strong>
            {created}
          </p>
        </div>
      </Link>
    </li>
  );
};

const styles = {
  root: [
    "flex flex-col items-center bg-white shadow",
    "rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100",
  ],
  img: [
    "object-cover w-full rounded-t-lg max-h40",
    "md:hauto md:w-48 md:rounded-none md:rounded-l-lg",
  ],
  desc: "font-normal text-gray-700 dark:text-gray-400",
};

export default ProductCard;
