import { NavLink } from "react-router-dom";

function Sidebar() {
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

                <NavLink
                    to="/mis-equipos"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>Mis Equipos</span>
                </NavLink>

                <NavLink
                    to="/solicitudes"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>Solicitudes</span>
                </NavLink>

                <NavLink
                    to="/equipos"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>Inventario de equipos</span>
                </NavLink>

                <NavLink
                    to="/usuarios"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>Usuarios</span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;