import { createBrowserRouter } from "react-router-dom";
import SigninPage from "./auth/signin";

export default createBrowserRouter([
  { path: "signin", element: <SigninPage /> },
]);
