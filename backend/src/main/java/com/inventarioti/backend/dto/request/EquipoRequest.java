package com.inventarioti.backend.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EquipoRequest {
    private String codigoActivo;
    private String numeroSerie;
    private String marca;
    private String modelo;
    private String estado;
    private LocalDate fechaCompra;
    private Long idCategoria;
}
