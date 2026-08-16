package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.AsignacionEquipo;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsignacionEquipoRepository
        extends JpaRepository<AsignacionEquipo, Long> {

    List<AsignacionEquipo> findByUsuario(Usuario usuario);

    List<AsignacionEquipo> findByEquipo(Equipo equipo);

    List<AsignacionEquipo> findByUsuarioAndEstado(
            Usuario usuario,
            String estado
    );
}