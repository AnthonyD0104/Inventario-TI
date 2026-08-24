package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repo: consultas de departamentos
public interface DepartamentoRepository extends JpaRepository<Departamento, Long>{
    // Busca departamento por nombre
    Optional<Departamento> findByNombre(String nombre);
}
