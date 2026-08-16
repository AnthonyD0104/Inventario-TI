package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AsignacionEquipoResponse {

    private Long idAsignacion;

    private Long idSolicitud;

    private Long idUsuario;
    private String usuario;

    private Long idEquipo;
    private String codigoActivo;
    private String numeroSerie;

    private Long idUsuarioTi;
    private String usuarioTi;

    private LocalDateTime fechaAsignacion;
    private LocalDateTime fechaDevolucion;

    private String estado;
    private String observaciones;
}
