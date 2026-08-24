package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para crear un usuario desde una solicitud
public class CrearUsuarioSolicitudRequest {
    private String usuario;
    // Campo: id del rol a asignar
    private Long idRol;
}
