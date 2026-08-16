import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li>
            <Link to="/equipos">Mis Equipos</Link>
          </li>

          <li>
            <Link to="/solicitudes">Solicitudes</Link>
          </li>

          <li>
            <Link to="/inventario">Inventario TI</Link>
          </li>

          <li>
            <Link to="/usuarios">Usuarios</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;