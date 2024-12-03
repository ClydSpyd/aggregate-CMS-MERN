import { useAuth } from "../../../contexts/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { loading, user } = useAuth();

  return !loading && !user ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
