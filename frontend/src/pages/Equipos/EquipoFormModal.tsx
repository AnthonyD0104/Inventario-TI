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

import { crearEquipo, actualizarEquipo } from "../../api/equipo";
import { obtenerCategorias } from "../../api/categoria";
import type { EquipoRequest, EquipoResponse } from "../../types/equipo";
import type { CategoriaEquipo } from "../../types/categoria";
import { equipoSchema } from "../../schemas/equipoSchema";

type EquipoFormModalProps = {
  open: boolean;
  onClose: () => void;
  equipo: EquipoResponse | null;
  onSaved: () => void;
};

const ESTADOS = ["DISPONIBLE", "ASIGNADO", "MANTENIMIENTO", "BAJA"] as const;

const valoresVacios: EquipoRequest = {
  codigoActivo: "",
  numeroSerie: "",
  marca: "",
  modelo: "",
  estado: "DISPONIBLE",
  fechaCompra: "",
  idCategoria: undefined as unknown as number,
};

function EquipoFormModal({
  open,
  onClose,
  equipo,
  onSaved,
}: EquipoFormModalProps) {
  const esEdicion = equipo !== null;

  const [categorias, setCategorias] = useState<CategoriaEquipo[]>([]);
  const [errorGeneral, setErrorGeneral] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EquipoRequest>({
    resolver: yupResolver(equipoSchema),
    defaultValues: valoresVacios,
  });

  useEffect(() => {
    if (!open) return;

    const prepararModal = async () => {
      setErrorGeneral("");

      try {
        const data = await obtenerCategorias();
        setCategorias(data.filter((c) => c.activo));
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setErrorGeneral("No se pudieron cargar las categorías.");
      }

      if (equipo) {
        reset({
          codigoActivo: equipo.codigoActivo,
          numeroSerie: equipo.numeroSerie,
          marca: equipo.marca,
          modelo: equipo.modelo,
          estado: equipo.estado,
          fechaCompra: equipo.fechaCompra
            ? String(equipo.fechaCompra).slice(0, 10)
            : "",
          idCategoria: equipo.idCategoria,
        });
      } else {
        reset(valoresVacios);
      }
    };

    prepararModal();
  }, [open, equipo, reset]);

  const handleClose = () => {
    reset(valoresVacios);
    setErrorGeneral("");
    onClose();
  };

  const onSubmit = async (datos: EquipoRequest) => {
    setErrorGeneral("");

    const confirmacion = await Swal.fire({
      title: esEdicion
        ? "¿Guardar cambios del equipo?"
        : "¿Crear este equipo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: esEdicion ? "Guardar" : "Crear",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      if (esEdicion && equipo) {
        await actualizarEquipo(equipo.idEquipo, datos);
      } else {
        await crearEquipo(datos);
      }

      await Swal.fire({
        icon: "success",
        title: esEdicion ? "Equipo actualizado" : "Equipo creado",
        timer: 1500,
        showConfirmButton: false,
      });

      reset(valoresVacios);
      onSaved();
      onClose();
    } catch (error) {
      console.error("Error al guardar equipo:", error);
      setErrorGeneral("No se pudo guardar el equipo. Revisa los datos.");
    }
  };

  return (
    <Dialog
      key={equipo?.idEquipo ?? "nuevo"}
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {esEdicion ? "Editar equipo" : "Nuevo equipo"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="codigoActivo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Código de activo"
                  fullWidth
                  error={!!errors.codigoActivo}
                  helperText={errors.codigoActivo?.message}
                />
              )}
            />

            <Controller
              name="numeroSerie"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de serie"
                  fullWidth
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />
              )}
            />

            <Controller
              name="marca"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Marca"
                  fullWidth
                  error={!!errors.marca}
                  helperText={errors.marca?.message}
                />
              )}
            />

            <Controller
              name="modelo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Modelo"
                  fullWidth
                  error={!!errors.modelo}
                  helperText={errors.modelo?.message}
                />
              )}
            />

            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Estado"
                  fullWidth
                  error={!!errors.estado}
                  helperText={errors.estado?.message}
                >
                  {ESTADOS.map((estadoOption) => (
                    <MenuItem key={estadoOption} value={estadoOption}>
                      {estadoOption}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="fechaCompra"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de compra"
                  type="date"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.fechaCompra}
                  helperText={errors.fechaCompra?.message}
                />
              )}
            />

            <Controller
              name="idCategoria"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Categoría"
                  fullWidth
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.idCategoria}
                  helperText={errors.idCategoria?.message}
                >
                  <MenuItem value="">Selecciona una categoría</MenuItem>
                  {categorias.map((categoriaOption) => (
                    <MenuItem
                      key={categoriaOption.idCategoria}
                      value={categoriaOption.idCategoria}
                    >
                      {categoriaOption.nombre}
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
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : esEdicion
                ? "Guardar cambios"
                : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EquipoFormModal;
