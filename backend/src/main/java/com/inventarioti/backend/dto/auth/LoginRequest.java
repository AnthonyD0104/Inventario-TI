package com.inventarioti.backend.dto.auth;

import lombok.Data;

@Data
// DTO request: credenciales para iniciar sesión
public class LoginRequest {
    private String usuario;
    private String password;
}
