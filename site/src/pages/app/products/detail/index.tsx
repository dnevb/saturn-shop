import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Spinner, T } from "components";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useAuthHeader } from "states/auth";
import { convertFromSymbol } from "states/symbols";
import f from "utils/f";

const ProductDetail: FC<any> = () => {
  const headers = useAuthHeader();
  const client = useQueryClient();
  const { id } = useParams();
  const { data, isLoading } = useQuery(["app", "product", id], () =>
    f(`/catalog/products/${id}`, { headers }).then((res) => res.data)
  );
  const [qt, setqt] = useState(1);
  const price = useRecoilValue(convertFromSymbol(data?.["price"] || 0));
  const add = () =>
    f
      .post("/cart", { ...data, stock: qt }, { headers })
      .then(() => client.invalidateQueries(["cart"]));

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.root}>
      <img src={data["uri"]} className={styles.img} />
      <div className={styles.content}>
        <T size="h2">{data["name"]}</T>
        <caption className="text-gray-500">
          {data["category"]["name"]}
        </caption>
        <T className="my8">{data["description"]}</T>
        <T size="h3">
          ${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </T>
        <div className="flex items-center gap4 my4">
          <Button className="p3! px8!" onClick={add}>
            <Icon
              icon="fluent:shopping-bag-16-regular"
              className="h6 w6"
            />
            Add to cart
          </Button>
          <select
            className={styles.stock}
            value={qt}
            onChange={(e) => setqt(Number(e.target.value))}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: "flex gap8 p8 lg:max-w-6xl mx-auto",
  img: "wlg hxl rounded-lg object-cover",
  content: "",
  detail: "",
  stock: "p3 outline-none border border-brand rounded-lg",
};

export default ProductDetail;
