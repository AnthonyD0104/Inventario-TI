package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repo: consultas de usuarios
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Busca usuario por username
    Optional<Usuario> findByUsuario(String usuario);
    // Busca usuario por correo
    Optional<Usuario> findByCorreo(String correo);
}
