package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repo: consultas de solicitudes
@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    // Lista solicitudes registradas por un RRHH
    List<Solicitud> findByUsuarioRrhh(Usuario usuarioRrhh);
}
