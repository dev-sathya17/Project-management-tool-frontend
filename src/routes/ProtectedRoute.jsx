import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, role } = useLoaderData();
  console.log(isAuthenticated, role);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    Navigate({ to: "/login", replace: true })
  );
};

export default ProtectedRoute;
