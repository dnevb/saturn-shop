import { FC } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { convertFromSymbol } from "states/symbols";

const ProductCard: FC<any> = (props) => {
  const price = useRecoilValue(convertFromSymbol(props["price"]));

  return (
    <li className="bg-white rounded-lg shadow-lg">
      <Link to={`/product/${props["_id"]}`} className={styles.root}>
        <img src={props["uri"]} className={styles.img} />
        <div className="p4">
          <h4 className={styles.title}>{props["name"]}</h4>
          <h6 className={styles.price}>
            $
            {Number(price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </h6>
        </div>
      </Link>
    </li>
  );
};

const styles = {
  root: "max-h-sm",
  img: "w-full h-60 object-cover rounded-t-lg",
  title: "text-xl",
  price: "font-semibold",
};

export default ProductCard;
