// Página: inicio de sesión
import "./Login.css";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { LoginRequest } from "../../types/auth";
import { loginSchema } from "../../schemas/loginSchema";

function Login() {
  const navigate = useNavigate();

  // Validación del formulario de login
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  // Autentica, guarda sesión y redirige al inicio
  const onSubmit = async (datos: LoginRequest) => {
    try {
      const response = await login(datos);

      localStorage.setItem("token", response.token);

      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nombres: response.nombres,
          apellidos: response.apellidos,
          rol: response.rol,
          usuario: response.usuario,
        })
      );

      navigate("/");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setError("root", {
        message: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">

        <div className="login-header">
          <h1>Inventario TI</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        {/* Formulario de usuario y contraseña */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >

          <div className="form-group">
            <label htmlFor="usuario">
              Usuario
            </label>

            <input
              id="usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              {...register("usuario", {
                onChange: () => clearErrors("root"),
              })}
            />

            {errors.usuario && (
              <p className="field-error">
                {errors.usuario.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                onChange: () => clearErrors("root"),
              })}
            />

            {errors.password && (
              <p className="field-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p className="error-message">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>

        </form>

      </section>
    </main>
  );
}

export default Login;