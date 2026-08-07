package com.inventarioti.backend.dto.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String usuario;
    private String password;
}
