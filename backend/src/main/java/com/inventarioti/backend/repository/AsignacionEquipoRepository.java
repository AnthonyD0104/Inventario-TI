package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.AsignacionEquipo;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repo: consultas de asignaciones
@Repository
public interface AsignacionEquipoRepository
        extends JpaRepository<AsignacionEquipo, Long> {

    // Lista asignaciones de un usuario
    List<AsignacionEquipo> findByUsuario(Usuario usuario);

    // Lista historial de un equipo
    List<AsignacionEquipo> findByEquipo(Equipo equipo);

    // Lista asignaciones de un usuario por estado
    List<AsignacionEquipo> findByUsuarioAndEstado(
            Usuario usuario,
            String estado
    );
}