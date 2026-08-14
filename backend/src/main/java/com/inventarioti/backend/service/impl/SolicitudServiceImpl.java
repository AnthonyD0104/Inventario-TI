package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.repository.SolicitudRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import com.inventarioti.backend.service.interfaces.SolicitudService;
import com.inventarioti.backend.service.mapper.SolicitudMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.inventarioti.backend.dto.request.RechazarSolicitudRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SolicitudServiceImpl implements SolicitudService {
    private final SolicitudRepository solicitudRepository;
    private final DepartamentoRepository departamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistorialSolicitudService historialSolicitudService;

    public SolicitudServiceImpl(
            SolicitudRepository solicitudRepository,
            DepartamentoRepository departamentoRepository,
            UsuarioRepository usuarioRepository, HistorialSolicitudService historialSolicitudService){
        this.solicitudRepository = solicitudRepository;
        this.departamentoRepository = departamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.historialSolicitudService = historialSolicitudService;
    }
    @Override
    public List<SolicitudResponse> listarSolicitudes() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = authentication.getName();
        Usuario usuario = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));
        String rol = usuario.getRol().getNombre();
        List<Solicitud> solicitudes;
        if (rol.equals("ADMIN") || rol.equals("TI")) {
            solicitudes = solicitudRepository.findAll();
        } else if (rol.equals("RRHH")) {
            solicitudes = solicitudRepository.findByUsuarioRrhh(usuario);
        } else {
            throw new RuntimeException("No tiene permisos para ver solicitudes.");
        }
        return solicitudes.stream()
                .map(SolicitudMapper::toResponse)
                .toList();
    }
    @Override
    public SolicitudResponse buscarSolicitudPorId(Long id) {

        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Solicitud no encontrada"));

        return SolicitudMapper.toResponse(solicitud);
    }

    @Override
    public SolicitudResponse guardarSolicitud(SolicitudRequest request) {

        Departamento departamento = departamentoRepository
                .findById(request.getIdDepartamento())
                .orElseThrow(() ->
                        new RuntimeException("Departamento no encontrado"));

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String nombreUsuario = authentication.getName();

        Usuario usuarioRrhh = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new RuntimeException("Usuario RRHH no encontrado"));

        Solicitud solicitud = new Solicitud();

        solicitud.setNombres(request.getNombres());
        solicitud.setApellidos(request.getApellidos());
        solicitud.setCorreo(request.getCorreo());
        solicitud.setCargo(request.getCargo());
        solicitud.setObservaciones(request.getObservaciones());

        solicitud.setEstado("PENDIENTE");
        solicitud.setFechaSolicitud(LocalDateTime.now());

        solicitud.setDepartamento(departamento);
        solicitud.setUsuarioRrhh(usuarioRrhh);

        solicitud.setUsuarioTi(null);
        solicitud.setUsuarioCreado(null);

        Solicitud solicitudGuardada =
                solicitudRepository.save(solicitud);

        historialSolicitudService.registrarCambio(
                solicitudGuardada,
                usuarioRrhh,
                null,
                "PENDIENTE",
                "Solicitud creada"
        );

        return SolicitudMapper.toResponse(solicitudGuardada);
    }
    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'TI')")
    public SolicitudResponse aprobarSolicitud(Long id){
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Solicitud no encontrada"));
        String estadoAnterior = solicitud.getEstado();

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = authentication.getName();

        Usuario usuario = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(()->
                        new RuntimeException("Usuario no encontrado"));

    solicitud.setEstado("APROBADA");
    Solicitud solicitudGuardada = solicitudRepository.save(solicitud);

    historialSolicitudService.registrarCambio(
            solicitudGuardada,
            usuario,
            estadoAnterior,
            "APROBADA",
            "Solicitud aprobada"
    );
    return SolicitudMapper.toResponse(solicitudGuardada);
    }
    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'TI')")
    public SolicitudResponse rechazarSolicitud(
                Long id,
                RechazarSolicitudRequest request) {
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Solicitud no encontrada"));
        if (!solicitud.getEstado().equals("PENDIENTE")) {
            throw new RuntimeException("Solo las solicitudes pendientes pueden rechazarse.");
        }
        if (request.getComentario() == null ||
                request.getComentario().trim().isEmpty()) {

            throw new RuntimeException(
                    "Debe ingresar un motivo del rechazo."
            );
        }

        String estadoAnterior = solicitud.getEstado();

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String nombreUsuario = authentication.getName();

        Usuario usuario = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        solicitud.setEstado("RECHAZADA");
        Solicitud solicitudGuardada = solicitudRepository.save(solicitud);
        historialSolicitudService.registrarCambio(
                solicitudGuardada,
                usuario,
                estadoAnterior,
                "RECHAZADA",
                request.getComentario()
        );
        return SolicitudMapper.toResponse(solicitudGuardada);
    }
    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'RRHH')")
    public SolicitudResponse cancelarSolicitud(Long id){
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Solicitud no encontrada"));
        if(!solicitud.getEstado().equals("PENDIENTE")){
            throw new RuntimeException(
                    "Solo las solicitudes pendientes pueden cancelarse"
            );
        }
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = authentication.getName();
        Usuario usuarioAutenticado = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));
        String rol = usuarioAutenticado.getRol().getNombre();
        if (rol.equals("RRHH")) {
            if (!solicitud.getUsuarioRrhh()
                    .getIdUsuario()
                    .equals(usuarioAutenticado.getIdUsuario())) {
                throw new RuntimeException(
                        "No puede cancelar una solicitud que no le pertenece."
                );
            }
        }
        solicitud.setEstado("CANCELADA");
        Solicitud solicitudGuardada =
                solicitudRepository.save(solicitud);
        return SolicitudMapper.toResponse(solicitudGuardada);
    }
}
