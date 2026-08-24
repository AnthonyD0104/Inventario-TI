import api from "./axios";
import type { AsignacionEquipoResponse } from "../types/asignacion";
import type { AsignacionDirectaRequest } from "../types/usuario";

// GET asignaciones — lista todas las asignaciones
export const obtenerAsignaciones = async (): Promise<
  AsignacionEquipoResponse[]
> => {
  const response = await api.get<AsignacionEquipoResponse[]>("/asignaciones");
  return response.data;
};

// GET asignaciones — equipos del usuario actual
export const obtenerMisEquipos = async (): Promise<
  AsignacionEquipoResponse[]
> => {
  const response = await api.get<AsignacionEquipoResponse[]>(
    "/asignaciones/mis-equipos"
  );
  return response.data;
};

// POST asignación directa — asigna equipo a un usuario
export const asignarEquipoDirecto = async (
  datos: AsignacionDirectaRequest
): Promise<AsignacionEquipoResponse> => {
  const response = await api.post<AsignacionEquipoResponse>(
    "/asignaciones/directa",
    datos
  );
  return response.data;
};

// PUT devolver — marca el equipo como devuelto
export const devolverEquipo = async (idAsignacion: number): Promise<void> => {
  await api.put(`/asignaciones/${idAsignacion}/devolver`);
};
