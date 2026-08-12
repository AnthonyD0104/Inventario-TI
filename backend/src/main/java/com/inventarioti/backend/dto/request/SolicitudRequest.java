package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
public class SolicitudRequest {
    private String nombres;
    private String apellidos;
    private String correo;
    private String cargo;
    private String observaciones;
    private Long idDepartamento;
}
