import api from "./axios";
import type {
  AsignacionEquipoRequest,
  ComentarioRequest,
  CrearUsuarioSolicitudRequest,
  SolicitudRequest,
  SolicitudResponse,
} from "../types/solicitud";
import type { AsignacionEquipoResponse } from "../types/asignacion";

export const obtenerSolicitudes = async (): Promise<SolicitudResponse[]> => {
  const response = await api.get<SolicitudResponse[]>("/solicitudes");
  return response.data;
};

export const crearSolicitud = async (
  datos: SolicitudRequest
): Promise<SolicitudResponse> => {
  const response = await api.post<SolicitudResponse>("/solicitudes", datos);
  return response.data;
};

export const aprobarSolicitud = async (
  id: number
): Promise<SolicitudResponse> => {
  const response = await api.put<SolicitudResponse>(`/solicitudes/${id}/aprobar`);
  return response.data;
};

export const rechazarSolicitud = async (
  id: number,
  datos: ComentarioRequest
): Promise<SolicitudResponse> => {
  const response = await api.put<SolicitudResponse>(
    `/solicitudes/${id}/rechazar`,
    datos
  );
  return response.data;
};

export const cancelarSolicitud = async (
  id: number,
  datos: ComentarioRequest
): Promise<SolicitudResponse> => {
  const response = await api.put<SolicitudResponse>(
    `/solicitudes/${id}/cancelar`,
    datos
  );
  return response.data;
};

export const crearUsuarioDesdeSolicitud = async (
  id: number,
  datos: CrearUsuarioSolicitudRequest
): Promise<SolicitudResponse> => {
  const response = await api.post<SolicitudResponse>(
    `/solicitudes/${id}/crear-usuario`,
    datos
  );
  return response.data;
};

export const asignarEquipoSolicitud = async (
  id: number,
  datos: AsignacionEquipoRequest
): Promise<AsignacionEquipoResponse> => {
  const response = await api.post<AsignacionEquipoResponse>(
    `/solicitudes/${id}/asignar-equipo`,
    datos
  );
  return response.data;
};
