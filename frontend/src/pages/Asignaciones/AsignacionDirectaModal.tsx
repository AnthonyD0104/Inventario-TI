// Modal: asignación directa de equipo a usuario
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
} from "@mui/material";
import Swal from "sweetalert2";

import { asignarEquipoDirecto } from "../../api/asignacion";
import { obtenerEquipos } from "../../api/equipo";
import { obtenerUsuarios } from "../../api/usuario";
import type { EquipoResponse } from "../../types/equipo";
import type { UsuarioResponse } from "../../types/usuario";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

function AsignacionDirectaModal({ open, onClose, onSaved }: Props) {
  // Listas y campos del formulario
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [equipos, setEquipos] = useState<EquipoResponse[]>([]);
  const [idUsuario, setIdUsuario] = useState<number | "">("");
  const [idEquipo, setIdEquipo] = useState<number | "">("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    // Carga usuarios activos y equipos disponibles al abrir
    const cargar = async () => {
      setError("");
      setIdUsuario("");
      setIdEquipo("");
      setObservaciones("");

      try {
        const [usuariosData, equiposData] = await Promise.all([
          obtenerUsuarios(),
          obtenerEquipos(),
        ]);
        setUsuarios(usuariosData.filter((u) => u.activo));
        setEquipos(
          equiposData.filter((e) => e.activo && e.estado === "DISPONIBLE")
        );
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar usuarios o equipos.");
      }
    };

    cargar();
  }, [open]);

  // Confirma y registra la asignación en el backend
  const handleGuardar = async () => {
    if (!idUsuario || !idEquipo) {
      setError("Selecciona usuario y equipo.");
      return;
    }

    const ok = await Swal.fire({
      title: "¿Registrar asignación directa?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Asignar",
      cancelButtonText: "Cancelar",
    });

    if (!ok.isConfirmed) return;

    setLoading(true);
    setError("");

    try {
      await asignarEquipoDirecto({
        idUsuario: Number(idUsuario),
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
      setError("No se pudo completar la asignación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Asignación directa</DialogTitle>
      <DialogContent>
        {/* Formulario: usuario, equipo disponible y observaciones */}
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            select
            label="Usuario"
            fullWidth
            value={idUsuario}
            onChange={(e) =>
              setIdUsuario(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          >
            <MenuItem value="">Selecciona un usuario</MenuItem>
            {usuarios.map((u) => (
              <MenuItem key={u.idUsuario} value={u.idUsuario}>
                {u.usuario} — {u.nombres} {u.apellidos}
              </MenuItem>
            ))}
          </TextField>

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
      {/* Acciones: cancelar o asignar */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleGuardar} disabled={loading}>
          {loading ? "Asignando..." : "Asignar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AsignacionDirectaModal;
