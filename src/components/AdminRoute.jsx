import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthToken, selectAuthAddress } from "../slices/authSlice";
import api from "../api/api";
import toast from "react-hot-toast";

const AdminRoute = () => {
  const token = useSelector(selectAuthToken);
  const publicAddress = useSelector(selectAuthAddress);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.post("/vote/role", {
          userAddress: publicAddress,
        });
        setIsAdmin(res.data.isAdmin);
      } catch (error) {
        toast.error("Failed to verify admin role");
        setIsAdmin(false);
      }
    };

    if (token && publicAddress) checkAdmin();
  }, [token, publicAddress]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
