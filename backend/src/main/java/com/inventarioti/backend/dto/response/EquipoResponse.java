package com.inventarioti.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class EquipoResponse {

    private Long idEquipo;
    private String codigoActivo;
    private String numeroSerie;
    private String marca;
    private String modelo;
    private String estado;
    private LocalDate fechaCompra;
    private Boolean activo;

    private Long idCategoria;
    private String categoria;
}
