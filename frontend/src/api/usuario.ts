import api from "./axios";
import type { UsuarioRequest, UsuarioResponse } from "../types/usuario";

// GET usuarios — lista usuarios
export const obtenerUsuarios = async (): Promise<UsuarioResponse[]> => {
  const response = await api.get<UsuarioResponse[]>("/usuarios");
  return response.data;
};

// POST usuario — crea un usuario
export const crearUsuario = async (
  datos: UsuarioRequest
): Promise<UsuarioResponse> => {
  const response = await api.post<UsuarioResponse>("/usuarios", datos);
  return response.data;
};

// PUT usuario — actualiza un usuario
export const actualizarUsuario = async (
  id: number,
  datos: UsuarioRequest
): Promise<UsuarioResponse> => {
  const response = await api.put<UsuarioResponse>(`/usuarios/${id}`, datos);
  return response.data;
};

// DELETE usuario — elimina un usuario
export const eliminarUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};
