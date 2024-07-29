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
import Profile from "../pages/profile/Profile";
import Workspace from "../components/workspace/Workspace";
import DashboardEmployee from "../components/EmployeeDashboard/DashboardEmployee";
import taskLoader from "../loaders/taskLoader";

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
    path: "leader",
    element: <ProtectedRoute />,
    loader: userLoader.checkAuth,
    children: [
      {
        path: "dashboard",
        element: <TeamLeaderDashboard />,
        loader: userLoader.getProjects,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "profile",
        element: <Profile />,
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
        path: "",
        element: <EmployeeDashboard />,
        children: [
          {
            path: "dashboard",
            element: <DashboardEmployee />,
          },
          {
            path: "workspace",
            element: <Workspace />,
            loader: taskLoader.getTasks,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
