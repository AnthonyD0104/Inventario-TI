package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para crear una solicitud de equipo
public class SolicitudRequest {
    private String nombres;
    private String apellidos;
    private String correo;
    private String cargo;
    private String observaciones;
    // Campo: id del departamento del solicitante
    private Long idDepartamento;
}
