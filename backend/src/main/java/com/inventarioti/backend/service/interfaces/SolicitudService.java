package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;

import java.util.List;

public interface SolicitudService {
    List<SolicitudResponse> listarSolicitudes();
    SolicitudResponse buscarSolicitudPorId(Long id);
    SolicitudResponse guardarSolicitud(SolicitudRequest request);
}
