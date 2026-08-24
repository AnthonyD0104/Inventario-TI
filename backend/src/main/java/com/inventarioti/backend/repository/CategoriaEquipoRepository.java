package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.CategoriaEquipo;
import org.springframework.data.jpa.repository.JpaRepository;

// Repo: consultas de categorías de equipo
public interface CategoriaEquipoRepository extends JpaRepository<CategoriaEquipo, Long> {

}
