package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.response.HistorialSolicitudResponse;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;

import java.util.List;

public interface HistorialSolicitudService {
    void registrarCambio(
            Solicitud solicitud,
            Usuario usuario,
            String estadoAnterior,
            String estadoNuevo,
            String comentario
    );
        List<HistorialSolicitudResponse> listarHistorialPorSolicitud(Long idSolicitud);
}
