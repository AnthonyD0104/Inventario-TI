import { useCallback, useEffect, useState } from "react";
import {
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

import { obtenerHistorialSolicitudes } from "../../api/historial";
import type { HistorialSolicitudResponse } from "../../types/historial";
import "./HistorialSolicitudes.css";

function getRolSesion(): string {
  try {
    const raw = localStorage.getItem("usuario");
    if (!raw) return "";
    return JSON.parse(raw).rol ?? "";
  } catch {
    return "";
  }
}

function formatFecha(fecha: string) {
  if (!fecha) return "—";
  return String(fecha).replace("T", " ").slice(0, 19);
}

function colorEstado(estado: string | null) {
  if (!estado) return "default";
  switch (estado) {
    case "PENDIENTE":
      return "warning";
    case "APROBADA":
      return "info";
    case "PROCESADA":
      return "success";
    case "RECHAZADA":
    case "CANCELADA":
      return "error";
    default:
      return "default";
  }
}

function HistorialSolicitudes() {
  const rol = getRolSesion();

  const [historial, setHistorial] = useState<HistorialSolicitudResponse[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await obtenerHistorialSolicitudes();
      setHistorial(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No se pudo cargar el historial",
        text: "Verifica que tu rol sea ADMIN, TI o RRHH.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const filtrados = historial.filter((h) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      `${h.idSolicitud} ${h.colaborador} ${h.departamento ?? ""} ${h.usuario} ${h.comentario ?? ""}`
        .toLowerCase()
        .includes(texto);
    const coincideEstado =
      estado === "" || h.estadoNuevo === estado;
    return coincideTexto && coincideEstado;
  });

  const estados = [...new Set(historial.map((h) => h.estadoNuevo))];

  const subtitulo =
    rol === "RRHH"
      ? "Solo ves los cambios de las solicitudes que creaste."
      : "Auditoría de todos los cambios de estado de solicitudes.";

  return (
    <div className="historial-page">
      <div className="historial-header">
        <div>
          <h1>Historial de solicitudes</h1>
          <p>{subtitulo}</p>
        </div>
      </div>

      <div className="historial-card">
        <div className="historial-filtros">
          <TextField
            label="Buscar"
            placeholder="Solicitud, colaborador, usuario, comentario..."
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
                <TableCell>Fecha</TableCell>
                <TableCell>Solicitud</TableCell>
                <TableCell>Colaborador</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Usuario que cambió</TableCell>
                <TableCell>Estado anterior</TableCell>
                <TableCell>Estado nuevo</TableCell>
                <TableCell>Comentario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((h) => (
                <TableRow key={h.idHistorial} hover>
                  <TableCell>{formatFecha(h.fechaCambio)}</TableCell>
                  <TableCell>
                    <strong>#{h.idSolicitud}</strong>
                  </TableCell>
                  <TableCell>{h.colaborador}</TableCell>
                  <TableCell>{h.departamento ?? "—"}</TableCell>
                  <TableCell>{h.usuario}</TableCell>
                  <TableCell>
                    {h.estadoAnterior ? (
                      <Chip
                        label={h.estadoAnterior}
                        size="small"
                        color={colorEstado(h.estadoAnterior) as "default"}
                        variant="outlined"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={h.estadoNuevo}
                      size="small"
                      color={colorEstado(h.estadoNuevo) as "default"}
                    />
                  </TableCell>
                  <TableCell>{h.comentario ?? "—"}</TableCell>
                </TableRow>
              ))}

              {!loading && filtrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No hay registros de historial para mostrar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="historial-footer">
          Mostrando {filtrados.length} de {historial.length} registros
        </div>
      </div>
    </div>
  );
}

export default HistorialSolicitudes;
