package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.AsignacionDirectaRequest;
import com.inventarioti.backend.dto.request.AsignacionEquipoRequest;
import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;

import java.util.List;

public interface AsignacionEquipoService {

    AsignacionEquipoResponse asignarEquipo(
            Long idSolicitud,
            AsignacionEquipoRequest request
    );
    AsignacionEquipoResponse asignarEquipoDirectamente(
            AsignacionDirectaRequest request
    );
    List<AsignacionEquipoResponse> listarAsignaciones();

    List<AsignacionEquipoResponse> listarEquiposPorUsuario(
            Long idUsuario
    );
    List<AsignacionEquipoResponse> listarHistorialEquipo(
            Long idEquipo
    );
    List<AsignacionEquipoResponse> listarMisEquipos();

    void devolverEquipo(Long idAsignacion);

}