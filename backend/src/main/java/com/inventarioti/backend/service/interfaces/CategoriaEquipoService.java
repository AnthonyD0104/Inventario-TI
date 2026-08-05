package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.CategoriaEquipo;

import java.util.List;
import java.util.Optional;

public interface CategoriaEquipoService {

    List<CategoriaEquipo> listarCat();
    Optional<CategoriaEquipo> buscarCatPorId(Long id);
    CategoriaEquipo guardarCat(CategoriaEquipo categoria);
    CategoriaEquipo actualizarCat(Long id, CategoriaEquipo categoria);
    void eliminarCat(Long id);

}
