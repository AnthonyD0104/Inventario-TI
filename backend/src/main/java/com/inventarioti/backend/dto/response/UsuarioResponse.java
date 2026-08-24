package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
// DTO response: usuario listo para el frontend
public class UsuarioResponse {
    private Long idUsuario;
    private String usuario;
    private String correo;
    private String nombres;
    private String apellidos;
    private String cargo;
    private String rol;
    private String departamento;
    // Campo: indica si el usuario está activo
    private Boolean activo;
}
