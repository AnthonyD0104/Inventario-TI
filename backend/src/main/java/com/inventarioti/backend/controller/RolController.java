package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Rol>> listarRoles() {

        List<Rol> roles = rolService.listarRoles();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> buscarRolPorId(@PathVariable Long id) {

        return rolService.buscarRolPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Rol> guardarRol(@RequestBody Rol rol) {
        Rol nuevoRol = rolService.guardarRol(rol);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevoRol);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> actualizarRol(
            @PathVariable Long id,
            @RequestBody Rol rol) {
        if(rolService.buscarRolPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Rol actualizado = rolService.actualizarRol(id, rol);
        return  ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRol(@PathVariable Long id) {

        if(rolService.buscarRolPorId(id).isEmpty()) {
            return  ResponseEntity.notFound().build();
        }
        rolService.eliminarRol(id);
        return  ResponseEntity.noContent().build();
    }
}
