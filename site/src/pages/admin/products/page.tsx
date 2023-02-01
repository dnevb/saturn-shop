import { RouteObject } from "react-router-dom";
import ProductCreatePage from "./create";
import ProductListPage from "./list";

export default {
  path: "products",
  children: [
    { index: true, element: <ProductListPage /> },
    { path: "create", element: <ProductCreatePage /> },
  ],
} satisfies RouteObject;
