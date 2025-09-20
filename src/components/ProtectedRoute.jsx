import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthToken } from "../slices/authSlice";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const token = useSelector(selectAuthToken);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
