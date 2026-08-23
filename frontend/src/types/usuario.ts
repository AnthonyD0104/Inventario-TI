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

export interface UsuarioRequest {
  usuario: string;
  password: string;
  correo: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  idRol: number;
  idDepartamento: number;
}

export interface AsignacionDirectaRequest {
  idUsuario: number;
  idEquipo: number;
  observaciones?: string;
}
