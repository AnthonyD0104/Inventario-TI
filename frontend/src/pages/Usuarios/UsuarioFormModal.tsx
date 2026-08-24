// Modal: alta/edición de usuario
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

import { crearUsuario, actualizarUsuario } from "../../api/usuario";
import { obtenerRoles } from "../../api/rol";
import { obtenerDepartamentos } from "../../api/departamento";
import type { UsuarioRequest, UsuarioResponse } from "../../types/usuario";
import type { Rol } from "../../types/rol";
import type { Departamento } from "../../types/departamento";
import { usuarioSchema } from "../../schemas/usuarioSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  usuario: UsuarioResponse | null;
  onSaved: () => void;
};

const valoresVacios: UsuarioRequest = {
  usuario: "",
  password: "",
  correo: "",
  nombres: "",
  apellidos: "",
  cargo: "",
  idRol: undefined as unknown as number,
  idDepartamento: undefined as unknown as number,
};

// Arma un usuario sugerido a partir del nombre
function sugerirUsuario(nombres: string, apellidos: string) {
  return `${nombres}.${apellidos}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function UsuarioFormModal({ open, onClose, usuario, onSaved }: Props) {
  const esEdicion = usuario !== null;

  // Catálogos y error de envío
  const [roles, setRoles] = useState<Rol[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [errorGeneral, setErrorGeneral] = useState("");

  // Validación del formulario de usuario
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UsuarioRequest>({
    resolver: yupResolver(usuarioSchema),
    defaultValues: valoresVacios,
  });

  const nombres = watch("nombres");
  const apellidos = watch("apellidos");
  const usuarioActual = watch("usuario");

  useEffect(() => {
    if (!open) return;

    // Carga roles/departamentos y rellena el formulario al abrir
    const preparar = async () => {
      setErrorGeneral("");

      try {
        const [rolesData, deptosData] = await Promise.all([
          obtenerRoles(),
          obtenerDepartamentos(),
        ]);
        const rolesActivos = rolesData.filter((r) => r.activo);
        const deptosActivos = deptosData.filter((d) => d.activo);
        setRoles(rolesActivos);
        setDepartamentos(deptosActivos);

        if (usuario) {
          const idRol =
            rolesActivos.find((r) => r.nombre === usuario.rol)?.idRol ??
            (undefined as unknown as number);
          const idDepartamento =
            deptosActivos.find((d) => d.nombre === usuario.departamento)
              ?.idDepartamento ?? (undefined as unknown as number);

          reset({
            usuario: usuario.usuario,
            password: "",
            correo: usuario.correo,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            cargo: usuario.cargo,
            idRol,
            idDepartamento,
          });
        } else {
          reset(valoresVacios);
        }
      } catch (error) {
        console.error(error);
        setErrorGeneral("No se pudieron cargar roles o departamentos.");
      }
    };

    preparar();
  }, [open, usuario, reset]);

  // Sugiere el nombre de usuario al escribir nombre y apellidos
  useEffect(() => {
    if (esEdicion || !open) return;
    if (usuarioActual) return;
    if (!nombres.trim() || !apellidos.trim()) return;

    setValue("usuario", sugerirUsuario(nombres, apellidos));
  }, [nombres, apellidos, esEdicion, open, usuarioActual, setValue]);

  // Limpia el formulario y cierra el modal
  const handleClose = () => {
    reset(valoresVacios);
    setErrorGeneral("");
    onClose();
  };

  // Envía el formulario al backend (crear o actualizar)
  const onSubmit = async (datos: UsuarioRequest) => {
    setErrorGeneral("");

    const ok = await Swal.fire({
      title: esEdicion ? "¿Guardar cambios del usuario?" : "¿Crear este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: esEdicion ? "Guardar" : "Crear",
      cancelButtonText: "Cancelar",
    });

    if (!ok.isConfirmed) return;

    try {
      if (esEdicion && usuario) {
        await actualizarUsuario(usuario.idUsuario, datos);
      } else {
        await crearUsuario(datos);
      }

      await Swal.fire({
        icon: "success",
        title: esEdicion ? "Usuario actualizado" : "Usuario creado",
        timer: 1400,
        showConfirmButton: false,
      });

      onSaved();
      handleClose();
    } catch (error) {
      console.error(error);
      setErrorGeneral(
        esEdicion
          ? "No se pudo actualizar el usuario."
          : "No se pudo crear el usuario. Verifica que usuario y correo no estén en uso."
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{esEdicion ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* Datos personales, credenciales, rol y departamento */}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="nombres"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombres"
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
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label={esEdicion ? "Nueva contraseña" : "Contraseña"}
                  fullWidth
                  error={!!errors.password}
                  helperText={
                    errors.password?.message ??
                    (esEdicion
                      ? "Obligatoria al editar."
                      : undefined)
                  }
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
                  type="email"
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

            {errorGeneral && (
              <p style={{ color: "#dc2626", margin: 0 }}>{errorGeneral}</p>
            )}
          </Stack>
        </DialogContent>
        {/* Acciones: cancelar o guardar */}
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : esEdicion
                ? "Guardar"
                : "Crear usuario"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UsuarioFormModal;
