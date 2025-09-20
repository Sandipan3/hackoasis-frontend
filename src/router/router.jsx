import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Layout from "./Layout";
import YoPage from "../pages/YoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Routes
      { path: "/login", element: <Login /> },
      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <div>Welcome to your Dashboard!</div> },
          { path: "/dummy", element: <div>This is a dummy page</div> },
          { path: "/yo", element: <YoPage /> },
        ],
      },
    ],
  },
]);

export default router;
