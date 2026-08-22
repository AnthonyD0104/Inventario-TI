package com.inventarioti.backend.repository;

import com.inventarioti.backend.entity.HistorialSolicitud;
import com.inventarioti.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistorialSolicitudRepository extends JpaRepository<HistorialSolicitud, Long> {

    List<HistorialSolicitud> findBySolicitudIdSolicitudOrderByFechaCambioAsc(
            Long idSolicitud
    );

    List<HistorialSolicitud> findAllByOrderByFechaCambioDesc();

    List<HistorialSolicitud> findBySolicitudUsuarioRrhhOrderByFechaCambioDesc(
            Usuario usuarioRrhh
    );
}
