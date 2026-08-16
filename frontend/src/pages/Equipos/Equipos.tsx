import { useCallback, useEffect, useState } from "react";
import { obtenerEquipos } from "../../api/equipo";
import type { EquipoResponse } from "../../types/equipo";
import EquipoFormModal from "./EquipoFormModal";
import "./Equipos.css";

import { Button, Chip, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

function Equipos() {
    const [equipos, setEquipos] = useState<EquipoResponse[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [estado, setEstado] = useState("");
    const [categoria, setCategoria] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarEquipos = useCallback(async () => {
        try {
            const data = await obtenerEquipos();
            setEquipos(data);
        } catch (error) {
            console.error("Error al obtener equipos:", error);
        }
    }, []);

    useEffect(() => {
        cargarEquipos();
    }, [cargarEquipos]);

    const equiposFiltrados = equipos.filter((equipo) => {
        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
            equipo.codigoActivo.toLowerCase().includes(texto) ||
            equipo.numeroSerie.toLowerCase().includes(texto) ||
            equipo.marca.toLowerCase().includes(texto) ||
            equipo.modelo.toLowerCase().includes(texto);

        const coincideEstado =
            estado === "" || equipo.estado === estado;

        const coincideCategoria =
            categoria === "" || equipo.categoria === categoria;

        return coincideBusqueda && coincideEstado && coincideCategoria;
    });

    const estados = [...new Set(equipos.map((equipo) => equipo.estado))];

    const categorias = [...new Set(equipos.map((equipo) => equipo.categoria))];

    return (
        <div className="equipos-page">

            <div className="equipos-header">
                <div>
                    <h1>Inventario de equipos</h1>

                    <p>
                        Consulta y administra los equipos registrados.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() => setModalAbierto(true)}
                >
                    + Nuevo equipo
                </Button>
            </div>

            <div className="equipos-card">

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
                        <MenuItem value="">
                            Todos los estados
                        </MenuItem>

                        {estados.map((estadoOption) => (
                            <MenuItem
                                key={estadoOption}
                                value={estadoOption}
                            >
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
                        <MenuItem value="">
                            Todas las categorías
                        </MenuItem>

                        {categorias.map((categoriaOption) => (
                            <MenuItem
                                key={categoriaOption}
                                value={categoriaOption}
                            >
                                {categoriaOption}
                            </MenuItem>
                        ))}
                    </Select>

                </div>

                <TableContainer component={Paper} elevation={0}>

                    <Table>

                        <TableHead>
                            <TableRow>

                                <TableCell>
                                    Código
                                </TableCell>

                                <TableCell>
                                    N.º Serie
                                </TableCell>

                                <TableCell>
                                    Marca
                                </TableCell>

                                <TableCell>
                                    Modelo
                                </TableCell>

                                <TableCell>
                                    Categoría
                                </TableCell>

                                <TableCell>
                                    Estado
                                </TableCell>

                                <TableCell>
                                    Acciones
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {equiposFiltrados.map((equipo) => (

                                <TableRow
                                    key={equipo.idEquipo}
                                    hover
                                >

                                    <TableCell>
                                        <strong>
                                            {equipo.codigoActivo}
                                        </strong>
                                    </TableCell>

                                    <TableCell>
                                        {equipo.numeroSerie}
                                    </TableCell>

                                    <TableCell>
                                        {equipo.marca}
                                    </TableCell>

                                    <TableCell>
                                        {equipo.modelo}
                                    </TableCell>

                                    <TableCell>
                                        {equipo.categoria}
                                    </TableCell>

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

                                        <div className="acciones">

                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={
                                                    <VisibilityIcon />
                                                }
                                            >
                                                Ver
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={
                                                    <EditIcon />
                                                }
                                            >
                                                Editar
                                            </Button>

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}

                            {equiposFiltrados.length === 0 && (

                                <TableRow>

                                    <TableCell
                                        colSpan={7}
                                        align="center"
                                    >
                                        No se encontraron equipos.
                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

                <div className="equipos-footer">
                    Mostrando {equiposFiltrados.length} de{" "}
                    {equipos.length} equipos
                </div>

            </div>

            <EquipoFormModal
                open={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onCreated={cargarEquipos}
            />

        </div>
    );
}

export default Equipos;