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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route
              path="/historial-solicitudes"
              element={<HistorialSolicitudes />}
            />
            <Route path="/asignaciones" element={<Asignaciones />} />
            <Route path="/mis-equipos" element={<MisEquipos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
