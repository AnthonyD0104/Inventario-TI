package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.request.RechazarSolicitudRequest;
import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.service.interfaces.SolicitudService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudController {
    private final SolicitudService solicitudService;
    public SolicitudController(SolicitudService solicitudService){
        this.solicitudService = solicitudService;
    }
    @GetMapping
    public ResponseEntity<List<SolicitudResponse>> listarSolicitudes(){
        return ResponseEntity.ok(
                solicitudService.listarSolicitudes()
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudResponse> buscarSolicitudPorId(
            @PathVariable Long id){
        return ResponseEntity.ok(
                solicitudService.buscarSolicitudPorId(id)
        );
    }
    @PostMapping
    public ResponseEntity<SolicitudResponse> guardarSolicitud(
            @RequestBody SolicitudRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(solicitudService.guardarSolicitud(request));
    }
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudResponse> aprobarSolicitud(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                solicitudService.aprobarSolicitud(id)
        );
    }
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudResponse> rechazarSolicitud(
            @PathVariable Long id,
            @RequestBody RechazarSolicitudRequest request) {
        return ResponseEntity.ok(
                solicitudService.rechazarSolicitud(id, request)
        );
    }
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<SolicitudResponse> cancelarSolicitud(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                solicitudService.cancelarSolicitud(id)
        );
    }
}
