import api from "./axios";
import type { UsuarioResponse } from "../types/usuario";

export const obtenerUsuarios = async (): Promise<UsuarioResponse[]> => {
  const response = await api.get<UsuarioResponse[]>("/usuarios");
  return response.data;
};
