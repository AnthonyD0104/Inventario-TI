package com.inventarioti.backend.dto.request;

import lombok.Data;

@Data
// DTO request: datos para crear/editar un usuario
public class UsuarioRequest {
    private String usuario;
    private String password;
    private String correo;
    private String nombres;
    private String apellidos;
    private String cargo;
    // Campo: id del rol a asignar
    private Long idRol;
    // Campo: id del departamento
    private Long idDepartamento;
}
