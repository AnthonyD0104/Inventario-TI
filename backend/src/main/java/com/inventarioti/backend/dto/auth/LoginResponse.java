package com.inventarioti.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long idUsuario;
    private String usuario;
    private String nombres;
    private String apellidos;
    private String rol;
    private String mensaje;
}
