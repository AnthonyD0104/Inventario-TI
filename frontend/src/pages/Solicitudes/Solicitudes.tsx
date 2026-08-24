// Página: flujo de solicitudes de alta y asignación
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
  aprobarSolicitud,
  cancelarSolicitud,
  obtenerSolicitudes,
  rechazarSolicitud,
} from "../../api/solicitud";
import type { SolicitudResponse } from "../../types/solicitud";
import SolicitudFormModal from "./SolicitudFormModal";
import CrearUsuarioModal from "./CrearUsuarioModal";
import AsignarEquipoModal from "./AsignarEquipoModal";
import "./Solicitudes.css";

// Lee el rol guardado en la sesión
function getRolSesion(): string {
  try {
    const raw = localStorage.getItem("usuario");
    if (!raw) return "";
    return JSON.parse(raw).rol ?? "";
  } catch {
    return "";
  }
}

// Color del chip según el estado
function colorEstado(estado: string) {
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

// Formatea fecha ISO a YYYY-MM-DD HH:mm
function formatFecha(fecha: string) {
  if (!fecha) return "—";
  return String(fecha).replace("T", " ").slice(0, 16);
}

function Solicitudes() {
  // Permisos según el rol de la sesión
  const rol = getRolSesion();
  const esAdminOTi = rol === "ADMIN" || rol === "TI";
  const esAdminORrhh = rol === "ADMIN" || rol === "RRHH";
  const puedeCrear = esAdminORrhh;

  // Listado, filtros y carga
  const [solicitudes, setSolicitudes] = useState<SolicitudResponse[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);

  // Visibilidad de los tres modales del flujo
  const [formAbierto, setFormAbierto] = useState(false);
  const [crearUsuarioAbierto, setCrearUsuarioAbierto] = useState(false);
  const [asignarAbierto, setAsignarAbierto] = useState(false);
  const [solicitudActiva, setSolicitudActiva] =
    useState<SolicitudResponse | null>(null);

  // Trae las solicitudes desde el backend
  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No se pudieron cargar las solicitudes",
        text: "Verifica que tu rol sea ADMIN, TI o RRHH.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Pide un comentario obligatorio (rechazo o cancelación)
  const pedirComentario = async (titulo: string) => {
    const result = await Swal.fire({
      title: titulo,
      input: "textarea",
      inputLabel: "Motivo / comentario",
      inputPlaceholder: "Escribe el motivo...",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return "El comentario es obligatorio";
        }
        return null;
      },
    });

    if (!result.isConfirmed) return null;
    return String(result.value).trim();
  };

  // Aprueba una solicitud pendiente
  const handleAprobar = async (s: SolicitudResponse) => {
    const ok = await Swal.fire({
      title: "¿Aprobar solicitud?",
      text: `${s.nombres} ${s.apellidos}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aprobar",
      cancelButtonText: "Cancelar",
    });
    if (!ok.isConfirmed) return;

    try {
      await aprobarSolicitud(s.idSolicitud);
      await Swal.fire({
        icon: "success",
        title: "Solicitud aprobada",
        timer: 1400,
        showConfirmButton: false,
      });
      cargar();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "No se pudo aprobar" });
    }
  };

  // Rechaza la solicitud con un motivo
  const handleRechazar = async (s: SolicitudResponse) => {
    const comentario = await pedirComentario("Rechazar solicitud");
    if (!comentario) return;

    try {
      await rechazarSolicitud(s.idSolicitud, { comentario });
      await Swal.fire({
        icon: "success",
        title: "Solicitud rechazada",
        timer: 1400,
        showConfirmButton: false,
      });
      cargar();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "No se pudo rechazar" });
    }
  };

  // Cancela la solicitud con un motivo
  const handleCancelar = async (s: SolicitudResponse) => {
    const comentario = await pedirComentario("Cancelar solicitud");
    if (!comentario) return;

    try {
      await cancelarSolicitud(s.idSolicitud, { comentario });
      await Swal.fire({
        icon: "success",
        title: "Solicitud cancelada",
        timer: 1400,
        showConfirmButton: false,
      });
      cargar();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "No se pudo cancelar" });
    }
  };

  // Filtra filas por búsqueda y estado
  const filtradas = solicitudes.filter((s) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      `${s.nombres} ${s.apellidos} ${s.correo} ${s.cargo} ${s.departamento}`
        .toLowerCase()
        .includes(texto);
    const coincideEstado = estado === "" || s.estado === estado;
    return coincideTexto && coincideEstado;
  });

  const estados = [...new Set(solicitudes.map((s) => s.estado))];

  return (
    <div className="solicitudes-page">
      {/* Encabezado y alta de solicitud (RRHH/ADMIN) */}
      <div className="solicitudes-header">
        <div>
          <h1>Solicitudes</h1>
          <p>
            Flujo de alta de colaboradores y asignación de equipos.
          </p>
        </div>

        {puedeCrear && (
          <Button variant="contained" onClick={() => setFormAbierto(true)}>
            + Nueva solicitud
          </Button>
        )}
      </div>

      <div className="solicitudes-card">
        {/* Filtros de búsqueda y estado */}
        <div className="solicitudes-filtros">
          <TextField
            label="Buscar"
            placeholder="Nombre, correo, cargo..."
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

        {/* Tabla de solicitudes */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Colaborador</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Usuario creado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtradas.map((s) => (
                <TableRow key={s.idSolicitud} hover>
                  <TableCell>#{s.idSolicitud}</TableCell>
                  <TableCell>
                    <strong>
                      {s.nombres} {s.apellidos}
                    </strong>
                    <div className="subtext">{s.correo}</div>
                    <div className="subtext">{s.cargo}</div>
                  </TableCell>
                  <TableCell>{s.departamento}</TableCell>
                  <TableCell>
                    <Chip
                      label={s.estado}
                      size="small"
                      color={colorEstado(s.estado) as "default"}
                    />
                  </TableCell>
                  <TableCell>{formatFecha(s.fechaSolicitud)}</TableCell>
                  <TableCell>{s.usuarioCreado ?? "—"}</TableCell>
                  <TableCell>
                    {/* Acciones por rol y estado */}
                    <div className="acciones">
                      {s.estado === "PENDIENTE" && esAdminOTi && (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            onClick={() => handleAprobar(s)}
                          >
                            Aprobar
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleRechazar(s)}
                          >
                            Rechazar
                          </Button>
                        </>
                      )}

                      {s.estado === "PENDIENTE" && esAdminORrhh && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleCancelar(s)}
                        >
                          Cancelar
                        </Button>
                      )}

                      {s.estado === "APROBADA" && esAdminOTi && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setSolicitudActiva(s);
                            setCrearUsuarioAbierto(true);
                          }}
                        >
                          Crear usuario
                        </Button>
                      )}

                      {s.estado === "PROCESADA" && esAdminOTi && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setSolicitudActiva(s);
                            setAsignarAbierto(true);
                          }}
                        >
                          Asignar equipo
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {/* Empty state: sin resultados */}
              {!loading && filtradas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No hay solicitudes para mostrar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="solicitudes-footer">
          Mostrando {filtradas.length} de {solicitudes.length} solicitudes
        </div>
      </div>

      {/* Modales del flujo: crear, usuario y asignar equipo */}
      <SolicitudFormModal
        open={formAbierto}
        onClose={() => setFormAbierto(false)}
        onSaved={cargar}
      />

      <CrearUsuarioModal
        open={crearUsuarioAbierto}
        onClose={() => {
          setCrearUsuarioAbierto(false);
          setSolicitudActiva(null);
        }}
        solicitud={solicitudActiva}
        onSaved={cargar}
      />

      <AsignarEquipoModal
        open={asignarAbierto}
        onClose={() => {
          setAsignarAbierto(false);
          setSolicitudActiva(null);
        }}
        solicitud={solicitudActiva}
        onSaved={cargar}
      />
    </div>
  );
}

export default Solicitudes;
