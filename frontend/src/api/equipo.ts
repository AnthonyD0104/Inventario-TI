import api from "./axios";
import type { EquipoResponse } from "../types/equipo";

export const getEquipos = async (): Promise<EquipoResponse[]> => {
    const response = await api.get<EquipoResponse[]>("/equipos");
    return response.data;
};