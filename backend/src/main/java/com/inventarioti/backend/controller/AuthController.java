package com.inventarioti.backend.controller;


import com.inventarioti.backend.dto.auth.LoginRequest;
import com.inventarioti.backend.dto.auth.LoginResponse;
import com.inventarioti.backend.service.interfaces.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controller: autenticación de usuarios
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    // POST /api/auth/login — inicia sesión
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
