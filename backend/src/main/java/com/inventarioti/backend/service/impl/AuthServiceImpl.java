package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.auth.LoginRequest;
import com.inventarioti.backend.dto.auth.LoginResponse;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.exception.BadRequestException;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository.findByUsuario(request.getUsuario())
                .orElseThrow(() ->
                        new BadRequestException("Usuario o contrasenia incorrectos"));
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new BadRequestException("Usuario o contrasenia incorrectos");
        }
        
        return new LoginResponse(
                usuario.getIdUsuario(),
                usuario.getUsuario(),
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getRol().getNombre(),
                "Inicio de sesión exitoso"
        );
    }
}
