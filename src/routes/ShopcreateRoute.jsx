import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const ShopcreateRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  const isLoggedIn = useAuth();

  if (!isLoggedIn || user?.role !== 'VENDOR' || user?.isVerified !== true) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
};

export default ShopcreateRoute;

