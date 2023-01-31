import { Outlet, RouteObject } from "react-router-dom";
import AdminLayout from "./layout";

export default {
  path: "admin",
  element: (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
  children: [{ path: "*", element: <h1>any page</h1> }],
} satisfies RouteObject;
