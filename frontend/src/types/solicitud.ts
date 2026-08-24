// Type: solicitud de equipo (respuesta)
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

// Type: datos para crear una solicitud
export interface SolicitudRequest {
  nombres: string;
  apellidos: string;
  correo: string;
  cargo: string;
  observaciones?: string;
  idDepartamento: number;
}

// Type: comentario de rechazo o cancelación
export interface ComentarioRequest {
  comentario: string;
}

// Type: datos para crear usuario desde una solicitud
export interface CrearUsuarioSolicitudRequest {
  usuario: string;
  idRol: number;
}

// Type: datos para asignar equipo a una solicitud
export interface AsignacionEquipoRequest {
  idEquipo: number;
  observaciones?: string;
}
