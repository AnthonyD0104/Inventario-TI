// Componente: barra superior con usuario y cierre de sesión
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TopBar() {
  const raw = localStorage.getItem("usuario");
  const usuario = raw ? JSON.parse(raw) : null;
  const navigate = useNavigate();

  // Confirma, limpia la sesión y vuelve al login
  const handleLogout = async () => {
    const resultado = await Swal.fire({
      title: "¿Estás seguro de querer cerrar sesión?",
      text: "No podrás acceder a tu cuenta hasta que vuelvas a iniciar sesión.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });
    if (resultado.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      navigate("/login");
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-logo">
        Inventario TI
      </div>

      {/* Usuario de la sesión y botón de logout */}
      <div className="topbar-user">
        <div className="topbar-user-info">
          <span className="topbar-user-name">{usuario?.usuario}</span>
          <span className="topbar-user-rol">{usuario?.rol}</span>
        </div>
        <div className="topbar-avatar">{usuario?.usuario?.charAt(0).toUpperCase()}</div>
        <Tooltip title="Cerrar sesión">
          <IconButton
            onClick={() => {
              handleLogout();
            }}
            aria-label="Cerrar sesión"
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
}

export default TopBar;