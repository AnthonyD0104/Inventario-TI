package com.inventarioti.backend.service.mapper;


import com.inventarioti.backend.dto.response.EquipoResponse;
import com.inventarioti.backend.entity.Equipo;

public class EquipoMapper {
    private EquipoMapper(){
    }
    public static EquipoResponse toResponse(Equipo equipo){
        return EquipoResponse.builder()
                .idEquipo(equipo.getIdEquipo())
                .codigoActivo(equipo.getCodigoActivo())
                .numeroSerie(equipo.getNumeroSerie())
                .marca(equipo.getMarca())
                .modelo(equipo.getModelo())
                .estado(equipo.getEstado())
                .fechaCompra(equipo.getFechaCompra())
                .activo(equipo.getActivo())
                .idCategoria(equipo.getCategoria().getIdCategoria())
                .categoria(equipo.getCategoria().getNombre())
                .build();
    }
}
