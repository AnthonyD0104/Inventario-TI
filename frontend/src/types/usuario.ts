// Type: usuario del sistema (respuesta)
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

// Type: datos para crear o actualizar un usuario
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

// Type: asignación directa de equipo a usuario
export interface AsignacionDirectaRequest {
  idUsuario: number;
  idEquipo: number;
  observaciones?: string;
}
