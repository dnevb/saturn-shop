import { useQuery } from "@tanstack/react-query";
import { Spinner, T } from "components";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";

const ProductDetail: FC<any> = () => {
  const headers = useAuthHeader();
  const { id } = useParams();
  const { data, isLoading } = useQuery(["app", "product", id], () =>
    f(`/catalog/products/${id}`, { headers }).then((res) => res.data)
  );

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.root}>
      <img src={data["uri"]} className={styles.img} />
      <div className={styles.content}>
        <T size="h2" className="mb6">
          {data["name"]}
        </T>
        <T>{data["description"]}</T>
      </div>
    </div>
  );
};

const styles = {
  root: "flex gap8 p8 lg:max-w-6xl mx-auto",
  img: "wlg h2xl rounded-lg object-cover",
  content: "",
  detail: "",
};

export default ProductDetail;
