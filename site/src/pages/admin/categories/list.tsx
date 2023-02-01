import { useQuery } from "@tanstack/react-query";
import { Button, Input, Page, Spinner, T } from "components";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import CategoryCard from "./card";

const CategoryListPage = () => {
  const [params, setparams] = useSearchParams();
  const query = params.get("q");
  const headers = useAuthHeader();
  const { data, isLoading } = useQuery(["category", "list", query], () =>
    f("/catalog/categories", { headers, params: { q: query } }).then(
      ({ data }) => data
    )
  );

  return (
    <Page
      title="Category list"
      actions={
        <Link to="create">
          <Button>New Category</Button>
        </Link>
      }
    >
      <Input
        className="mb4"
        placeholder="Search..."
        value={query || ""}
        onChange={(e) => setparams({ q: e.target.value })}
      />
      {isLoading && <Spinner />}
      {!isLoading && data?.estimatedTotalHits ? (
        <ul>
          {data["hits"].map((item: any) => (
            <CategoryCard {...item} key={item["_id"]} />
          ))}
        </ul>
      ) : (
        <T size="h5">Without results</T>
      )}
    </Page>
  );
};

export default CategoryListPage;
