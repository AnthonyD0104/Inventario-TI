import api from "./axios";
import type { Departamento } from "../types/departamento";

// GET departamentos — lista departamentos
export const obtenerDepartamentos = async (): Promise<Departamento[]> => {
  const response = await api.get<Departamento[]>("/departamentos");
  return response.data;
};
