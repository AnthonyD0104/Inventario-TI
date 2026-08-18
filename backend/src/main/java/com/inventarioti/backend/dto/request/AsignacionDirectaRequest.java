package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
public class AsignacionDirectaRequest {

    private Long idUsuario;
    private Long idEquipo;
    private String observaciones;
}