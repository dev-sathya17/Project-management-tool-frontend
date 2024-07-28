import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const AuthenticatedRoute = () => {
  const { isAuthenticated, role } = useLoaderData();

  if (isAuthenticated) {
    if (role === "admin") {
      return <Navigate to="/auth/admin/dashboard" replace={true} />;
    } else if (role === "employee") {
      return <Navigate to="/auth/employee/dashboard" replace={true} />;
    } else {
      return <Navigate to="/auth/dashboard" replace={true} />;
    }
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
