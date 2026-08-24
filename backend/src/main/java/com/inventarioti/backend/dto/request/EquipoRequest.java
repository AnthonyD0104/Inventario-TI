package com.inventarioti.backend.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
// DTO request: datos para crear/editar un equipo
public class EquipoRequest {
    private String codigoActivo;
    private String numeroSerie;
    private String marca;
    private String modelo;
    private String estado;
    private LocalDate fechaCompra;
    // Campo: id de la categoría del equipo
    private Long idCategoria;
}
