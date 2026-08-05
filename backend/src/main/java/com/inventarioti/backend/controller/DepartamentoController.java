package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.service.interfaces.DepartamentoService;
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
    public List<Departamento> listarDept() {
        return departamentoService.listarDept();
    }

    @GetMapping("/{id}")
    public Optional<Departamento> buscarDeptPorId(@PathVariable Long id) {
        return departamentoService.buscarDeptPorId(id);
    }

    @PostMapping
    public Departamento guardarDept(@RequestBody Departamento departamento) {
        return departamentoService.guardarDept(departamento);
    }

    @PutMapping("/{id}")
    public Departamento actualizarDept(@PathVariable Long id,
                          @RequestBody Departamento departamento) {

        return departamentoService.actualizarDept(id, departamento);
    }

    @DeleteMapping("/{id}")
    public void eliminarDept(@PathVariable Long id) {
        departamentoService.eliminarDept(id);
    }

}