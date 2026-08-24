import * as yup from "yup";

// Valida campos del formulario de equipo
export const equipoSchema = yup.object({
    codigoActivo: yup
        .string()
        .required("El código de activo es obligatorio")
        .trim(),

    numeroSerie: yup
        .string()
        .required("El número de serie es obligatorio")
        .trim(),

    marca: yup
        .string()
        .required("La marca es obligatoria")
        .trim(),

    modelo: yup
        .string()
        .required("El modelo es obligatorio")
        .trim(),

    estado: yup
        .string()
        .required("El estado es obligatorio"),

    fechaCompra: yup
        .string()
        .required("La fecha de compra es obligatoria"),

    idCategoria: yup
        .number()
        .typeError("Selecciona una categoría")
        .required("La categoría es obligatoria")
        .positive("Selecciona una categoría"),
});
