import api from "./axios";
import type { Rol } from "../types/rol";

// GET roles — lista los roles del sistema
export const obtenerRoles = async (): Promise<Rol[]> => {
  const response = await api.get<Rol[]>("/roles");
  return response.data;
};
