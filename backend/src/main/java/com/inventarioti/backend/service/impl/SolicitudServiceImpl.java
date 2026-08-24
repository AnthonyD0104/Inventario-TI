package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.request.CancelarSolcitudRequest;
import com.inventarioti.backend.dto.request.CrearUsuarioSolicitudRequest;
import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.exception.ResourceNotFoundException;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.repository.RolRepository;
import com.inventarioti.backend.repository.SolicitudRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import com.inventarioti.backend.service.interfaces.SolicitudService;
import com.inventarioti.backend.service.mapper.SolicitudMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.inventarioti.backend.dto.request.RechazarSolicitudRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.inventarioti.backend.dto.request.CrearUsuarioSolicitudRequest;
import com.inventarioti.backend.entity.Rol;

import java.time.LocalDateTime;
import java.util.List;

// Servicio: lógica de solicitudes de equipos
@Service
public class SolicitudServiceImpl implements SolicitudService {
    private final SolicitudRepository solicitudRepository;
    private final DepartamentoRepository departamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistorialSolicitudService historialSolicitudService;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public SolicitudServiceImpl(
            SolicitudRepository solicitudRepository,
            DepartamentoRepository departamentoRepository,
            UsuarioRepository usuarioRepository,
            HistorialSolicitudService historialSolicitudService,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder){
        this.solicitudRepository = solicitudRepository;
        this.departamentoRepository = departamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.historialSolicitudService = historialSolicitudService;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }
    // Lista solicitudes según el rol del usuario
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
        // ADMIN y TI ven todas; RRHH solo las suyas
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
    // Busca una solicitud por su ID
    @Override
    public SolicitudResponse buscarSolicitudPorId(Long id) {

        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Solicitud no encontrada"));

        return SolicitudMapper.toResponse(solicitud);
    }

    // Crea una solicitud en estado PENDIENTE
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

        // Registra el cambio en historial
        historialSolicitudService.registrarCambio(
                solicitudGuardada,
                usuarioRrhh,
                null,
                "PENDIENTE",
                "Solicitud creada"
        );

        return SolicitudMapper.toResponse(solicitudGuardada);
    }
    // Aprueba la solicitud y registra historial
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
    // Rechaza la solicitud con un motivo
    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'TI')")
    public SolicitudResponse rechazarSolicitud(
                Long id,
                RechazarSolicitudRequest request) {
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Solicitud no encontrada"));
        // Valida que esté PENDIENTE
        if (!solicitud.getEstado().equals("PENDIENTE")) {
            throw new RuntimeException("Solo las solicitudes pendientes pueden rechazarse.");
        }
        // Valida que haya un motivo de rechazo
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
    // Crea el usuario de una solicitud aprobada
    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'TI')")
    public SolicitudResponse crearUsuarioSolicitud(
            Long id,
            CrearUsuarioSolicitudRequest request) {
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Solicitud no encontrada"));
        // Valida que la solicitud esté APROBADA
        if (!solicitud.getEstado().equals("APROBADA")) {
            throw new RuntimeException(
                    "Solo se pueden crear usuarios desde solicitudes aprobadas"
            );
        }
        // Valida que no tenga usuario creado
        if (solicitud.getUsuarioCreado() != null) {
            throw new RuntimeException(
                    "Esta solicitud ya tiene un usuario creado"
            );
        }
        // Valida que el username no exista
        if (usuarioRepository.findByUsuario(request.getUsuario()).isPresent()) {
            throw new RuntimeException(
                    "El nombre de usuario ya existe"
            );
        }
        Rol rol = rolRepository.findById(request.getIdRol())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Rol no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setUsuario(request.getUsuario());
        usuario.setPassword(
                passwordEncoder.encode("123456")
        );
        usuario.setCorreo(solicitud.getCorreo());
        usuario.setNombres(solicitud.getNombres());
        usuario.setApellidos(solicitud.getApellidos());
        usuario.setCargo(solicitud.getCargo());

        usuario.setRol(rol);
        usuario.setDepartamento(solicitud.getDepartamento());
        usuario.setActivo(true);
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String nombreUsuario = authentication.getName();

        Usuario usuarioTi = usuarioRepository
                .findByUsuario(nombreUsuario)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario TI no encontrado"));
        solicitud.setUsuarioCreado(usuarioGuardado);
        solicitud.setUsuarioTi(usuarioTi);
        String estadoAnterior = solicitud.getEstado();
        // Marca la solicitud como PROCESADA
        solicitud.setEstado("PROCESADA");
        Solicitud solicitudGuardada =
                solicitudRepository.save(solicitud);

        historialSolicitudService.registrarCambio(
                solicitudGuardada,
                usuarioTi,
                estadoAnterior,
                "PROCESADA",
                "Usuario creado."
        );

        return SolicitudMapper.toResponse(solicitudGuardada);
    }
    // Cancela la solicitud con un motivo
    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'RRHH')")
    public SolicitudResponse cancelarSolicitud(
            Long id,
            CancelarSolcitudRequest request){
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Solicitud no encontrada"));
        // Valida que esté PENDIENTE
        if(!solicitud.getEstado().equals("PENDIENTE")){
            throw new RuntimeException(
                    "Solo las solicitudes pendientes pueden cancelarse"
            );
        }
        if (request.getComentario() == null ||
                request.getComentario().trim().isEmpty()) {

            throw new RuntimeException(
                    "Debe ingresar un motivo de cancelación."
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
        // RRHH solo puede cancelar las suyas
        if (rol.equals("RRHH")) {
            if (!solicitud.getUsuarioRrhh()
                    .getIdUsuario()
                    .equals(usuarioAutenticado.getIdUsuario())) {
                throw new RuntimeException(
                        "No puede cancelar una solicitud que no le pertenece."
                );
            }
        }
        String estadoAnterior = solicitud.getEstado();
        solicitud.setEstado("CANCELADA");
        Solicitud solicitudGuardada =
                solicitudRepository.save(solicitud);
        historialSolicitudService.registrarCambio(
                solicitudGuardada,
                usuarioAutenticado,
                estadoAnterior,
                "CANCELADA",
                request.getComentario()
        );
        return SolicitudMapper.toResponse(solicitudGuardada);
    }
}
