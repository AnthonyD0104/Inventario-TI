package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
// DTO response: asignación de equipo lista para el frontend
public class AsignacionEquipoResponse {

    private Long idAsignacion;

    // Campo: id de la solicitud relacionada
    private Long idSolicitud;

    // Campo: id del usuario asignado
    private Long idUsuario;
    private String usuario;

    // Campo: id del equipo asignado
    private Long idEquipo;
    private String codigoActivo;
    private String numeroSerie;

    // Campo: id del usuario de TI que asignó
    private Long idUsuarioTi;
    private String usuarioTi;

    private LocalDateTime fechaAsignacion;
    private LocalDateTime fechaDevolucion;

    private String estado;
    private String observaciones;
}
