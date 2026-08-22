import api from "./axios";
import type { EquipoResponse, EquipoRequest } from "../types/equipo";

export const obtenerEquipos = async (): Promise<EquipoResponse[]> => {
  const response = await api.get<EquipoResponse[]>("/equipos");
  return response.data;
};

export const obtenerEquipoPorId = async (
  id: number
): Promise<EquipoResponse> => {
  const response = await api.get<EquipoResponse>(`/equipos/${id}`);
  return response.data;
};

export const crearEquipo = async (
  equipo: EquipoRequest
): Promise<EquipoResponse> => {
  const response = await api.post<EquipoResponse>("/equipos", equipo);
  return response.data;
};

export const actualizarEquipo = async (
  id: number,
  equipo: EquipoRequest
): Promise<EquipoResponse> => {
  const response = await api.put<EquipoResponse>(`/equipos/${id}`, equipo);
  return response.data;
};

export const eliminarEquipo = async (id: number): Promise<void> => {
  await api.delete(`/equipos/${id}`);
};

export const obtenerEquiposInactivos = async (): Promise<EquipoResponse[]> => {
  const response = await api.get<EquipoResponse[]>("/equipos/inactivos");
  return response.data;
};

export const restaurarEquipo = async (
  id: number
): Promise<EquipoResponse> => {
  const response = await api.put<EquipoResponse>(`/equipos/${id}/restaurar`);
  return response.data;
};
