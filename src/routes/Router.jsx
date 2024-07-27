import { createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import userLoader from "../loaders/userLoader";
import LandingPage from "../pages/landing page/LandingPage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import TeamLeaderDashboard from "../pages/teamLeader dashboard/TeamLeaderDashboard";
import EmployeeDashboard from "../pages/employee dashboard/EmployeeDashboard";
import AdminDashboard from "../pages/admin dashboard/AdminDashboard";
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
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        children: [
          {
            path: "employee",
            element: <EmployeeDashboard />,
          },
          {
            path: "teamleader",
            element: <TeamLeaderDashboard />,
          },
          {
            path: "admin",
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
