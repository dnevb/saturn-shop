import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Spinner, T } from "components";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { useAuthHeader } from "states/auth";
import { convertFromSymbol } from "states/symbols";
import f from "utils/f";

const Price: FC<{ price: number }> = (props) => {
  const price = useRecoilValue(convertFromSymbol(props.price));
  return (
    <>{price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</>
  );
};

const CartPage = () => {
  const headers = useAuthHeader();
  const client = useQueryClient();
  const { data, isLoading } = useQuery(["cart", "list"], () =>
    f("/cart", { headers }).then((res) => res.data)
  );
  const rm = (id: string) =>
    f
      .delete(`/cart/${id}`, { headers })
      .then(() => client.invalidateQueries(["cart"]));
  const complete = () =>
    f
      .post(`/cart/complete`, {}, { headers })
      .then(() => client.invalidateQueries(["cart"]));

  if (isLoading) return <Spinner />;

  const content = data.total_products ? (
    <ul className="my6 hfull">
      {data?.products.map((item: any) => (
        <li key={item["_id"]} className={styles.item}>
          <img src={item["uri"]} className={styles.img} />
          <div className="py2 flex flex-col justify-between grow">
            <div className="">
              <T size="h5">{item["name"]}</T>
              <T className="truncate max-wsm text-gray-400!">
                {item["description"]}
              </T>
            </div>
            <T>
              <strong className="text-lg">Price: </strong>
              $<Price price={item["price"]} />
            </T>
            <T>
              <strong className="text-lg">Quantity: </strong>
              {item["stock"]}
            </T>
          </div>
          <Icon
            className="h6 w6 mr6 cursor-pointer text-gray-500"
            icon="material-symbols:delete-outline-rounded"
          />
          {/* <T
            className="text-red-6 cursor-pointer"
            onClick={() => rm(item["_id"])}
          >
            Remove
          </T> */}
        </li>
      ))}
    </ul>
  ) : (
    <T size="h5">Without products</T>
  );

  return (
    <div className={styles.root}>
      <T size="h4">Shopping Cart </T>
      {content}
      {!!data?.total_products && (
        <div>
          <Button className="wfull text-xl" onClick={complete}>
            Complete order with Total:
            <strong>
              $<Price price={data["total_price"]} />
            </strong>
          </Button>
        </div>
      )}
    </div>
  );
};

const styles = {
  root: "max-w-5xl mxa gap8 py4",
  item: "flex items-center gap2 p2 rounded-lg bg-white wfull shadow my2",
  img: "h30 w30 object-cover rounded-lg",
};

export default CartPage;
