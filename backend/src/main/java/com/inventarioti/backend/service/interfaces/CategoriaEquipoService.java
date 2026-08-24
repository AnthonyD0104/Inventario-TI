package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.CategoriaEquipo;

import java.util.List;
import java.util.Optional;

// Contrato: operaciones de categorías de equipo
public interface CategoriaEquipoService {

    // Lista todas las categorías
    List<CategoriaEquipo> listarCat();
    // Busca una categoría por su ID
    Optional<CategoriaEquipo> buscarCatPorId(Long id);
    // Crea una categoría
    CategoriaEquipo guardarCat(CategoriaEquipo categoria);
    // Actualiza una categoría por ID
    CategoriaEquipo actualizarCat(Long id, CategoriaEquipo categoria);
    // Elimina una categoría por ID
    void eliminarCat(Long id);

}
