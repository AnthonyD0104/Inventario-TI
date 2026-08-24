import * as yup from "yup";

// Valida campos de una solicitud
export const solicitudSchema = yup.object({
  nombres: yup.string().required("Los nombres son obligatorios").trim(),
  apellidos: yup.string().required("Los apellidos son obligatorios").trim(),
  correo: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio")
    .trim(),
  cargo: yup.string().required("El cargo es obligatorio").trim(),
  observaciones: yup.string().optional(),
  idDepartamento: yup
    .number()
    .typeError("Selecciona un departamento")
    .required("El departamento es obligatorio")
    .positive("Selecciona un departamento"),
});

// Valida usuario y rol al crear usuario desde solicitud
export const crearUsuarioSolicitudSchema = yup.object({
  usuario: yup.string().required("El usuario es obligatorio").trim(),
  idRol: yup
    .number()
    .typeError("Selecciona un rol")
    .required("El rol es obligatorio")
    .positive("Selecciona un rol"),
});
