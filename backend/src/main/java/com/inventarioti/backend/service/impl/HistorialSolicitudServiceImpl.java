package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.response.HistorialSolicitudResponse;
import com.inventarioti.backend.entity.HistorialSolicitud;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.repository.HistorialSolicitudRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

// Servicio: registro de cambios de solicitudes
@Service
public class HistorialSolicitudServiceImpl implements HistorialSolicitudService {

    private final HistorialSolicitudRepository historialSolicitudRepository;
    private final UsuarioRepository usuarioRepository;

    public HistorialSolicitudServiceImpl(
            HistorialSolicitudRepository historialSolicitudRepository,
            UsuarioRepository usuarioRepository) {
        this.historialSolicitudRepository = historialSolicitudRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Registra un cambio de estado en historial
    @Override
    public void registrarCambio(
            Solicitud solicitud,
            Usuario usuario,
            String estadoAnterior,
            String estadoNuevo,
            String comentario) {

        HistorialSolicitud historial = new HistorialSolicitud();
        historial.setSolicitud(solicitud);
        historial.setUsuario(usuario);
        historial.setEstadoAnterior(estadoAnterior);
        historial.setEstadoNuevo(estadoNuevo);
        historial.setComentario(comentario);
        historial.setFechaCambio(LocalDateTime.now());
        historialSolicitudRepository.save(historial);
    }

    // Lista el historial según el rol del usuario
    @Override
    @Transactional(readOnly = true)
    public List<HistorialSolicitudResponse> listarHistorial() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = authentication.getName();

        Usuario usuario = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        String rol = usuario.getRol().getNombre();
        List<HistorialSolicitud> historiales;

        // ADMIN y TI ven todo el historial
        if (rol.equals("ADMIN") || rol.equals("TI")) {
            historiales = historialSolicitudRepository
                    .findAllByOrderByFechaCambioDesc();
        // RRHH solo ve el historial de sus solicitudes
        } else if (rol.equals("RRHH")) {
            historiales = historialSolicitudRepository
                    .findBySolicitudUsuarioRrhhOrderByFechaCambioDesc(usuario);
        } else {
            throw new RuntimeException(
                    "No tiene permisos para ver el historial de solicitudes."
            );
        }

        return historiales.stream()
                .map(this::toResponse)
                .toList();
    }

    // Lista el historial de una solicitud
    @Override
    @Transactional(readOnly = true)
    public List<HistorialSolicitudResponse> listarHistorialPorSolicitud(
            Long idSolicitud) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String nombreUsuario = authentication.getName();

        Usuario usuario = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        String rol = usuario.getRol().getNombre();

        List<HistorialSolicitud> historiales =
                historialSolicitudRepository
                        .findBySolicitudIdSolicitudOrderByFechaCambioAsc(idSolicitud);

        // Filtra por RRHH dueño o exige ADMIN/TI
        if (rol.equals("RRHH")) {
            historiales = historiales.stream()
                    .filter(h -> h.getSolicitud().getUsuarioRrhh() != null
                            && h.getSolicitud().getUsuarioRrhh().getIdUsuario()
                            .equals(usuario.getIdUsuario()))
                    .toList();
        } else if (!rol.equals("ADMIN") && !rol.equals("TI")) {
            throw new RuntimeException(
                    "No tiene permisos para ver el historial de solicitudes."
            );
        }

        return historiales.stream()
                .map(this::toResponse)
                .toList();
    }

    private HistorialSolicitudResponse toResponse(HistorialSolicitud historial) {
        Solicitud solicitud = historial.getSolicitud();
        String colaborador = solicitud.getNombres() + " " + solicitud.getApellidos();
        String departamento = solicitud.getDepartamento() != null
                ? solicitud.getDepartamento().getNombre()
                : null;

        return HistorialSolicitudResponse.builder()
                .idHistorial(historial.getIdHistorial())
                .idSolicitud(solicitud.getIdSolicitud())
                .colaborador(colaborador)
                .departamento(departamento)
                .idUsuario(historial.getUsuario().getIdUsuario())
                .usuario(historial.getUsuario().getUsuario())
                .estadoAnterior(historial.getEstadoAnterior())
                .estadoNuevo(historial.getEstadoNuevo())
                .comentario(historial.getComentario())
                .fechaCambio(historial.getFechaCambio())
                .build();
    }
}
