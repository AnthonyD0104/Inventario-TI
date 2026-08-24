package com.inventarioti.backend.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
// DTO response: error estándar para el frontend
public class ErrorResponse {

    private LocalDateTime fecha;
    private Integer status;
    private String mensaje;
}
