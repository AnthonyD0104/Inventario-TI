package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
public class UsuarioRequest {
    private String usuario;
    private String password;
    private String correo;
    private String nombres;
    private String apellidos;
    private String cargo;
    private Long idRol;
    private Long idDepartamento;
}
