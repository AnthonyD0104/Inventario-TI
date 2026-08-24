// Modal: detalle de equipo (solo lectura)
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { EquipoResponse } from "../../types/equipo";

type EquipoDetalleModalProps = {
  open: boolean;
  onClose: () => void;
  equipo: EquipoResponse | null;
};

/** Modal solo lectura: muestra los datos sin formulario */
function EquipoDetalleModal({
  open,
  onClose,
  equipo,
}: EquipoDetalleModalProps) {
  if (!equipo) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalle del equipo</DialogTitle>

      <DialogContent>
        {/* Datos del equipo */}
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          <Campo label="Código" valor={equipo.codigoActivo} />
          <Campo label="N.º serie" valor={equipo.numeroSerie} />
          <Campo label="Marca" valor={equipo.marca} />
          <Campo label="Modelo" valor={equipo.modelo} />
          <Campo label="Categoría" valor={equipo.categoria} />
          <Campo label="Estado" valor={equipo.estado} />
          <Campo
            label="Fecha de compra"
            valor={
              equipo.fechaCompra
                ? String(equipo.fechaCompra).slice(0, 10)
                : "—"
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Fila etiqueta-valor del detalle
function Campo({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{valor}</Typography>
    </div>
  );
}

export default EquipoDetalleModal;
