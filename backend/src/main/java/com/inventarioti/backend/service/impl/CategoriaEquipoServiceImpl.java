package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.CategoriaEquipo;
import com.inventarioti.backend.repository.CategoriaEquipoRepository;
import com.inventarioti.backend.service.interfaces.CategoriaEquipoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaEquipoServiceImpl implements CategoriaEquipoService {

    private final CategoriaEquipoRepository categoriaEquipoRepository;

    public CategoriaEquipoServiceImpl(CategoriaEquipoRepository categoriaEquipoRepository) {
        this.categoriaEquipoRepository = categoriaEquipoRepository;
    }

    @Override
    public List<CategoriaEquipo> listarCat() {
        return categoriaEquipoRepository.findAll();
    }

    @Override
    public Optional<CategoriaEquipo> buscarCatPorId(Long id) {
        return categoriaEquipoRepository.findById(id);
    }

    @Override
    public CategoriaEquipo guardarCat(CategoriaEquipo categoria) {
        return categoriaEquipoRepository.save(categoria);
    }

    @Override
    public CategoriaEquipo actualizarCat(Long id, CategoriaEquipo categoria) {
        categoria.setIdCategoria(id);
        return categoriaEquipoRepository.save(categoria);
    }

    @Override
    public void eliminarCat(Long id) {
        categoriaEquipoRepository.deleteById(id);
    }
}
