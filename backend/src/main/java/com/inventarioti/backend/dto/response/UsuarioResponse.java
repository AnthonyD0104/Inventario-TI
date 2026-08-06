package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioResponse {
    private Long idUsuario;
    private String usuario;
    private String correo;
    private String nombres;
    private String apellidos;
    private String cargo;
    private String rol;
    private String departamento;
    private Boolean activo;
}
