import { Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useHandleCurrentLoggedInUserQuery } from "../features/auth/authApi";
import EmailVerifySkeleton from "../components/skeleton/EmailVerifySkeleton";
import { useEffect } from "react";
import { userLoggedIn } from "../features/auth/authSlice";
import useAuth from './../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  const { data: currentUser, isLoading } = useHandleCurrentLoggedInUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.data) {
      dispatch(userLoggedIn(currentUser?.data));
    }
  }, [currentUser, dispatch])

  if (isLoading) {
    return <EmailVerifySkeleton />;
  }

  if (!isLoggedIn || currentUser?.data?.role !== "VENDOR" || currentUser?.data?.isShopCreated !== true) {
    return <Navigate to="/verdor-created-shop" replace />;
  }

  return children ?? <Outlet />;
};

export default PrivateRoute;
