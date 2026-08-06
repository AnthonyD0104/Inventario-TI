package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.request.UsuarioRequest;
import com.inventarioti.backend.dto.response.UsuarioResponse;
import com.inventarioti.backend.service.interfaces.RolService;
import com.inventarioti.backend.service.interfaces.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final RolService rolService;

    public UsuarioController(UsuarioService usuarioService, RolService rolService) {
        this.usuarioService = usuarioService;
        this.rolService = rolService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {

        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarUsuarioPorId(@PathVariable Long id) {

        return ResponseEntity.ok(
                usuarioService.buscarUsuarioPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<UsuarioResponse> guardarUsuario(
            @RequestBody UsuarioRequest request) {

        UsuarioResponse nuevoUsuario = usuarioService.guardarUsuario(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevoUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody UsuarioRequest request) {

        UsuarioResponse actualizado =
                usuarioService.actualizarUsuario(id, request);

        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {

        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
