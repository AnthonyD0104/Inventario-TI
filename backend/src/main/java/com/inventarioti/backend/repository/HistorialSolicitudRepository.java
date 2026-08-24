package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.HistorialSolicitud;
import com.inventarioti.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repo: consultas de historial de solicitudes
@Repository
public interface HistorialSolicitudRepository extends JpaRepository<HistorialSolicitud, Long> {

    // Historial de una solicitud (más antiguo primero)
    List<HistorialSolicitud> findBySolicitudIdSolicitudOrderByFechaCambioAsc(
            Long idSolicitud
    );

    // Lista historial completo (más reciente primero)
    List<HistorialSolicitud> findAllByOrderByFechaCambioDesc();

    // Historial filtrado por RRHH que registró
    List<HistorialSolicitud> findBySolicitudUsuarioRrhhOrderByFechaCambioDesc(
            Usuario usuarioRrhh
    );
}
