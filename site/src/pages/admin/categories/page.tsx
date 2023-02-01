import { RouteObject } from "react-router-dom";
import CategoryCreatePage from "./create";
import CategoryDetailPage from "./detail";
import CategoryListPage from "./list";

export default {
  path: "categories",
  children: [
    {
      index: true,
      element: <CategoryListPage />,
    },
    { path: "create", element: <CategoryCreatePage /> },
    { path: ":id", element: <CategoryDetailPage /> },
  ],
} satisfies RouteObject;
