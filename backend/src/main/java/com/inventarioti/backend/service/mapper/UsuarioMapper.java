package com.inventarioti.backend.service.mapper;

import com.inventarioti.backend.dto.response.UsuarioResponse;
import com.inventarioti.backend.entity.Usuario;

// Mapper: convierte Usuario a DTO de respuesta
public class UsuarioMapper {

    // Convierte la entidad a su response
    public static UsuarioResponse toResponse(Usuario usuario){

        return UsuarioResponse.builder()
                .idUsuario(usuario.getIdUsuario())
                .usuario(usuario.getUsuario())
                .correo(usuario.getCorreo())
                .nombres(usuario.getNombres())
                .apellidos(usuario.getApellidos())
                .cargo(usuario.getCargo())
                .activo(usuario.getActivo())
                .rol(usuario.getRol().getNombre())
                .departamento(usuario.getDepartamento().getNombre())
                .build();
    }
}
