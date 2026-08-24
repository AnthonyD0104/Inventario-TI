package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para asignar un equipo directo a un usuario
public class AsignacionDirectaRequest {

    // Campo: id del usuario receptor
    private Long idUsuario;
    // Campo: id del equipo a asignar
    private Long idEquipo;
    private String observaciones;
}