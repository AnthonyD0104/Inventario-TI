package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.CategoriaEquipo;
import com.inventarioti.backend.service.interfaces.CategoriaEquipoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaEquipoController {

    private final CategoriaEquipoService categoriaEquipoService;

    public CategoriaEquipoController(CategoriaEquipoService categoriaEquipoService) {
        this.categoriaEquipoService = categoriaEquipoService;
    }

    @GetMapping
    public List<CategoriaEquipo> listarCat() {
        return categoriaEquipoService.listarCat();
    }

    @GetMapping("/{id}")
    public Optional<CategoriaEquipo> buscarCatPorId(@PathVariable Long id) {
        return categoriaEquipoService.buscarCatPorId(id);
    }

    @PostMapping
    public CategoriaEquipo guardarCat(@RequestBody CategoriaEquipo categoriaEquipo) {
        return categoriaEquipoService.guardarCat(categoriaEquipo);
    }

    @PutMapping("/{id}")
    public CategoriaEquipo actualizarCat(@PathVariable Long id,
                          @RequestBody CategoriaEquipo categoriaEquipo) {

        return categoriaEquipoService.actualizarCat(id, categoriaEquipo);
    }

    @DeleteMapping("/{id}")
    public void eliminarCat(@PathVariable Long id) {
        categoriaEquipoService.eliminarCat(id);
    }

}