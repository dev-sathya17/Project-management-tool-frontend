import { createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import userLoader from "../loaders/userLoader";
import LandingPage from "../pages/landing page/LandingPage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import TeamLeaderDashboard from "../pages/teamLeader dashboard/TeamLeaderDashboard";
import EmployeeDashboard from "../pages/employee dashboard/EmployeeDashboard";
import AdminDashboard from "../pages/admin dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/not found/NotFound";
import ForgotPassword from "../pages/forgot password/ForgotPassword";
import Verify from "../pages/forgot password/Verify";

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
        path: "/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/verify/:authString",
        element: <Verify />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <ProtectedRoute />,
    loader: userLoader.checkAuth,
    children: [
      {
        path: "",
        element: <TeamLeaderDashboard />,
        loader: userLoader.getProjects,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "admin",
    element: <ProtectedRoute />,
    loader: userLoader.checkAuth,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "employee",
    element: <ProtectedRoute />,
    loader: userLoader.checkAuth,
    children: [
      {
        path: "dashboard",
        element: <EmployeeDashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
