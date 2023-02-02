import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sortState } from "states/commerce";

const ProductGridSearch = () => {
  const [search, setsearch] = useSearchParams();
  const [sort, setsort] = useRecoilState(sortState);
  const q = search.get("q");

  return (
    <div className="mb6 flex items-center gap4">
      <input
        placeholder="Search..."
        className={styles.search}
        value={q || ""}
        onChange={(e) => setsearch({ q: e.target.value })}
      />

      <select
        value={sort}
        onChange={(e) => setsort(e.target.value)}
        className={styles.sort}
      >
        <option value="name:asc">Name</option>
        <option value="price:desc">Price</option>
        <option value="stock:desc">Stock</option>
      </select>
    </div>
  );
};

const styles = {
  search: "h12 rounded-lg wfull px4 outline-none shadow",
  sort: "h12 rounded-lg w36 outline-none shadow bg-white px2",
};

export default ProductGridSearch;
