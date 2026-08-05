package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService){
        this.rolService = rolService;
    }

    @GetMapping
    public List<Rol> listarRoles() {
        return rolService.listarRoles();
    }

    @GetMapping("/{id}")
    public Optional<Rol> buscarRolPorId(@PathVariable Long id) {
        return rolService.buscarRolPorId(id);
    }

    @PostMapping
    public Rol guardarRol(@RequestBody Rol rol) {
        return rolService.guardarRol(rol);
    }

    @PutMapping("/{id}")
    public Rol actualizarRol(@PathVariable Long id,
                          @RequestBody Rol rol) {

        return rolService.actualizarRol(id, rol);
    }

    @DeleteMapping("/{id}")
    public void eliminarRol(@PathVariable Long id) {
        rolService.eliminarRol(id);
    }
}
