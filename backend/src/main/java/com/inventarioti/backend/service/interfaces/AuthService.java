package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.auth.LoginRequest;
import com.inventarioti.backend.dto.auth.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
