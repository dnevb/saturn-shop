import { Outlet, RouteObject } from "react-router-dom";
import categoriesmodule from "./categories/page";
import AdminLayout from "./layout";
import productmodule from "./products/page";

export default {
  path: "admin",
  element: (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
  children: [
    productmodule,
    categoriesmodule,
    { path: "*", element: <h1>any page</h1> },
  ],
} satisfies RouteObject;
