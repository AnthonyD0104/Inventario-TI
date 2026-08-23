import api from "./axios";
import type { UsuarioRequest, UsuarioResponse } from "../types/usuario";

export const obtenerUsuarios = async (): Promise<UsuarioResponse[]> => {
  const response = await api.get<UsuarioResponse[]>("/usuarios");
  return response.data;
};

export const crearUsuario = async (
  datos: UsuarioRequest
): Promise<UsuarioResponse> => {
  const response = await api.post<UsuarioResponse>("/usuarios", datos);
  return response.data;
};

export const actualizarUsuario = async (
  id: number,
  datos: UsuarioRequest
): Promise<UsuarioResponse> => {
  const response = await api.put<UsuarioResponse>(`/usuarios/${id}`, datos);
  return response.data;
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};
