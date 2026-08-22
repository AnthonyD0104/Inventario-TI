export interface AsignacionEquipoResponse {
  idAsignacion: number;
  idSolicitud: number | null;
  idUsuario: number;
  usuario: string;
  idEquipo: number;
  codigoActivo: string;
  numeroSerie: string;
  idUsuarioTi: number;
  usuarioTi: string;
  fechaAsignacion: string;
  fechaDevolucion: string | null;
  estado: string;
  observaciones: string | null;
}
