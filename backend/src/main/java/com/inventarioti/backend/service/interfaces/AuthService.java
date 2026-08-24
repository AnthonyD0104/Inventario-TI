package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.auth.LoginRequest;
import com.inventarioti.backend.dto.auth.LoginResponse;

// Contrato: autenticación de usuarios
public interface AuthService {
    // Valida credenciales y genera el token JWT
    LoginResponse login(LoginRequest request);
}
