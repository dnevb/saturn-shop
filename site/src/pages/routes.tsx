import AuthGuard from "components/authguard";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import adminpage from "./admin/page";
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
      { path: "home", element: <h1>Home page</h1> },
      { path: "/", element: <Navigate to="home" /> },
    ],
  },
]);
