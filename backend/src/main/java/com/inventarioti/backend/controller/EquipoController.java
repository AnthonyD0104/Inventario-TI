package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.request.EquipoRequest;
import com.inventarioti.backend.dto.response.EquipoResponse;
import com.inventarioti.backend.service.interfaces.EquipoService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipos")
public class EquipoController {
    private final EquipoService equipoService;

    public EquipoController(EquipoService equipoService){
        this.equipoService = equipoService;
    }

    @GetMapping
    public ResponseEntity<List<EquipoResponse>> listarEquipos(){
        return ResponseEntity.ok(
                equipoService.listarEquipos()
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<EquipoResponse> buscarEquipoPorId(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                equipoService.buscarEquipoPorId(id)
        );
    }
    @PostMapping
    public ResponseEntity<EquipoResponse> guardarEquipo(
            @RequestBody EquipoRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(equipoService.guardarEquipo(request));
    }
    @PutMapping("/{id}")
    public ResponseEntity<EquipoResponse> actualizarEquipo(
            @PathVariable Long id,
            @RequestBody EquipoRequest request) {
        return ResponseEntity.ok(
                equipoService.actualizarEquipo(id, request)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEquipos(
            @PathVariable long id){
        equipoService.eliminarEquipo(id);
        return ResponseEntity.noContent().build();
    }
}
