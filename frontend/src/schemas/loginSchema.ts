import * as yup from "yup";

// Valida campos del login
export const loginSchema = yup.object({
    usuario: yup
        .string()
        .required("El usuario es obligatorio"),

    password: yup
        .string()
        .required("La contraseña es obligatoria"),
});
