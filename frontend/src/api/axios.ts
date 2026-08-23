import axios from "axios";

const api = axios.create({
  // Docker/nginx: VITE_API_URL=/api (same origin)
  // Local npm run dev: http://localhost:8080/api
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;