import { Spinner } from "components";
import { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import MainLayout from "./layout";
import productsModule from "./products/page";

export default {
  path: "/",
  element: (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  ),
  children: [productsModule],
} satisfies RouteObject;
