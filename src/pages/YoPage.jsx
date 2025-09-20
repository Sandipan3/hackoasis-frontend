import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const YoPage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <p>Welcome to yo</p>
      <br />
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default YoPage;
