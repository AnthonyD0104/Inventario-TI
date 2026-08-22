package com.inventarioti.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class HistorialSolicitudResponse {
    private Long idHistorial;
    private Long idSolicitud;

    private String colaborador;
    private String departamento;

    private Long idUsuario;
    private String usuario;

    private String estadoAnterior;
    private String estadoNuevo;
    private String comentario;
    private LocalDateTime fechaCambio;
}
