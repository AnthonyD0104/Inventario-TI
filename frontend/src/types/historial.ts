// Type: cambio de estado en el historial de una solicitud
export interface HistorialSolicitudResponse {
  idHistorial: number;
  idSolicitud: number;
  colaborador: string;
  departamento: string | null;
  idUsuario: number;
  usuario: string;
  estadoAnterior: string | null;
  estadoNuevo: string;
  comentario: string | null;
  fechaCambio: string;
}
