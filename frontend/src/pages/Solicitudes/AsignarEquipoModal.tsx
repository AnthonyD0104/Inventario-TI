import { useEffect, useState } from "react";
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

import { asignarEquipoSolicitud } from "../../api/solicitud";
import { obtenerEquipos } from "../../api/equipo";
import type { SolicitudResponse } from "../../types/solicitud";
import type { EquipoResponse } from "../../types/equipo";

type Props = {
  open: boolean;
  onClose: () => void;
  solicitud: SolicitudResponse | null;
  onSaved: () => void;
};

function AsignarEquipoModal({ open, onClose, solicitud, onSaved }: Props) {
  const [equipos, setEquipos] = useState<EquipoResponse[]>([]);
  const [idEquipo, setIdEquipo] = useState<number | "">("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const cargar = async () => {
      setError("");
      setIdEquipo("");
      setObservaciones("");
      try {
        const data = await obtenerEquipos();
        setEquipos(
          data.filter((e) => e.activo && e.estado === "DISPONIBLE")
        );
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los equipos disponibles.");
      }
    };

    cargar();
  }, [open]);

  if (!solicitud) return null;

  const handleAsignar = async () => {
    if (!idEquipo) {
      setError("Selecciona un equipo.");
      return;
    }

    const ok = await Swal.fire({
      title: "¿Asignar este equipo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Asignar",
      cancelButtonText: "Cancelar",
    });

    if (!ok.isConfirmed) return;

    setLoading(true);
    setError("");

    try {
      await asignarEquipoSolicitud(solicitud.idSolicitud, {
        idEquipo: Number(idEquipo),
        observaciones: observaciones || undefined,
      });
      await Swal.fire({
        icon: "success",
        title: "Equipo asignado",
        timer: 1400,
        showConfirmButton: false,
      });
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError("No se pudo asignar el equipo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Asignar equipo</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Usuario: {solicitud.usuarioCreado ?? "—"} — {solicitud.nombres}{" "}
            {solicitud.apellidos}
          </Typography>

          <TextField
            select
            label="Equipo disponible"
            fullWidth
            value={idEquipo}
            onChange={(e) =>
              setIdEquipo(e.target.value === "" ? "" : Number(e.target.value))
            }
          >
            <MenuItem value="">Selecciona un equipo</MenuItem>
            {equipos.map((e) => (
              <MenuItem key={e.idEquipo} value={e.idEquipo}>
                {e.codigoActivo} — {e.marca} {e.modelo}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Observaciones"
            fullWidth
            multiline
            minRows={2}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          {error && <p style={{ color: "#dc2626", margin: 0 }}>{error}</p>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleAsignar} disabled={loading}>
          {loading ? "Asignando..." : "Asignar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AsignarEquipoModal;
