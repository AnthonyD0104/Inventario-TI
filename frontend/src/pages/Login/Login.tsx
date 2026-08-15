import { useState, type SyntheticEvent } from "react";
import "./Login.css";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login({ usuario, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify({
        nombres: response.nombres,
        apellidos: response.apellidos,
        rol: response.rol,
      }));
      console.log("Login exitoso:", response);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      SetError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">

        <div className="login-header">
          <h1>Inventario TI</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>

            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                SetError("");
              }}
              placeholder="Ingresa tu usuario"
              required
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity("El campo es obligatorio");
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity("");
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                SetError("");
              }}
              placeholder="Ingresa tu contraseña"
              required
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity("El campo es obligatorio");
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity("");
              }}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

        </form>

      </section>
    </main>
  );
}

export default Login;