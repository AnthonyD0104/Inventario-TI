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
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

import { crearUsuarioDesdeSolicitud } from "../../api/solicitud";
import { obtenerRoles } from "../../api/rol";
import type {
  CrearUsuarioSolicitudRequest,
  SolicitudResponse,
} from "../../types/solicitud";
import type { Rol } from "../../types/rol";
import { crearUsuarioSolicitudSchema } from "../../schemas/solicitudSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  solicitud: SolicitudResponse | null;
  onSaved: () => void;
};

function CrearUsuarioModal({ open, onClose, solicitud, onSaved }: Props) {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [errorGeneral, setErrorGeneral] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CrearUsuarioSolicitudRequest>({
    resolver: yupResolver(crearUsuarioSolicitudSchema),
    defaultValues: {
      usuario: "",
      idRol: undefined as unknown as number,
    },
  });

  useEffect(() => {
    if (!open || !solicitud) return;

    const cargar = async () => {
      setErrorGeneral("");
      try {
        const data = await obtenerRoles();
        setRoles(data.filter((r) => r.activo));
      } catch (error) {
        console.error(error);
        setErrorGeneral("No se pudieron cargar los roles.");
      }

      const sugerido = `${solicitud.nombres}.${solicitud.apellidos}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");

      reset({
        usuario: sugerido,
        idRol: undefined as unknown as number,
      });
    };

    cargar();
  }, [open, solicitud, reset]);

  if (!solicitud) return null;

  const onSubmit = async (datos: CrearUsuarioSolicitudRequest) => {
    setErrorGeneral("");

    const ok = await Swal.fire({
      title: "¿Crear usuario para esta solicitud?",
      text: "La contraseña inicial será 123456",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Crear usuario",
      cancelButtonText: "Cancelar",
    });

    if (!ok.isConfirmed) return;

    try {
      await crearUsuarioDesdeSolicitud(solicitud.idSolicitud, datos);
      await Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: `Usuario: ${datos.usuario} / Contraseña: 123456`,
      });
      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
      setErrorGeneral("No se pudo crear el usuario.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear usuario</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Colaborador: {solicitud.nombres} {solicitud.apellidos} (
              {solicitud.correo})
            </Typography>

            <Controller
              name="usuario"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre de usuario"
                  fullWidth
                  error={!!errors.usuario}
                  helperText={errors.usuario?.message}
                />
              )}
            />

            <Controller
              name="idRol"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Rol"
                  fullWidth
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.idRol}
                  helperText={errors.idRol?.message}
                >
                  <MenuItem value="">Selecciona un rol</MenuItem>
                  {roles.map((r) => (
                    <MenuItem key={r.idRol} value={r.idRol}>
                      {r.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {errorGeneral && (
              <p style={{ color: "#dc2626", margin: 0 }}>{errorGeneral}</p>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear usuario"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CrearUsuarioModal;
