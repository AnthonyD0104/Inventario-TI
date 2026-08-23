import { useCallback, useEffect, useState } from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";

import { obtenerMisEquipos } from "../../api/asignacion";
import type { AsignacionEquipoResponse } from "../../types/asignacion";
import "./MisEquipos.css";

function formatFecha(fecha: string | null) {
  if (!fecha) return "—";
  return String(fecha).replace("T", " ").slice(0, 16);
}

function MisEquipos() {
  const [equipos, setEquipos] = useState<AsignacionEquipoResponse[]>([]);

  const cargar = useCallback(async () => {
    try {
      const data = await obtenerMisEquipos();
      setEquipos(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No se pudieron cargar tus equipos",
      });
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return (
    <div className="mis-equipos-page">
      <div className="mis-equipos-header">
        <h1>Mis equipos</h1>
        <p>Equipos que tienes asignados actualmente.</p>
      </div>

      <div className="mis-equipos-card">
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>N.º serie</TableCell>
                <TableCell>Asignado por</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Observaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipos.map((e) => (
                <TableRow key={e.idAsignacion} hover>
                  <TableCell>
                    <strong>{e.codigoActivo}</strong>
                  </TableCell>
                  <TableCell>{e.numeroSerie}</TableCell>
                  <TableCell>{e.usuarioTi}</TableCell>
                  <TableCell>{formatFecha(e.fechaAsignacion)}</TableCell>
                  <TableCell>
                    <Chip label={e.estado} size="small" color="success" />
                  </TableCell>
                  <TableCell>{e.observaciones ?? "—"}</TableCell>
                </TableRow>
              ))}

              {equipos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No tienes equipos asignados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mis-equipos-footer">
          {equipos.length} equipo(s) asignado(s)
        </div>
      </div>
    </div>
  );
}

export default MisEquipos;
