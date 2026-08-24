package com.inventarioti.backend.service.mapper;

import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Solicitud;

// Mapper: convierte Solicitud a DTO de respuesta
public class SolicitudMapper {
    private SolicitudMapper(){
    }
    // Convierte la entidad a su response
    public static SolicitudResponse toResponse(Solicitud solicitud) {
        return SolicitudResponse.builder()
                .idSolicitud(solicitud.getIdSolicitud())
                .nombres(solicitud.getNombres())
                .apellidos(solicitud.getApellidos())
                .correo(solicitud.getCorreo())
                .cargo(solicitud.getCargo())
                .estado(solicitud.getEstado())
                .fechaSolicitud(solicitud.getFechaSolicitud())
                .observaciones(solicitud.getObservaciones())
                .idDepartamento(
                        solicitud.getDepartamento().getIdDepartamento()
                )
                .departamento(
                        solicitud.getDepartamento().getNombre()
                )
                .idUsuarioRrhh(
                        solicitud.getUsuarioRrhh().getIdUsuario()
                )
                .usuarioRrhh(
                        solicitud.getUsuarioRrhh().getUsuario()
                )
                .idUsuarioTi(
                        solicitud.getUsuarioTi() != null
                                ? solicitud.getUsuarioTi().getIdUsuario()
                                : null
                )
                .usuarioTi(
                        solicitud.getUsuarioTi() != null
                                ? solicitud.getUsuarioTi().getUsuario()
                                : null
                )
                .idUsuarioCreado(
                        solicitud.getUsuarioCreado() != null
                                ? solicitud.getUsuarioCreado().getIdUsuario()
                                : null
                )
                .usuarioCreado(
                        solicitud.getUsuarioCreado() != null
                                ? solicitud.getUsuarioCreado().getUsuario()
                                : null
                )
                .build();
    }
}
