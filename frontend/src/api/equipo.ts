import api from "./axios";
import type { EquipoResponse, EquipoRequest } from "../types/equipo";

// GET equipos — lista inventario
export const obtenerEquipos = async (): Promise<EquipoResponse[]> => {
  const response = await api.get<EquipoResponse[]>("/equipos");
  return response.data;
};

// GET equipo — detalle por id
export const obtenerEquipoPorId = async (
  id: number
): Promise<EquipoResponse> => {
  const response = await api.get<EquipoResponse>(`/equipos/${id}`);
  return response.data;
};

// POST equipo — crea un equipo
export const crearEquipo = async (
  equipo: EquipoRequest
): Promise<EquipoResponse> => {
  const response = await api.post<EquipoResponse>("/equipos", equipo);
  return response.data;
};

// PUT equipo — actualiza un equipo
export const actualizarEquipo = async (
  id: number,
  equipo: EquipoRequest
): Promise<EquipoResponse> => {
  const response = await api.put<EquipoResponse>(`/equipos/${id}`, equipo);
  return response.data;
};

// DELETE equipo — da de baja (inactiva)
export const eliminarEquipo = async (id: number): Promise<void> => {
  await api.delete(`/equipos/${id}`);
};

// GET equipos inactivos — lista dados de baja
export const obtenerEquiposInactivos = async (): Promise<EquipoResponse[]> => {
  const response = await api.get<EquipoResponse[]>("/equipos/inactivos");
  return response.data;
};

// PUT restaurar — reactiva un equipo
export const restaurarEquipo = async (
  id: number
): Promise<EquipoResponse> => {
  const response = await api.put<EquipoResponse>(`/equipos/${id}/restaurar`);
  return response.data;
};
