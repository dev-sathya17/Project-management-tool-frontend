import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const AuthenticatedRoute = () => {
  const isAuthenticated = useLoaderData();

  return isAuthenticated ? (
    Navigate({ to: "/dashboard", replace: true })
  ) : (
    <Outlet />
  );
};

export default AuthenticatedRoute;
