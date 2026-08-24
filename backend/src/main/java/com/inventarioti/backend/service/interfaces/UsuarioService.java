package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.UsuarioRequest;
import com.inventarioti.backend.dto.response.UsuarioResponse;
import com.inventarioti.backend.entity.Usuario;

import java.util.List;
import java.util.Optional;

// Contrato: operaciones de usuarios
public interface UsuarioService {

    // Lista todos los usuarios
    List<UsuarioResponse> listarUsuarios();
    // Busca un usuario por su ID
    UsuarioResponse buscarUsuarioPorId(Long id);
    // Crea un usuario
    UsuarioResponse guardarUsuario(UsuarioRequest request);
    // Actualiza un usuario
    UsuarioResponse actualizarUsuario(Long id, UsuarioRequest request);
    // Elimina un usuario por ID
    void eliminarUsuario(Long id);
}
