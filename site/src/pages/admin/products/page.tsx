import { RouteObject } from "react-router-dom";
import ProductCreatePage from "./create";
import ProductDetailPage from "./detail";
import ProductListPage from "./list";

export default {
  path: "products",
  children: [
    { index: true, element: <ProductListPage /> },
    { path: "create", element: <ProductCreatePage /> },
    { path: ":id", element: <ProductDetailPage /> },
  ],
} satisfies RouteObject;
