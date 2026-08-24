import { Navigate, Outlet } from "react-router-dom";

// Guard: exige JWT; si no hay token redirige a /login
function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
