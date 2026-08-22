import api from "./axios";
import type { HistorialSolicitudResponse } from "../types/historial";

export const obtenerHistorialSolicitudes = async (): Promise<
  HistorialSolicitudResponse[]
> => {
  const response = await api.get<HistorialSolicitudResponse[]>(
    "/historial-solicitudes"
  );
  return response.data;
};

export const obtenerHistorialPorSolicitud = async (
  idSolicitud: number
): Promise<HistorialSolicitudResponse[]> => {
  const response = await api.get<HistorialSolicitudResponse[]>(
    `/historial-solicitudes/solicitud/${idSolicitud}`
  );
  return response.data;
};
