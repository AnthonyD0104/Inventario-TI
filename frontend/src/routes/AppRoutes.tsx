import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Equipos from "../pages/Equipos/Equipos";
import Solicitudes from "../pages/Solicitudes/Solicitudes";
import HistorialSolicitudes from "../pages/HistorialSolicitudes/HistorialSolicitudes";
import Asignaciones from "../pages/Asignaciones/Asignaciones";
import MisEquipos from "../pages/MisEquipos/MisEquipos";
import Usuarios from "../pages/Usuarios/Usuarios";

// Rutas de la aplicación: públicas y protegidas
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: login */}
        <Route path="/login" element={<Login />} />

        {/* Guard: exige autenticación (JWT) */}
        <Route element={<ProtectedRoute />}>
          {/* Rutas protegidas con layout principal */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} /> {/* Dashboard */}
            <Route path="/equipos" element={<Equipos />} /> {/* Inventario */}
            <Route path="/usuarios" element={<Usuarios />} /> {/* Usuarios */}
            <Route path="/solicitudes" element={<Solicitudes />} /> {/* Flujo solicitudes */}
            <Route
              path="/historial-solicitudes"
              element={<HistorialSolicitudes />}
            /> {/* Auditoría de solicitudes */}
            <Route path="/asignaciones" element={<Asignaciones />} /> {/* Asignaciones */}
            <Route path="/mis-equipos" element={<MisEquipos />} /> {/* Equipos del colaborador */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
