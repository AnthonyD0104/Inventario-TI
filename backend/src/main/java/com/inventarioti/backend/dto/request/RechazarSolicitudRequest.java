package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para rechazar una solicitud
public class RechazarSolicitudRequest {
    // Campo: motivo del rechazo
    private String comentario;
}
