import { useQuery } from "@tanstack/react-query";
import { Button, Input, Page, Spinner, T } from "components";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import ProductCard from "./card";

const ProductListPage = () => {
  const [search, setsearch] = useSearchParams();
  const q = search.get("q");
  const headers = useAuthHeader();
  const { data, isLoading } = useQuery(["product", "list", q], () =>
    f("/catalog/products", { headers, params: { q } }).then(
      ({ data }) => data
    )
  );

  return (
    <Page
      title="Product list"
      actions={
        <Link to="create">
          <Button>New Product</Button>
        </Link>
      }
    >
      <Input
        placeholder="Search..."
        className="mb6"
        value={q || ""}
        onChange={(e) => setsearch({ q: e.target.value })}
      />
      {isLoading && <Spinner />}
      {!isLoading && data?.estimatedTotalHits ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap2">
          {data["hits"].map((item: any) => (
            <ProductCard {...item} key={item["_id"]} />
          ))}
        </ul>
      ) : (
        <T size="h5">Without results</T>
      )}
    </Page>
  );
};

export default ProductListPage;
