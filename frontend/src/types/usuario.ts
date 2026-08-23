export interface UsuarioResponse {
  idUsuario: number;
  usuario: string;
  correo: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  rol: string;
  departamento: string;
  activo: boolean;
}

export interface AsignacionDirectaRequest {
  idUsuario: number;
  idEquipo: number;
  observaciones?: string;
}
