package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.response.HistorialSolicitudResponse;
import com.inventarioti.backend.entity.HistorialSolicitud;
import com.inventarioti.backend.entity.Solicitud;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.repository.HistorialSolicitudRepository;
import com.inventarioti.backend.service.interfaces.HistorialSolicitudService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistorialSolicitudServiceImpl implements HistorialSolicitudService {
    private final HistorialSolicitudRepository historialSolicitudRepository;

    public HistorialSolicitudServiceImpl(
            HistorialSolicitudRepository historialSolicitudRepository){
        this.historialSolicitudRepository = historialSolicitudRepository;
    }
    @Override
    public void registrarCambio(
            Solicitud solicitud,
            Usuario usuario,
            String estadoAnterior,
            String estadoNuevo,
            String comentario){
        HistorialSolicitud historial = new HistorialSolicitud();

        historial.setSolicitud(solicitud);
        historial.setUsuario(usuario);
        historial.setEstadoAnterior(estadoAnterior);
        historial.setEstadoNuevo(estadoNuevo);
        historial.setComentario(comentario);
        historial.setFechaCambio(LocalDateTime.now());

        historialSolicitudRepository.save(historial);
    }
    @Override
    public List<HistorialSolicitudResponse> listarHistorialPorSolicitud(
            Long idSolicitud){
        return historialSolicitudRepository
                .findBySolicitudIdSolicitudOrderByFechaCambioAsc(idSolicitud)
                .stream()
                .map(historial -> HistorialSolicitudResponse.builder()
                        .idHistorial(historial.getIdHistorial())
                        .idSolicitud(
                                historial.getSolicitud().getIdSolicitud()
                        )
                        .idUsuario(
                                historial.getUsuario().getIdUsuario()
                        )
                        .usuario(
                                historial.getUsuario().getUsuario()
                        )
                        .estadoAnterior(
                                historial.getEstadoAnterior()
                        )
                        .estadoNuevo(
                                historial.getEstadoNuevo()
                        )
                        .comentario(
                                historial.getComentario()
                        )
                        .fechaCambio(
                                historial.getFechaCambio()
                        )
                        .build()
                )
                .toList();
    }

}
