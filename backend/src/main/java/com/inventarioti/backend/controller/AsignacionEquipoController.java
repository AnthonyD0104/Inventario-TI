package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;
import com.inventarioti.backend.service.interfaces.AsignacionEquipoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/asignaciones")
public class AsignacionEquipoController {
    private final AsignacionEquipoService asignacionEquipoService;

    public AsignacionEquipoController(
            AsignacionEquipoService asignacionEquipoService){
        this.asignacionEquipoService = asignacionEquipoService;
    }

    @GetMapping
    public ResponseEntity<List<AsignacionEquipoResponse>> listarAsignaciones(){
        return ResponseEntity.ok(
                asignacionEquipoService.listarAsignaciones()
        );
    }
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<AsignacionEquipoResponse>> listarEquiposPorUsuario(
            @PathVariable Long idUsuario) {
        return ResponseEntity.ok(
                asignacionEquipoService.listarEquiposPorUsuario(idUsuario)
        );
    }
    @GetMapping("/equipo/{idEquipo}")
    public ResponseEntity<List<AsignacionEquipoResponse>> listarHistorialEquipo(
            @PathVariable Long idEquipo){
        return ResponseEntity.ok(
                asignacionEquipoService.listarHistorialEquipo(idEquipo)
        );
    }
}
