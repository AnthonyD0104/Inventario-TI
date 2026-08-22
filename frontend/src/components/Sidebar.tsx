import { NavLink } from "react-router-dom";

function getRolSesion(): string {
  try {
    const raw = localStorage.getItem("usuario");
    if (!raw) return "";
    return JSON.parse(raw).rol ?? "";
  } catch {
    return "";
  }
}

function Sidebar() {
  const rol = getRolSesion();

  const puedeVerSolicitudes =
    rol === "ADMIN" || rol === "TI" || rol === "RRHH";
  const puedeVerEquipos = rol === "ADMIN" || rol === "TI";

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Inicio</span>
        </NavLink>

        {puedeVerSolicitudes && (
          <NavLink
            to="/solicitudes"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>Solicitudes</span>
          </NavLink>
        )}

        {puedeVerEquipos && (
          <NavLink
            to="/equipos"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>Inventario de equipos</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
