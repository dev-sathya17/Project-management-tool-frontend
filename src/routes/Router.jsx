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
import Users from "../pages/Users/Users";
import adminLoader from "../loaders/adminLoader";
import ViewTeam from "../pages/view team/ViewTeam";
import projectLoader from "../loaders/projectLoader";
import ManageTeam from "../pages/manage team/ManageTeam";
import ManageProjects from "../pages/manage projects/ManageProjects";
import Project from "../pages/project/Project";
import ReportDashboard from "../pages/reports/Reports";
import ActivateUser from "../pages/activate user/ActivateUser";
import AddProject from "../pages/add project/AddProject";

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
        path: "activate/:id",
        element: <ActivateUser />,
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
      {
        path: ":projectId/manage-team",
        element: <ManageTeam />,
      },
      {
        path: "projects",
        element: <ManageProjects />,
        loader: userLoader.getProjects,
      },
      {
        path: "projects/:projectId",
        element: <Project />,
      },
      {
        path: "reports",
        element: <ReportDashboard />,
        loader: userLoader.getProjects,
      },
      {
        path: "add-project",
        element: <AddProject />,
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
      {
        path: "users",
        element: <Users />,
        loader: adminLoader.getAllUsers,
      },
      {
        path: "reports",
        element: <ReportDashboard />,
        loader: adminLoader.getAllProjects,
      },
      {
        path: "projects",
        element: <ManageProjects />,
        loader: adminLoader.getAllProjects,
      },
      {
        path: "projects/:projectId",
        element: <Project />,
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
      {
        path: "team",
        element: <ViewTeam />,
        loader: projectLoader.getProjectMembers,
      },
    ],
  },
]);

export default router;
