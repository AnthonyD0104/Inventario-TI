import api from "./axios";
import type { EquipoResponse, EquipoRequest } from "../types/equipo";

export const obtenerEquipos = async (): Promise<EquipoResponse[]> => {
    const response = await api.get<EquipoResponse[]>("/equipos");
    return response.data;
};

export const crearEquipo = async (
    equipo: EquipoRequest
): Promise<EquipoResponse> => {
    const response = await api.post<EquipoResponse>("/equipos", equipo);
    return response.data;
};