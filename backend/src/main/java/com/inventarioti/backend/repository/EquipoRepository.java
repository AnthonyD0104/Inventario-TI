package com.inventarioti.backend.repository;


import com.inventarioti.backend.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


// Repo: consultas de equipos
@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long> {
    // Lista equipos activos
    List<Equipo> findByActivoTrue();
    // Lista equipos inactivos (soft-delete)
    List<Equipo> findByActivoFalse();
}
