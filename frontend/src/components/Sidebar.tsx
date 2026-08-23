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
  const puedeVerAsignaciones = rol === "ADMIN" || rol === "TI";
  const puedeVerMisEquipos =
    rol === "ADMIN" ||
    rol === "TI" ||
    rol === "RRHH" ||
    rol === "EMPLEADO";

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

        {puedeVerMisEquipos && (
          <NavLink
            to="/mis-equipos"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>Mis equipos</span>
          </NavLink>
        )}

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

        {puedeVerSolicitudes && (
          <NavLink
            to="/historial-solicitudes"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>Historial</span>
          </NavLink>
        )}

        {puedeVerAsignaciones && (
          <NavLink
            to="/asignaciones"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>Asignaciones</span>
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
