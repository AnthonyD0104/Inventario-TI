package com.inventarioti.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
// DTO response: resultado del login (token y datos del usuario)
public class LoginResponse {
    // Campo: JWT de autenticación
    private String token;
    // Campo: id del usuario autenticado
    private Long idUsuario;
    private String usuario;
    private String nombres;
    private String apellidos;
    private String rol;
    private String mensaje;
}
