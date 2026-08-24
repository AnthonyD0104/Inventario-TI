package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
// DTO response: equipo listo para el frontend
public class EquipoResponse {

    private Long idEquipo;
    private String codigoActivo;
    private String numeroSerie;
    private String marca;
    private String modelo;
    private String estado;
    private LocalDate fechaCompra;
    // Campo: indica si el equipo está activo
    private Boolean activo;

    // Campo: id de la categoría
    private Long idCategoria;
    private String categoria;
}
