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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import { eliminarUsuario, obtenerUsuarios } from "../../api/usuario";
import type { UsuarioResponse } from "../../types/usuario";
import UsuarioFormModal from "./UsuarioFormModal";
import "./Usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [activo, setActivo] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<UsuarioResponse | null>(
    null
  );

  const cargar = useCallback(async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No se pudieron cargar los usuarios",
      });
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const abrirCrear = () => {
    setUsuarioEditar(null);
    setFormAbierto(true);
  };

  const abrirEditar = (usuario: UsuarioResponse) => {
    setUsuarioEditar(usuario);
    setFormAbierto(true);
  };

  const cerrarForm = () => {
    setFormAbierto(false);
    setUsuarioEditar(null);
  };

  const handleEliminar = async (usuario: UsuarioResponse) => {
    const ok = await Swal.fire({
      title: "¿Eliminar este usuario?",
      text: `${usuario.usuario} — ${usuario.nombres} ${usuario.apellidos}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!ok.isConfirmed) return;

    try {
      await eliminarUsuario(usuario.idUsuario);
      await Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        timer: 1400,
        showConfirmButton: false,
      });
      cargar();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: "Puede tener asignaciones o solicitudes vinculadas.",
      });
    }
  };

  const filtrados = usuarios.filter((u) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      `${u.usuario} ${u.nombres} ${u.apellidos} ${u.correo} ${u.cargo}`
        .toLowerCase()
        .includes(texto);
    const coincideRol = rol === "" || u.rol === rol;
    const coincideDepto = departamento === "" || u.departamento === departamento;
    const coincideActivo =
      activo === "" ||
      (activo === "true" && u.activo) ||
      (activo === "false" && !u.activo);
    return coincideTexto && coincideRol && coincideDepto && coincideActivo;
  });

  const roles = [...new Set(usuarios.map((u) => u.rol))];
  const departamentos = [...new Set(usuarios.map((u) => u.departamento))];

  return (
    <div className="usuarios-page">
      <div className="usuarios-header">
        <div>
          <h1>Usuarios</h1>
          <p>Crea y administra usuarios del sistema sin pasar por solicitud.</p>
        </div>
        <Button variant="contained" onClick={abrirCrear}>
          + Nuevo usuario
        </Button>
      </div>

      <div className="usuarios-card">
        <div className="usuarios-filtros">
          <TextField
            label="Buscar"
            placeholder="Usuario, nombre, correo, cargo..."
            size="small"
            fullWidth
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Todos los roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Todos los departamentos</MenuItem>
            {departamentos.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
            size="small"
            displayEmpty
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="true">Activos</MenuItem>
            <MenuItem value="false">Inactivos</MenuItem>
          </Select>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((u) => (
                <TableRow key={u.idUsuario} hover>
                  <TableCell>
                    <strong>{u.usuario}</strong>
                  </TableCell>
                  <TableCell>
                    {u.nombres} {u.apellidos}
                  </TableCell>
                  <TableCell>{u.correo}</TableCell>
                  <TableCell>{u.cargo}</TableCell>
                  <TableCell>{u.rol}</TableCell>
                  <TableCell>{u.departamento}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.activo ? "Activo" : "Inactivo"}
                      size="small"
                      color={u.activo ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="acciones">
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => abrirEditar(u)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleEliminar(u)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filtrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No hay usuarios para mostrar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="usuarios-footer">
          Mostrando {filtrados.length} de {usuarios.length} usuarios
        </div>
      </div>

      <UsuarioFormModal
        open={formAbierto}
        onClose={cerrarForm}
        usuario={usuarioEditar}
        onSaved={cargar}
      />
    </div>
  );
}

export default Usuarios;
