package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.auth.LoginRequest;
import com.inventarioti.backend.dto.auth.LoginResponse;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.exception.BadRequestException;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.inventarioti.backend.security.jwt.JwtService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository.findByUsuario(request.getUsuario())
                .orElseThrow(() ->
                        new BadRequestException("Usuario o contrasenia incorrectos"));
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new BadRequestException("Usuario o contrasenia incorrectos");
        }

        String token = jwtService.generarToken(usuario);

        return new LoginResponse(
                token,
                usuario.getIdUsuario(),
                usuario.getUsuario(),
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getRol().getNombre(),
                "Inicio de sesión exitoso"
        );
    }
}
