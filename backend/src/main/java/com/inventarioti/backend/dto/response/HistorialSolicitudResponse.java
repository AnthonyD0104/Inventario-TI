package com.inventarioti.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
// DTO response: historial de cambios de una solicitud
public class HistorialSolicitudResponse {
    private Long idHistorial;
    // Campo: id de la solicitud relacionada
    private Long idSolicitud;

    private String colaborador;
    private String departamento;

    // Campo: id del usuario que hizo el cambio
    private Long idUsuario;
    private String usuario;

    private String estadoAnterior;
    private String estadoNuevo;
    private String comentario;
    private LocalDateTime fechaCambio;
}
