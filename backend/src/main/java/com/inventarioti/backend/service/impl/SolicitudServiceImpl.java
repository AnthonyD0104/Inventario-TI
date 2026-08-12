package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.request.SolicitudRequest;
import com.inventarioti.backend.dto.response.SolicitudResponse;
import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.repository.SolicitudRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.SolicitudService;
import com.inventarioti.backend.service.mapper.SolicitudMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SolicitudServiceImpl implements SolicitudService {
    private final SolicitudRepository solicitudRepository;
    private final DepartamentoRepository departamentoRepository;
    private final UsuarioRepository usuarioRepository;

    public SolicitudServiceImpl(
            SolicitudRepository solicitudRepository,
            DepartamentoRepository departamentoRepository,
            UsuarioRepository usuarioRepository){
        this.solicitudRepository = solicitudRepository;
        this.departamentoRepository = departamentoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    @Override
    public List<SolicitudResponse> listarSolicitudes(){
        return solicitudRepository.findAll()
                .stream()
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

        return SolicitudMapper.toResponse(solicitudGuardada);
    }
}
