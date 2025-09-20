import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  //baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
