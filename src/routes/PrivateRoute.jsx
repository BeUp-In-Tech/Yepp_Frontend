import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  const isLoggedIn = useAuth();

  if (!isLoggedIn || user?.role !== "VENDOR" || user?.isShopCreated !== true) {
    return <Navigate to="/verdor-created-shop" replace />;
  }

  return children ?? <Outlet />;
};

export default PrivateRoute;
