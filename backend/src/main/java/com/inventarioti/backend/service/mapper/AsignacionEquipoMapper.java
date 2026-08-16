package com.inventarioti.backend.service.mapper;

import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;
import com.inventarioti.backend.entity.AsignacionEquipo;

public class AsignacionEquipoMapper {

    private AsignacionEquipoMapper() {
    }

    public static AsignacionEquipoResponse toResponse(
            AsignacionEquipo asignacion) {

        return AsignacionEquipoResponse.builder()
                .idAsignacion(asignacion.getIdAsignacion())

                .idSolicitud(
                        asignacion.getSolicitud().getIdSolicitud()
                )
                .idUsuario(
                        asignacion.getUsuario().getIdUsuario()
                )
                .usuario(
                        asignacion.getUsuario().getUsuario()
                )
                .idEquipo(
                        asignacion.getEquipo().getIdEquipo()
                )
                .codigoActivo(
                        asignacion.getEquipo().getCodigoActivo()
                )
                .numeroSerie(
                        asignacion.getEquipo().getNumeroSerie()
                )
                .idUsuarioTi(
                        asignacion.getUsuarioTi().getIdUsuario()
                )
                .usuarioTi(
                        asignacion.getUsuarioTi().getUsuario()
                )
                .fechaAsignacion(
                        asignacion.getFechaAsignacion()
                )
                .fechaDevolucion(
                        asignacion.getFechaDevolucion()
                )
                .estado(
                        asignacion.getEstado()
                )
                .observaciones(
                        asignacion.getObservaciones()
                )
                .build();
    }
}