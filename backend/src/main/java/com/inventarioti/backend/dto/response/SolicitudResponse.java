package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
// DTO response: solicitud lista para el frontend
public class SolicitudResponse{
    private Long idSolicitud;

    private String nombres;
    private String apellidos;
    private String correo;
    private String cargo;

    private String estado;
    private LocalDateTime fechaSolicitud;
    private String observaciones;

    // Campo: id del departamento
    private Long idDepartamento;
    private String departamento;

    // Campo: id del usuario de RRHH que gestionó
    private Long idUsuarioRrhh;
    private String usuarioRrhh;

    // Campo: id del usuario de TI que gestionó
    private Long idUsuarioTi;
    private String usuarioTi;

    // Campo: id del usuario creado desde la solicitud
    private Long idUsuarioCreado;
    private String usuarioCreado;
}
