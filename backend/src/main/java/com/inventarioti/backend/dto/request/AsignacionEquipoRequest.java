package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para asignar un equipo a una solicitud
public class AsignacionEquipoRequest {

    // Campo: id del equipo a asignar
    private Long idEquipo;
    private String observaciones;
}
