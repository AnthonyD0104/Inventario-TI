import { useNavigate } from "react-router-dom";

function Home() {
  const raw = localStorage.getItem("usuario");
  const usuario = raw ? JSON.parse(raw) : null;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido, {usuario?.nombres} {usuario?.apellidos}</h1>
    </div>
  );
}

export default Home;