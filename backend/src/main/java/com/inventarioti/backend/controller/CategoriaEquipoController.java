package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.CategoriaEquipo;
import com.inventarioti.backend.service.interfaces.CategoriaEquipoService;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Controller: CRUD de categorías de equipo
@RestController
@RequestMapping("/api/categorias")
public class CategoriaEquipoController {

    private final CategoriaEquipoService categoriaEquipoService;

    public CategoriaEquipoController(CategoriaEquipoService categoriaEquipoService, RolService rolService) {
        this.categoriaEquipoService = categoriaEquipoService;
    }

    // GET /api/categorias — lista categorías
    @GetMapping
    public ResponseEntity<List<CategoriaEquipo>> listarCat() {

        List<CategoriaEquipo> categoriaEquipos = categoriaEquipoService.listarCat();

        return ResponseEntity.ok(categoriaEquipos);
    }

    // GET /api/categorias/{id} — busca categoría
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaEquipo> buscarCatPorId(@PathVariable Long id) {

        return categoriaEquipoService.buscarCatPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/categorias — crea categoría
    @PostMapping
    public ResponseEntity<CategoriaEquipo> guardarCat(@RequestBody CategoriaEquipo categoriaEquipo) {

        CategoriaEquipo nuevaCat = categoriaEquipoService.guardarCat(categoriaEquipo);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevaCat);
    }

    // PUT /api/categorias/{id} — actualiza categoría
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaEquipo> actualizarCat(
            @PathVariable Long id,
            @RequestBody CategoriaEquipo categoriaEquipo) {

        if (categoriaEquipoService.buscarCatPorId(id).isEmpty()) {

            return ResponseEntity.notFound().build();
        }
        CategoriaEquipo actualizado = categoriaEquipoService.actualizarCat(id, categoriaEquipo);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE /api/categorias/{id} — elimina categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCat(@PathVariable Long id) {
        if (categoriaEquipoService.buscarCatPorId(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }

        categoriaEquipoService.eliminarCat(id);
        return ResponseEntity.noContent().build();
    }

}