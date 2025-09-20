import { Outlet } from "react-router-dom";
import React from "react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex justify-center items-start p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
}
