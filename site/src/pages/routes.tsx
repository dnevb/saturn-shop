import AuthGuard from "components/authguard";
import { createBrowserRouter, Outlet } from "react-router-dom";
import adminpage from "./admin/page";
import mainpage from "./app/page";
import LogoutPage from "./auth/logout";
import SigninPage from "./auth/signin";

export default createBrowserRouter([
  {
    path: "",
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: [
      { path: "signin", element: <SigninPage /> },
      { path: "logout", element: <LogoutPage /> },
      adminpage,
      mainpage,
    ],
  },
]);
