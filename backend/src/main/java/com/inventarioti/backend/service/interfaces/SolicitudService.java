package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.CancelarSolcitudRequest;
import com.inventarioti.backend.dto.request.CrearUsuarioSolicitudRequest;
import com.inventarioti.backend.dto.request.RechazarSolicitudRequest;
import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Solicitud;

import java.util.List;

// Contrato: operaciones de solicitudes de equipos
public interface SolicitudService {
    // Lista solicitudes según el rol
    List<SolicitudResponse> listarSolicitudes();
    // Busca una solicitud por su ID
    SolicitudResponse buscarSolicitudPorId(Long id);
    // Crea una solicitud en estado PENDIENTE
    SolicitudResponse guardarSolicitud(SolicitudRequest request);
    // Aprueba la solicitud
    SolicitudResponse aprobarSolicitud(Long id);
    // Rechaza la solicitud con un motivo
    SolicitudResponse rechazarSolicitud(
                Long id,
                RechazarSolicitudRequest request);
    // Crea el usuario de una solicitud aprobada
    SolicitudResponse crearUsuarioSolicitud(
            Long id,
            CrearUsuarioSolicitudRequest request
    );
    // Cancela la solicitud con un motivo
    SolicitudResponse cancelarSolicitud(
                Long id,
                CancelarSolcitudRequest request);
}
