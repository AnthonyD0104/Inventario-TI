import api from "./axios";
import type { AsignacionEquipoResponse } from "../types/asignacion";
import type { AsignacionDirectaRequest } from "../types/usuario";

export const obtenerAsignaciones = async (): Promise<
  AsignacionEquipoResponse[]
> => {
  const response = await api.get<AsignacionEquipoResponse[]>("/asignaciones");
  return response.data;
};

export const obtenerMisEquipos = async (): Promise<
  AsignacionEquipoResponse[]
> => {
  const response = await api.get<AsignacionEquipoResponse[]>(
    "/asignaciones/mis-equipos"
  );
  return response.data;
};

export const asignarEquipoDirecto = async (
  datos: AsignacionDirectaRequest
): Promise<AsignacionEquipoResponse> => {
  const response = await api.post<AsignacionEquipoResponse>(
    "/asignaciones/directa",
    datos
  );
  return response.data;
};

export const devolverEquipo = async (idAsignacion: number): Promise<void> => {
  await api.put(`/asignaciones/${idAsignacion}/devolver`);
};
