package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.request.EquipoRequest;
import com.inventarioti.backend.dto.response.EquipoResponse;
import com.inventarioti.backend.service.interfaces.EquipoService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller: CRUD de equipos
@RestController
@RequestMapping("/api/equipos")
public class EquipoController {
    private final EquipoService equipoService;

    public EquipoController(EquipoService equipoService){
        this.equipoService = equipoService;
    }

    // GET /api/equipos — lista inventario activo
    @GetMapping
    public ResponseEntity<List<EquipoResponse>> listarEquipos(){
        return ResponseEntity.ok(
                equipoService.listarEquipos()
        );
    }

    // GET /api/equipos/inactivos — lista equipos dados de baja
    @GetMapping("/inactivos")
    public ResponseEntity<List<EquipoResponse>> listarEquiposInactivos() {
        return ResponseEntity.ok(
                equipoService.listarEquiposInactivos()
        );
    }

    // GET /api/equipos/{id} — busca equipo
    @GetMapping("/{id}")
    public ResponseEntity<EquipoResponse> buscarEquipoPorId(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                equipoService.buscarEquipoPorId(id)
        );
    }
    // POST /api/equipos — crea equipo
    @PostMapping
    public ResponseEntity<EquipoResponse> guardarEquipo(
            @RequestBody EquipoRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(equipoService.guardarEquipo(request));
    }
    // PUT /api/equipos/{id} — actualiza equipo
    @PutMapping("/{id}")
    public ResponseEntity<EquipoResponse> actualizarEquipo(
            @PathVariable Long id,
            @RequestBody EquipoRequest request) {
        return ResponseEntity.ok(
                equipoService.actualizarEquipo(id, request)
        );
    }
    // DELETE /api/equipos/{id} — soft-delete de equipo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEquipos(
            @PathVariable long id){
        equipoService.eliminarEquipo(id);
        return ResponseEntity.noContent().build();
    }

    // PUT /api/equipos/{id}/restaurar — restaura equipo inactivo
    @PutMapping("/{id}/restaurar")
    public ResponseEntity<EquipoResponse> restaurarEquipo(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                equipoService.restaurarEquipo(id)
        );
    }
}
