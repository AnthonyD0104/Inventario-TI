package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
public class SolicitudResponse{
    private Long idSolicitud;

    private String nombres;
    private String apellidos;
    private String correo;
    private String cargo;

    private String estado;
    private LocalDateTime fechaSolicitud;
    private String observaciones;

    private Long idDepartamento;
    private String departamento;

    private Long idUsuarioRrhh;
    private String usuarioRrhh;

    private Long idUsuarioTi;
    private String usuarioTi;

    private Long idUsuarioCreado;
    private String usuarioCreado;
}
