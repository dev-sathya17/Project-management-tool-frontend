import { createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import userLoader from "../loaders/userLoader";
import LandingPage from "../pages/landing page/LandingPage";

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
    ],
  },
]);

export default router;
