import api from "./axios";
import type { CategoriaEquipo } from "../types/categoria";

export const obtenerCategorias = async (): Promise<CategoriaEquipo[]> => {
  const response = await api.get<CategoriaEquipo[]>("/categorias");
  return response.data;
};
