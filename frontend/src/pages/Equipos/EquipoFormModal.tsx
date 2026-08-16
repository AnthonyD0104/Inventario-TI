import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";

import { crearEquipo } from "../../api/equipo";
import { obtenerCategorias } from "../../api/categoria";
import type { EquipoRequest } from "../../types/equipo";
import type { CategoriaEquipo } from "../../types/categoria";
import { equipoSchema } from "../../schemas/equipoSchema";
import Swal from "sweetalert2";

type EquipoFormModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const ESTADOS = ["DISPONIBLE", "ASIGNADO", "MANTENIMIENTO", "BAJA"] as const;

function EquipoFormModal({ open, onClose, onCreated }: EquipoFormModalProps) {
  const [categorias, setCategorias] = useState<CategoriaEquipo[]>([]);
  const [errorGeneral, setErrorGeneral] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EquipoRequest>({
    resolver: yupResolver(equipoSchema),
    defaultValues: {
      codigoActivo: "",
      numeroSerie: "",
      marca: "",
      modelo: "",
      estado: "DISPONIBLE",
      fechaCompra: "",
      idCategoria: undefined as unknown as number,
    },
  });

  useEffect(() => {
    if (!open) return;

    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data.filter((c) => c.activo));
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setErrorGeneral(
          "No se pudieron cargar las categorías."
        );
      }
    };

    cargarCategorias();
  }, [open]);

  const handleClose = () => {
    reset();
    setErrorGeneral("");
    onClose();
  };

  const onSubmit = async (datos: EquipoRequest) => {
    setErrorGeneral("");

    try {
      const resultado = await Swal.fire({
        title: "¿Estás seguro de querer crear el equipo?",
        text: "No podrás revertir esta acción.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar",
      });
      if (resultado.isConfirmed) {
        await crearEquipo(datos);
        reset();
        onCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error al crear equipo:", error);
      setErrorGeneral("No se pudo crear el equipo. Revisa los datos.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo equipo</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Código de activo"
              fullWidth
              {...register("codigoActivo")}
              error={!!errors.codigoActivo}
              helperText={errors.codigoActivo?.message}
            />

            <TextField
              label="Número de serie"
              fullWidth
              {...register("numeroSerie")}
              error={!!errors.numeroSerie}
              helperText={errors.numeroSerie?.message}
            />

            <TextField
              label="Marca"
              fullWidth
              {...register("marca")}
              error={!!errors.marca}
              helperText={errors.marca?.message}
            />

            <TextField
              label="Modelo"
              fullWidth
              {...register("modelo")}
              error={!!errors.modelo}
              helperText={errors.modelo?.message}
            />

            <TextField
              select
              label="Estado"
              fullWidth
              defaultValue="DISPONIBLE"
              {...register("estado")}
              error={!!errors.estado}
              helperText={errors.estado?.message}
            >
              {ESTADOS.map((estadoOption) => (
                <MenuItem key={estadoOption} value={estadoOption}>
                  {estadoOption}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Fecha de compra"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("fechaCompra")}
              error={!!errors.fechaCompra}
              helperText={errors.fechaCompra?.message}
            />

            <TextField
              select
              label="Categoría"
              fullWidth
              defaultValue=""
              {...register("idCategoria", { valueAsNumber: true })}
              error={!!errors.idCategoria}
              helperText={errors.idCategoria?.message}
            >
              <MenuItem value="">
                Selecciona una categoría
              </MenuItem>

              {categorias.map((categoriaOption) => (
                <MenuItem
                  key={categoriaOption.idCategoria}
                  value={categoriaOption.idCategoria}
                >
                  {categoriaOption.nombre}
                </MenuItem>
              ))}
            </TextField>

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
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EquipoFormModal;
