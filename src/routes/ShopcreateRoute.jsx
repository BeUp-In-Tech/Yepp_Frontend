import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useHandleCurrentLoggedInUserQuery } from "../features/auth/authApi";
import { useEffect } from "react";
import { userLoggedIn } from "../features/auth/authSlice";
import EmailVerifySkeleton from "../components/skeleton/EmailVerifySkeleton";

const ShopcreateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { data: currentUser, isLoading } = useHandleCurrentLoggedInUserQuery();

  useEffect(() => {
    if (currentUser) {
      dispatch(userLoggedIn(currentUser?.data));
    }
  }, [currentUser, dispatch])

  if (isLoading) {
    return <EmailVerifySkeleton />;
  }

  if (!isLoggedIn || user?.role !== 'VENDOR') {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified !== true) {
    return <Navigate to="/verificationcode" replace />;
  }

  return children ?? <Outlet />;
};

export default ShopcreateRoute;