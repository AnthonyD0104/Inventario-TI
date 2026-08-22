export interface SolicitudResponse {
  idSolicitud: number;
  nombres: string;
  apellidos: string;
  correo: string;
  cargo: string;
  estado: string;
  fechaSolicitud: string;
  observaciones: string | null;
  idDepartamento: number;
  departamento: string;
  idUsuarioRrhh: number | null;
  usuarioRrhh: string | null;
  idUsuarioTi: number | null;
  usuarioTi: string | null;
  idUsuarioCreado: number | null;
  usuarioCreado: string | null;
}

export interface SolicitudRequest {
  nombres: string;
  apellidos: string;
  correo: string;
  cargo: string;
  observaciones?: string;
  idDepartamento: number;
}

export interface ComentarioRequest {
  comentario: string;
}

export interface CrearUsuarioSolicitudRequest {
  usuario: string;
  idRol: number;
}

export interface AsignacionEquipoRequest {
  idEquipo: number;
  observaciones?: string;
}
