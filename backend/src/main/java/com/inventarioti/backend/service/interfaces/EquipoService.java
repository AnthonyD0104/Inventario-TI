package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.EquipoRequest;
import com.inventarioti.backend.dto.response.EquipoResponse;

import java.util.List;

// Contrato: operaciones de inventario de equipos
public interface EquipoService {
    // Lista los equipos activos
    List<EquipoResponse> listarEquipos();
    // Lista los equipos inactivos
    List<EquipoResponse> listarEquiposInactivos();
    // Busca un equipo por su ID
    EquipoResponse buscarEquipoPorId(Long id);
    // Crea un equipo
    EquipoResponse guardarEquipo(EquipoRequest request);
    // Actualiza un equipo
    EquipoResponse actualizarEquipo(Long id, EquipoRequest request);
    // Desactiva un equipo (baja lógica)
    void eliminarEquipo(Long id);
    // Reactiva un equipo inactivo
    EquipoResponse restaurarEquipo(Long id);
}
