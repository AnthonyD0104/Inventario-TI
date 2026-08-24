package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.response.HistorialSolicitudResponse;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller: consulta de historial de solicitudes
@RestController
@RequestMapping("/api/historial-solicitudes")
public class HistorialSolicitudController {

    private final HistorialSolicitudService historialSolicitudService;

    public HistorialSolicitudController(
            HistorialSolicitudService historialSolicitudService) {
        this.historialSolicitudService = historialSolicitudService;
    }

    // GET /api/historial-solicitudes — lista todo el historial
    @GetMapping
    public ResponseEntity<List<HistorialSolicitudResponse>> listarHistorial() {
        return ResponseEntity.ok(
                historialSolicitudService.listarHistorial()
        );
    }

    // GET /api/historial-solicitudes/solicitud/{idSolicitud} — historial por solicitud
    @GetMapping("/solicitud/{idSolicitud}")
    public ResponseEntity<List<HistorialSolicitudResponse>> listarPorSolicitud(
            @PathVariable Long idSolicitud) {
        return ResponseEntity.ok(
                historialSolicitudService.listarHistorialPorSolicitud(idSolicitud)
        );
    }
}
