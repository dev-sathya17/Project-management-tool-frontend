import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const AuthenticatedRoute = () => {
  const { isAuthenticated, role } = useLoaderData();
  console.log(isAuthenticated, role);

  if (isAuthenticated) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace={true} />;
    } else if (role === "employee") {
      return <Navigate to="/employee/dashboard" replace={true} />;
    } else {
      return <Navigate to="/dashboard" replace={true} />;
    }
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
