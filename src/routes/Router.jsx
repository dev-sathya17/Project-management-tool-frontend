import { createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import userLoader from "../loaders/userLoader";
import LandingPage from "../pages/landing page/LandingPage";
import RegisterPage from "../pages/register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedRoute />,
    loader: userLoader.checkAuth,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
