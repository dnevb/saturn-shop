import { RouteObject } from "react-router-dom";
import ProductDetail from "./detail";
import ProductGrid from "./list";

export default {
  path: "",
  children: [
    { index: true, element: <ProductGrid /> },
    { path: "product/:id", element: <ProductDetail /> },
  ],
} satisfies RouteObject;
