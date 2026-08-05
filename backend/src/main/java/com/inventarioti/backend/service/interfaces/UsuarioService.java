package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<Usuario> listarUsuarios();
    Optional<Usuario> buscarUsuarioPorId(Long id);
    Usuario guardarUsuario(Usuario usuario);
    Usuario actualizarUsuario(Long id, Usuario usuario);
    void eliminarUsuario(Long id);
}
