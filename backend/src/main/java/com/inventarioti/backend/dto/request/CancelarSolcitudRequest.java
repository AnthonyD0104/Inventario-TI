package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para cancelar una solicitud
public class CancelarSolcitudRequest {
    // Campo: motivo de la cancelación
    private String comentario;
}
