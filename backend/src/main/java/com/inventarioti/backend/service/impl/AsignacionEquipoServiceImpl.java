package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.request.AsignacionEquipoRequest;
import com.inventarioti.backend.dto.response.AsignacionEquipoResponse;
import com.inventarioti.backend.entity.AsignacionEquipo;
import com.inventarioti.backend.entity.Equipo;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.exception.ResourceNotFoundException;
import com.inventarioti.backend.repository.AsignacionEquipoRepository;
import com.inventarioti.backend.repository.EquipoRepository;
import com.inventarioti.backend.repository.SolicitudRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.AsignacionEquipoService;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import com.inventarioti.backend.service.mapper.AsignacionEquipoMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AsignacionEquipoServiceImpl
        implements AsignacionEquipoService {

    private final AsignacionEquipoRepository asignacionEquipoRepository;
    private final SolicitudRepository solicitudRepository;
    private final EquipoRepository equipoRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistorialSolicitudService historialSolicitudService;

    public AsignacionEquipoServiceImpl(
            AsignacionEquipoRepository asignacionEquipoRepository,
            SolicitudRepository solicitudRepository,
            EquipoRepository equipoRepository,
            UsuarioRepository usuarioRepository,
            HistorialSolicitudService historialSolicitudService) {

        this.asignacionEquipoRepository = asignacionEquipoRepository;
        this.solicitudRepository = solicitudRepository;
        this.equipoRepository = equipoRepository;
        this.usuarioRepository = usuarioRepository;
        this.historialSolicitudService = historialSolicitudService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'TI')")
    public AsignacionEquipoResponse asignarEquipo(
            Long idSolicitud,
            AsignacionEquipoRequest request) {

        Solicitud solicitud = solicitudRepository.findById(idSolicitud)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Solicitud no encontrada"));

        if (!solicitud.getEstado().equals("PROCESADA")) {
            throw new RuntimeException(
                    "Solo las solicitudes procesadas pueden recibir equipos.");
        }

        if (solicitud.getUsuarioCreado() == null) {
            throw new RuntimeException(
                    "La solicitud no tiene un usuario creado.");
        }

        Equipo equipo = equipoRepository
                .findById(request.getIdEquipo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipo no encontrado"));

        if (!equipo.getActivo()) {
            throw new RuntimeException(
                    "El equipo no está activo.");
        }
        if (!equipo.getEstado().equals("DISPONIBLE")) {
            throw new RuntimeException(
                    "El equipo no está disponible para asignación."
            );
        }

        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        String nombreUsuario = authentication.getName();

        Usuario usuarioTi = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario autenticado no encontrado"));

        AsignacionEquipo asignacion = new AsignacionEquipo();

        asignacion.setSolicitud(solicitud);
        asignacion.setUsuario(solicitud.getUsuarioCreado());
        asignacion.setEquipo(equipo);
        asignacion.setUsuarioTi(usuarioTi);
        asignacion.setFechaAsignacion(LocalDateTime.now());
        asignacion.setEstado("ACTIVA");
        asignacion.setObservaciones(request.getObservaciones());

        AsignacionEquipo asignacionGuardada =
                asignacionEquipoRepository.save(asignacion);

        equipo.setEstado("ASIGNADO");
        equipoRepository.save(equipo);

        String estadoAnterior = solicitud.getEstado();

        solicitud.setEstado("FINALIZADA");

        Solicitud solicitudGuardada =
                solicitudRepository.save(solicitud);

        historialSolicitudService.registrarCambio(
                solicitudGuardada,
                usuarioTi,
                estadoAnterior,
                "FINALIZADA",
                "Equipo asignado y solicitud finalizada."
        );

        return AsignacionEquipoMapper.toResponse(
                asignacionGuardada);
    }

    @Override
    public List<AsignacionEquipoResponse> listarAsignaciones() {
        return asignacionEquipoRepository.findAll()
                .stream()
                .map(AsignacionEquipoMapper::toResponse)
                .toList();
    }

    @Override
    public List<AsignacionEquipoResponse> listarEquiposPorUsuario(
            Long idUsuario) {

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado"));

        return asignacionEquipoRepository
                .findByUsuarioAndEstado(usuario, "ACTIVA")
                .stream()
                .map(AsignacionEquipoMapper::toResponse)
                .toList();
    }

    @Override
    public List<AsignacionEquipoResponse> listarHistorialEquipo(
            Long idEquipo) {

        Equipo equipo = equipoRepository.findById(idEquipo)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipo no encontrado"));

        return asignacionEquipoRepository
                .findByEquipo(equipo)
                .stream()
                .map(AsignacionEquipoMapper::toResponse)
                .toList();
    }
}
