import { useQuery } from "@tanstack/react-query";
import { Spinner, T } from "components";
import { useRecoilState } from "recoil";
import { useAuthHeader } from "states/auth";
import { facetState } from "states/commerce";
import f from "utils/f";

const ProductFacets = () => {
  const headers = useAuthHeader();
  const { data, isLoading } = useQuery(["app", "facets"], () =>
    f("/catalog/categories", { headers }).then(({ data }) => data)
  );
  const [facets, setfacets] = useRecoilState(facetState);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.root}>
      <T size="h6">Categories</T>
      <ul className="p2">
        {data["hits"].map((item: any) => {
          const checked = !!facets[item["_id"]];
          return (
            <li key={item["_id"]}>
              <label className="inline-flex gap2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setfacets((items) => ({
                      ...items,
                      [item["_id"]]: !checked,
                    }))
                  }
                />
                <p className={styles.title}>
                  {item["name"]} ({item["total_products"]})
                </p>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const styles = {
  root: "bg-white p4 rounded-lg min-w-55 max-h-sm my6 select-none shadow",
  title: "text-lg",
};

export default ProductFacets;
