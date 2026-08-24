// Modal: alta de solicitud de equipo
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";

import { crearSolicitud } from "../../api/solicitud";
import { obtenerDepartamentos } from "../../api/departamento";
import type { SolicitudRequest } from "../../types/solicitud";
import type { Departamento } from "../../types/departamento";
import { solicitudSchema } from "../../schemas/solicitudSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

const vacio: SolicitudRequest = {
  nombres: "",
  apellidos: "",
  correo: "",
  cargo: "",
  observaciones: "",
  idDepartamento: undefined as unknown as number,
};

function SolicitudFormModal({ open, onClose, onSaved }: Props) {
  // Departamentos activos y error de envío
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [errorGeneral, setErrorGeneral] = useState("");

  // Validación del formulario de solicitud
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SolicitudRequest>({
    resolver: yupResolver(solicitudSchema),
    defaultValues: vacio,
  });

  useEffect(() => {
    if (!open) return;

    // Carga departamentos y limpia el formulario al abrir
    const cargar = async () => {
      setErrorGeneral("");
      try {
        const data = await obtenerDepartamentos();
        setDepartamentos(data.filter((d) => d.activo));
      } catch (error) {
        console.error(error);
        setErrorGeneral("No se pudieron cargar los departamentos.");
      }
      reset(vacio);
    };

    cargar();
  }, [open, reset]);

  // Limpia el formulario y cierra el modal
  const handleClose = () => {
    reset(vacio);
    setErrorGeneral("");
    onClose();
  };

  // Envía la solicitud al backend
  const onSubmit = async (datos: SolicitudRequest) => {
    setErrorGeneral("");

    const ok = await Swal.fire({
      title: "¿Crear esta solicitud?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
    });

    if (!ok.isConfirmed) return;

    try {
      await crearSolicitud(datos);
      await Swal.fire({
        icon: "success",
        title: "Solicitud creada",
        timer: 1400,
        showConfirmButton: false,
      });
      reset(vacio);
      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
      setErrorGeneral("No se pudo crear la solicitud.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Nueva solicitud de equipo</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* Datos del colaborador y departamento */}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="nombres"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombres del colaborador"
                  fullWidth
                  error={!!errors.nombres}
                  helperText={errors.nombres?.message}
                />
              )}
            />
            <Controller
              name="apellidos"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellidos"
                  fullWidth
                  error={!!errors.apellidos}
                  helperText={errors.apellidos?.message}
                />
              )}
            />
            <Controller
              name="correo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  fullWidth
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
                />
              )}
            />
            <Controller
              name="cargo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Cargo"
                  fullWidth
                  error={!!errors.cargo}
                  helperText={errors.cargo?.message}
                />
              )}
            />
            <Controller
              name="idDepartamento"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Departamento"
                  fullWidth
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.idDepartamento}
                  helperText={errors.idDepartamento?.message}
                >
                  <MenuItem value="">Selecciona un departamento</MenuItem>
                  {departamentos.map((d) => (
                    <MenuItem key={d.idDepartamento} value={d.idDepartamento}>
                      {d.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="observaciones"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Observaciones"
                  fullWidth
                  multiline
                  minRows={2}
                />
              )}
            />
            {errorGeneral && (
              <p style={{ color: "#dc2626", margin: 0 }}>{errorGeneral}</p>
            )}
          </Stack>
        </DialogContent>
        {/* Acciones: cancelar o crear solicitud */}
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Crear solicitud"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SolicitudFormModal;
