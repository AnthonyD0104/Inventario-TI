package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.service.interfaces.DepartamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    public DepartamentoController(DepartamentoService departamentoService) {
        this.departamentoService = departamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Departamento>> listarDept() {

        List<Departamento> departamentos = departamentoService.listarDept();

        return ResponseEntity.ok(departamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departamento> buscarDeptPorId(@PathVariable Long id) {
        return departamentoService.buscarDeptPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Departamento> guardarDept(@RequestBody Departamento departamento) {

        Departamento nuevoDept = departamentoService.guardarDept(departamento);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevoDept);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departamento> actualizarDept(
            @PathVariable Long id,
            @RequestBody Departamento departamento) {

        if (departamentoService.buscarDeptPorId(id).isEmpty()) {

            return ResponseEntity.notFound().build();
        }
        Departamento actualizado = departamentoService.actualizarDept(id, departamento);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDept(@PathVariable Long id) {

        if (departamentoService.buscarDeptPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        departamentoService.eliminarDept(id);

        return ResponseEntity.noContent().build();
    }
}