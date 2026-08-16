package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
public class CrearUsuarioSolicitudRequest {
    private String usuario;
    private Long idRol;
}
