import { useNavigate } from "react-router-dom";

function Home() {
  const raw = localStorage.getItem("usuario");
  const usuario = raw ? JSON.parse(raw) : null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div>
      <h1>Bienvenido, {usuario?.nombres} {usuario?.apellidos}</h1>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Home;