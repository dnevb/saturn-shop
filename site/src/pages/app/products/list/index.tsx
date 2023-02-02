import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Spinner, T } from "components";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useAuthHeader } from "states/auth";
import { facetFilter, sortState } from "states/commerce";
import f from "utils/f";
import ProductCard from "./card";
import ProductFacets from "./facets";
import ProductGridSearch from "./search";

const ProductGrid = () => {
  const headers = useAuthHeader();
  const [search, setsearch] = useSearchParams();
  const q = search.get("q");
  const filter = useRecoilValue(facetFilter);
  const [sort, setsort] = useRecoilState(sortState);

  const { data, isLoading } = useQuery(
    ["app", "products", q, filter, sort],
    () =>
      f("/catalog/products", {
        headers,
        params: { q, filter, sort },
      }).then(({ data }) => data)
  );

  return (
    <div className={styles.root}>
      <ProductFacets />
      <div className={styles.body}>
        <ProductGridSearch />
        <ul className={clsx(styles.grid)}>
          {isLoading && <Spinner />}
          {!isLoading && data?.estimatedTotalHits ? (
            data["hits"].map((item: any) => (
              <ProductCard {...item} key={item["_id"]} />
            ))
          ) : (
            <T size="h5">Witouth results</T>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  root: "max-w-4xl lg:max-w-7xl mx-auto flex gap8 hfull",
  body: "grow py6 px4 overflow-y-auto",
  grid: "grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 ",
};

export default ProductGrid;
