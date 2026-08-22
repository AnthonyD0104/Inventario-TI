import api from "./axios";
import type { Rol } from "../types/rol";

export const obtenerRoles = async (): Promise<Rol[]> => {
  const response = await api.get<Rol[]>("/roles");
  return response.data;
};
