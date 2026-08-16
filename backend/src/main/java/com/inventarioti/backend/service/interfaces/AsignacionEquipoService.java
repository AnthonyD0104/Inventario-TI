package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.AsignacionEquipoRequest;
import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;

import java.util.List;

public interface AsignacionEquipoService {

    AsignacionEquipoResponse asignarEquipo(
            Long idSolicitud,
            AsignacionEquipoRequest request
    );
    List<AsignacionEquipoResponse> listarAsignaciones();

    List<AsignacionEquipoResponse> listarEquiposPorUsuario(
            Long idUsuario
    );
    List<AsignacionEquipoResponse> listarHistorialEquipo(
            Long idEquipo
    );
}