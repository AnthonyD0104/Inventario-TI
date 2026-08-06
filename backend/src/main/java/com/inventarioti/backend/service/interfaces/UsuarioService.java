package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.UsuarioRequest;
import com.inventarioti.backend.dto.response.UsuarioResponse;
import com.inventarioti.backend.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<UsuarioResponse> listarUsuarios();
    UsuarioResponse buscarUsuarioPorId(Long id);
    UsuarioResponse guardarUsuario(UsuarioRequest request);
    UsuarioResponse actualizarUsuario(Long id, UsuarioRequest request);
    void eliminarUsuario(Long id);
}
