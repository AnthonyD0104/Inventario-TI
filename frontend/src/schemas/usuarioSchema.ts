import * as yup from "yup";

// Valida campos del formulario de usuario
export const usuarioSchema = yup.object({
  usuario: yup
    .string()
    .required("El nombre de usuario es obligatorio")
    .trim()
    .max(50, "Máximo 50 caracteres"),

  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres"),

  correo: yup
    .string()
    .required("El correo es obligatorio")
    .email("Correo inválido")
    .trim(),

  nombres: yup
    .string()
    .required("Los nombres son obligatorios")
    .trim(),

  apellidos: yup
    .string()
    .required("Los apellidos son obligatorios")
    .trim(),

  cargo: yup
    .string()
    .required("El cargo es obligatorio")
    .trim(),

  idRol: yup
    .number()
    .typeError("Selecciona un rol")
    .required("El rol es obligatorio")
    .positive("Selecciona un rol"),

  idDepartamento: yup
    .number()
    .typeError("Selecciona un departamento")
    .required("El departamento es obligatorio")
    .positive("Selecciona un departamento"),
});
