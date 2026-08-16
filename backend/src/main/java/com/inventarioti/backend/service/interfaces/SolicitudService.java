package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.CancelarSolcitudRequest;
import com.inventarioti.backend.dto.request.CrearUsuarioSolicitudRequest;
import com.inventarioti.backend.dto.request.RechazarSolicitudRequest;
import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Solicitud;

import java.util.List;

public interface SolicitudService {
    List<SolicitudResponse> listarSolicitudes();
    SolicitudResponse buscarSolicitudPorId(Long id);
    SolicitudResponse guardarSolicitud(SolicitudRequest request);
    SolicitudResponse aprobarSolicitud(Long id);
    SolicitudResponse rechazarSolicitud(
                Long id,
                RechazarSolicitudRequest request);
    SolicitudResponse crearUsuarioSolicitud(
            Long id,
            CrearUsuarioSolicitudRequest request
    );
    SolicitudResponse cancelarSolicitud(
                Long id,
                CancelarSolcitudRequest request);
}
