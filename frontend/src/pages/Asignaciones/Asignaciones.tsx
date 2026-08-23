import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Chip,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";

import {
  devolverEquipo,
  obtenerAsignaciones,
} from "../../api/asignacion";
import type { AsignacionEquipoResponse } from "../../types/asignacion";
import AsignacionDirectaModal from "./AsignacionDirectaModal";
import "./Asignaciones.css";

function formatFecha(fecha: string | null) {
  if (!fecha) return "—";
  return String(fecha).replace("T", " ").slice(0, 16);
}

function Asignaciones() {
  const [asignaciones, setAsignaciones] = useState<AsignacionEquipoResponse[]>(
    []
  );
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargar = useCallback(async () => {
    try {
      const data = await obtenerAsignaciones();
      setAsignaciones(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No se pudieron cargar las asignaciones",
      });
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const handleDevolver = async (a: AsignacionEquipoResponse) => {
    const ok = await Swal.fire({
      title: "¿Registrar devolución?",
      text: `${a.codigoActivo} — ${a.usuario}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Devolver",
      cancelButtonText: "Cancelar",
    });

    if (!ok.isConfirmed) return;

    try {
      await devolverEquipo(a.idAsignacion);
      await Swal.fire({
        icon: "success",
        title: "Equipo devuelto",
        timer: 1400,
        showConfirmButton: false,
      });
      cargar();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "No se pudo devolver el equipo" });
    }
  };

  const filtradas = asignaciones.filter((a) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      `${a.usuario} ${a.codigoActivo} ${a.numeroSerie} ${a.usuarioTi} ${a.observaciones ?? ""}`
        .toLowerCase()
        .includes(texto);
    const coincideEstado = estado === "" || a.estado === estado;
    return coincideTexto && coincideEstado;
  });

  const estados = [...new Set(asignaciones.map((a) => a.estado))];

  return (
    <div className="asignaciones-page">
      <div className="asignaciones-header">
        <div>
          <h1>Asignaciones</h1>
          <p>
            Gestión de equipos asignados a usuarios (por solicitud o directa).
          </p>
        </div>
        <Button variant="contained" onClick={() => setModalAbierto(true)}>
          + Asignación directa
        </Button>
      </div>

      <div className="asignaciones-card">
        <div className="asignaciones-filtros">
          <TextField
            label="Buscar"
            placeholder="Usuario, equipo, TI..."
            size="small"
            fullWidth
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Todos los estados</MenuItem>
            {estados.map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Equipo</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Asignado por</TableCell>
                <TableCell>Fecha asignación</TableCell>
                <TableCell>Fecha devolución</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtradas.map((a) => (
                <TableRow key={a.idAsignacion} hover>
                  <TableCell>
                    <strong>{a.usuario}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{a.codigoActivo}</strong>
                    <div className="subtext">{a.numeroSerie}</div>
                  </TableCell>
                  <TableCell>
                    {a.idSolicitud ? (
                      <>Solicitud #{a.idSolicitud}</>
                    ) : (
                      "Directa"
                    )}
                  </TableCell>
                  <TableCell>{a.usuarioTi}</TableCell>
                  <TableCell>{formatFecha(a.fechaAsignacion)}</TableCell>
                  <TableCell>{formatFecha(a.fechaDevolucion)}</TableCell>
                  <TableCell>
                    <Chip
                      label={a.estado}
                      size="small"
                      color={a.estado === "ACTIVA" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    {a.estado === "ACTIVA" && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleDevolver(a)}
                      >
                        Devolver
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {filtradas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No hay asignaciones para mostrar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="asignaciones-footer">
          Mostrando {filtradas.length} de {asignaciones.length} asignaciones
        </div>
      </div>

      <AsignacionDirectaModal
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSaved={cargar}
      />
    </div>
  );
}

export default Asignaciones;
