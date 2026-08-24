import api from "./axios";
import type { HistorialSolicitudResponse } from "../types/historial";

// GET historial — lista todos los cambios de estado
export const obtenerHistorialSolicitudes = async (): Promise<
  HistorialSolicitudResponse[]
> => {
  const response = await api.get<HistorialSolicitudResponse[]>(
    "/historial-solicitudes"
  );
  return response.data;
};

// GET historial — cambios de una solicitud
export const obtenerHistorialPorSolicitud = async (
  idSolicitud: number
): Promise<HistorialSolicitudResponse[]> => {
  const response = await api.get<HistorialSolicitudResponse[]>(
    `/historial-solicitudes/solicitud/${idSolicitud}`
  );
  return response.data;
};
