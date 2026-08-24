// Página: listado de equipos
import { useCallback, useEffect, useState } from "react";
import {
  eliminarEquipo,
  obtenerEquipos,
  obtenerEquiposInactivos,
  restaurarEquipo,
} from "../../api/equipo";
import type { EquipoResponse } from "../../types/equipo";
import EquipoFormModal from "./EquipoFormModal";
import EquipoDetalleModal from "./EquipoDetalleModal";
import "./Equipos.css";

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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import Swal from "sweetalert2";

function Equipos() {
  // Listado y filtros
  const [equipos, setEquipos] = useState<EquipoResponse[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");

  // Modal de alta/edición
  const [formAbierto, setFormAbierto] = useState(false);
  const [equipoEditar, setEquipoEditar] = useState<EquipoResponse | null>(null);

  // Modal de detalle y vista de dados de baja
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [equipoVer, setEquipoVer] = useState<EquipoResponse | null>(null);
  const [verInactivos, setVerInactivos] = useState(false);

  // Carga el inventario (activos o dados de baja)
  const cargarEquipos = useCallback(async () => {
    try {
      const data = verInactivos
        ? await obtenerEquiposInactivos()
        : await obtenerEquipos();
      setEquipos(data);
    } catch (error) {
      console.error("Error al obtener equipos:", error);
    }
  }, [verInactivos]);

  useEffect(() => {
    cargarEquipos();
  }, [cargarEquipos]);

  // Abre el modal de creación
  const abrirCrear = () => {
    setEquipoEditar(null); 
    setFormAbierto(true);
  };

  // Abre el modal en modo edición
  const abrirEditar = (equipo: EquipoResponse) => {
    setEquipoEditar(equipo);
    setFormAbierto(true);
  };

  // Abre el modal de detalle
  const abrirVer = (equipo: EquipoResponse) => {
    setEquipoVer(equipo);
    setDetalleAbierto(true);
  };

  // Cierra el modal de alta/edición
  const cerrarForm = () => {
    setFormAbierto(false);
    setEquipoEditar(null);
  };

  // Confirma y da de baja el equipo
  const handleEliminar = async (equipo: EquipoResponse) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar este equipo?",
      text: `${equipo.codigoActivo} — ${equipo.marca} ${equipo.modelo}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!resultado.isConfirmed) return;

    try {
      await eliminarEquipo(equipo.idEquipo);
      await Swal.fire({
        icon: "success",
        title: "Equipo eliminado",
        timer: 1400,
        showConfirmButton: false,
      });
      cargarEquipos();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: "Intenta de nuevo.",
      });
    }
  };

  // Confirma y restaura un equipo dado de baja
  const handleRestaurar = async (equipo: EquipoResponse) => {
    const resultado = await Swal.fire({
      title: "¿Restaurar este equipo?",
      text: `${equipo.codigoActivo} — ${equipo.marca} ${equipo.modelo}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Restaurar",
      cancelButtonText: "Cancelar",
    });

    if (!resultado.isConfirmed) return;

    try {
      await restaurarEquipo(equipo.idEquipo);
      await Swal.fire({
        icon: "success",
        title: "Equipo restaurado",
        timer: 1400,
        showConfirmButton: false,
      });
      cargarEquipos();
    } catch (error) {
      console.error("Error al restaurar equipo:", error);
      Swal.fire({
        icon: "error",
        title: "No se pudo restaurar",
        text: "Intenta de nuevo.",
      });
    }
  };

  // Filtra filas por búsqueda, estado y categoría
  const equiposFiltrados = equipos.filter((equipo) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      equipo.codigoActivo.toLowerCase().includes(texto) ||
      equipo.numeroSerie.toLowerCase().includes(texto) ||
      equipo.marca.toLowerCase().includes(texto) ||
      equipo.modelo.toLowerCase().includes(texto);

    const coincideEstado = estado === "" || equipo.estado === estado;
    const coincideCategoria =
      categoria === "" || equipo.categoria === categoria;

    return coincideBusqueda && coincideEstado && coincideCategoria;
  });

  // Opciones únicas para los selects de filtro
  const estados = [...new Set(equipos.map((e) => e.estado))];
  const categorias = [...new Set(equipos.map((e) => e.categoria))];

  return (
    <div className="equipos-page">
      {/* Encabezado, vista inactivos y alta de equipo */}
      <div className="equipos-header">
        <div>
          <h1>Inventario de equipos</h1>
          <p>
            {verInactivos
              ? "Equipos dados de baja (se pueden restaurar)."
              : "Consulta y administra los equipos registrados."}
          </p>
        </div>

        <div className="equipos-header-actions">
          <Button
            variant={verInactivos ? "contained" : "outlined"}
            onClick={() => setVerInactivos((prev) => !prev)}
          >
            {verInactivos ? "Ver activos" : "Ver dados de baja"}
          </Button>
          {!verInactivos && (
            <Button variant="contained" onClick={abrirCrear}>
              + Nuevo equipo
            </Button>
          )}
        </div>
      </div>

      <div className="equipos-card">
        {/* Filtros de búsqueda, estado y categoría */}
        <div className="equipos-filtros">
          <TextField
            label="Buscar"
            placeholder="Código, serie, marca o modelo"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            size="small"
            fullWidth
          />

          <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Todos los estados</MenuItem>
            {estados.map((estadoOption) => (
              <MenuItem key={estadoOption} value={estadoOption}>
                {estadoOption}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Todas las categorías</MenuItem>
            {categorias.map((categoriaOption) => (
              <MenuItem key={categoriaOption} value={categoriaOption}>
                {categoriaOption}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Tabla de equipos */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>N.º Serie</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {equiposFiltrados.map((equipo) => (
                <TableRow key={equipo.idEquipo} hover>
                  <TableCell>
                    <strong>{equipo.codigoActivo}</strong>
                  </TableCell>
                  <TableCell>{equipo.numeroSerie}</TableCell>
                  <TableCell>{equipo.marca}</TableCell>
                  <TableCell>{equipo.modelo}</TableCell>
                  <TableCell>{equipo.categoria}</TableCell>
                  <TableCell>
                    <Chip
                      label={equipo.estado}
                      size="small"
                      color={
                        equipo.estado === "DISPONIBLE"
                          ? "success"
                          : equipo.estado === "MANTENIMIENTO"
                            ? "warning"
                            : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {/* Acciones: ver, editar/eliminar o restaurar */}
                    <div className="acciones">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => abrirVer(equipo)}
                      >
                        Ver
                      </Button>
                      {verInactivos ? (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<RestoreIcon />}
                          onClick={() => handleRestaurar(equipo)}
                        >
                          Restaurar
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => abrirEditar(equipo)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleEliminar(equipo)}
                          >
                            Eliminar
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {/* Empty state: sin resultados */}
              {equiposFiltrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No se encontraron equipos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="equipos-footer">
          Mostrando {equiposFiltrados.length} de {equipos.length} equipos
        </div>
      </div>

      {/* Modales de alta/edición y detalle */}
      <EquipoFormModal
        open={formAbierto}
        onClose={cerrarForm}
        equipo={equipoEditar}
        onSaved={cargarEquipos}
      />

      <EquipoDetalleModal
        open={detalleAbierto}
        onClose={() => {
          setDetalleAbierto(false);
          setEquipoVer(null);
        }}
        equipo={equipoVer}
      />
    </div>
  );
}

export default Equipos;
