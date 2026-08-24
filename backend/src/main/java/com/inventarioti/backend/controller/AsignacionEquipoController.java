package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.request.AsignacionDirectaRequest;
import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;
import com.inventarioti.backend.service.interfaces.AsignacionEquipoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller: asignación y devolución de equipos
@RestController
@RequestMapping("api/asignaciones")
public class AsignacionEquipoController {
    private final AsignacionEquipoService asignacionEquipoService;

    public AsignacionEquipoController(
            AsignacionEquipoService asignacionEquipoService){
        this.asignacionEquipoService = asignacionEquipoService;
    }

    // GET /api/asignaciones — lista asignaciones
    @GetMapping
    public ResponseEntity<List<AsignacionEquipoResponse>> listarAsignaciones(){
        return ResponseEntity.ok(
                asignacionEquipoService.listarAsignaciones()
        );
    }

    // GET /api/asignaciones/usuario/{idUsuario} — equipos de un usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<AsignacionEquipoResponse>> listarEquiposPorUsuario(
            @PathVariable Long idUsuario) {
        return ResponseEntity.ok(
                asignacionEquipoService.listarEquiposPorUsuario(idUsuario)
        );
    }
    // GET /api/asignaciones/equipo/{idEquipo} — historial de un equipo
    @GetMapping("/equipo/{idEquipo}")
    public ResponseEntity<List<AsignacionEquipoResponse>> listarHistorialEquipo(
            @PathVariable Long idEquipo){
        return ResponseEntity.ok(
                asignacionEquipoService.listarHistorialEquipo(idEquipo)
        );
    }
    // GET /api/asignaciones/mis-equipos — equipos del usuario autenticado
    @GetMapping("/mis-equipos")
    public ResponseEntity<List<AsignacionEquipoResponse>> listarMisEquipos() {
        return ResponseEntity.ok(
                asignacionEquipoService.listarMisEquipos()
        );
    }
    // POST /api/asignaciones/directa — asignación directa (sin solicitud)
    @PostMapping("/directa")
    public ResponseEntity<AsignacionEquipoResponse> asignarEquipoDirectamente(
            @RequestBody AsignacionDirectaRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        asignacionEquipoService
                                .asignarEquipoDirectamente(request)
                );
    }
    // PUT /api/asignaciones/{idAsignacion}/devolver — marca equipo como devuelto
    @PutMapping("/{idAsignacion}/devolver")
    public ResponseEntity<Void> devolverEquipo(
            @PathVariable Long idAsignacion) {

        asignacionEquipoService.devolverEquipo(idAsignacion);

        return ResponseEntity.noContent().build();
    }
}
