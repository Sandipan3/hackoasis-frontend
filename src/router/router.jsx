import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "./Layout";
import Login from "../pages/Login";
import CreateElection from "../pages/CreateElection";
import RegisterVoters from "../pages/RegisterVoters";
import CastVote from "../pages/CastVote";
import CandidateManager from "../pages/CandidateManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },

      // Admin-only routes
      {
        element: <AdminRoute />,
        children: [
          { path: "/create", element: <CreateElection /> },
          { path: "/register", element: <RegisterVoters /> },
          { path: "/cast", element: <CastVote /> },
          { path: "/candidate", element: <CandidateManager /> },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <div>Welcome</div> },
          { path: "/cast", element: <CastVote /> },
        ],
      },
    ],
  },
]);

export default router;
