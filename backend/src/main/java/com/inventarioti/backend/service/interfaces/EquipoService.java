package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.dto.request.EquipoRequest;
import com.inventarioti.backend.dto.response.EquipoResponse;

import java.util.List;

public interface EquipoService {
    List<EquipoResponse> listarEquipos();
    EquipoResponse buscarEquipoPorId(Long id);
    EquipoResponse guardarEquipo(EquipoRequest request);
    EquipoResponse actualizarEquipo(Long id, EquipoRequest request);
    void eliminarEquipo(Long id);
}
