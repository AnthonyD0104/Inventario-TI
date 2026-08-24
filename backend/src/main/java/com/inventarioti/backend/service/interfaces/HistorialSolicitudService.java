package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.response.HistorialSolicitudResponse;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;

import java.util.List;

// Contrato: registro y consulta de historial de solicitudes
public interface HistorialSolicitudService {

    // Registra un cambio de estado en historial
    void registrarCambio(
            Solicitud solicitud,
            Usuario usuario,
            String estadoAnterior,
            String estadoNuevo,
            String comentario
    );

    // Lista el historial según el rol del usuario
    List<HistorialSolicitudResponse> listarHistorial();

    // Lista el historial de una solicitud
    List<HistorialSolicitudResponse> listarHistorialPorSolicitud(Long idSolicitud);
}
