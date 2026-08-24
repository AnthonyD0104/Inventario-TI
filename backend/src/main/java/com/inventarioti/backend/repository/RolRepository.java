package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

// Repo: consultas de roles
public interface RolRepository extends JpaRepository<Rol, Long> {
    // Busca rol por nombre
    Optional<Rol> findByNombre(String nombre);
    Optional<Rol> findById(Long id);
}


