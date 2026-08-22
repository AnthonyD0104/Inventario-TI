package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.response.HistorialSolicitudResponse;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial-solicitudes")
public class HistorialSolicitudController {

    private final HistorialSolicitudService historialSolicitudService;

    public HistorialSolicitudController(
            HistorialSolicitudService historialSolicitudService) {
        this.historialSolicitudService = historialSolicitudService;
    }

    @GetMapping
    public ResponseEntity<List<HistorialSolicitudResponse>> listarHistorial() {
        return ResponseEntity.ok(
                historialSolicitudService.listarHistorial()
        );
    }

    @GetMapping("/solicitud/{idSolicitud}")
    public ResponseEntity<List<HistorialSolicitudResponse>> listarPorSolicitud(
            @PathVariable Long idSolicitud) {
        return ResponseEntity.ok(
                historialSolicitudService.listarHistorialPorSolicitud(idSolicitud)
        );
    }
}
