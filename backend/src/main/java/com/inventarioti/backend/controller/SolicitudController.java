package com.inventarioti.backend.controller;

import com.inventarioti.backend.dto.request.CancelarSolcitudRequest;
import com.inventarioti.backend.dto.request.CrearUsuarioSolicitudRequest;
import com.inventarioti.backend.dto.request.RechazarSolicitudRequest;
import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.service.interfaces.AsignacionEquipoService;
import com.inventarioti.backend.service.interfaces.SolicitudService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.inventarioti.backend.dto.request.AsignacionEquipoRequest;
import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;

import java.util.List;

// Controller: ciclo de vida de solicitudes
@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudController {
    private final SolicitudService solicitudService;
    private final AsignacionEquipoService asignacionEquipoService;
    public SolicitudController(
            SolicitudService solicitudService,
            AsignacionEquipoService asignacionEquipoService){
        this.solicitudService = solicitudService;
        this.asignacionEquipoService = asignacionEquipoService;
    }
    // GET /api/solicitudes — lista solicitudes
    @GetMapping
    public ResponseEntity<List<SolicitudResponse>> listarSolicitudes(){
        return ResponseEntity.ok(
                solicitudService.listarSolicitudes()
        );
    }
    // GET /api/solicitudes/{id} — busca solicitud
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudResponse> buscarSolicitudPorId(
            @PathVariable Long id){
        return ResponseEntity.ok(
                solicitudService.buscarSolicitudPorId(id)
        );
    }
    // POST /api/solicitudes — crea solicitud
    @PostMapping
    public ResponseEntity<SolicitudResponse> guardarSolicitud(
            @RequestBody SolicitudRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(solicitudService.guardarSolicitud(request));
    }
    // PUT /api/solicitudes/{id}/aprobar — aprueba solicitud
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudResponse> aprobarSolicitud(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                solicitudService.aprobarSolicitud(id)
        );
    }
    // PUT /api/solicitudes/{id}/rechazar — rechaza solicitud
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudResponse> rechazarSolicitud(
            @PathVariable Long id,
            @RequestBody RechazarSolicitudRequest request) {
        return ResponseEntity.ok(
                solicitudService.rechazarSolicitud(id, request)
        );
    }
    // PUT /api/solicitudes/{id}/cancelar — cancela solicitud
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<SolicitudResponse> cancelarSolicitud(
            @PathVariable Long id,
            @RequestBody CancelarSolcitudRequest request) {
        return ResponseEntity.ok(
                solicitudService.cancelarSolicitud(id, request)
        );
    }
    // POST /api/solicitudes/{id}/crear-usuario — crea usuario desde solicitud
    @PostMapping("/{id}/crear-usuario")
    public ResponseEntity<SolicitudResponse> crearUsuarioSolicitud(
            @PathVariable Long id,
            @RequestBody CrearUsuarioSolicitudRequest request) {

        return ResponseEntity.ok(
                solicitudService.crearUsuarioSolicitud(id, request)
        );
    }
    // POST /api/solicitudes/{id}/asignar-equipo — asigna equipo a solicitud
    @PostMapping("/{id}/asignar-equipo")
    public ResponseEntity<AsignacionEquipoResponse> asignarEquipo(
            @PathVariable Long id,
            @RequestBody AsignacionEquipoRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        asignacionEquipoService.asignarEquipo(id, request)
                );
    }
}
