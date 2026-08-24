package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.AsignacionDirectaRequest;
import com.inventarioti.backend.dto.request.AsignacionEquipoRequest;
import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;

import java.util.List;

// Contrato: operaciones de asignación de equipos
public interface AsignacionEquipoService {

    // Asigna un equipo a una solicitud procesada
    AsignacionEquipoResponse asignarEquipo(
            Long idSolicitud,
            AsignacionEquipoRequest request
    );
    // Asigna un equipo a un usuario sin solicitud
    AsignacionEquipoResponse asignarEquipoDirectamente(
            AsignacionDirectaRequest request
    );
    // Lista todas las asignaciones
    List<AsignacionEquipoResponse> listarAsignaciones();

    // Lista equipos activos de un usuario
    List<AsignacionEquipoResponse> listarEquiposPorUsuario(
            Long idUsuario
    );
    // Lista el historial de asignaciones de un equipo
    List<AsignacionEquipoResponse> listarHistorialEquipo(
            Long idEquipo
    );
    // Lista los equipos del usuario autenticado
    List<AsignacionEquipoResponse> listarMisEquipos();

    // Devuelve el equipo y lo marca DISPONIBLE
    void devolverEquipo(Long idAsignacion);

}
