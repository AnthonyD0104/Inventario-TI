package com.inventarioti.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

// Entidad: asignación de un equipo a un usuario
@Entity
@Table(name = "asignacion_equipo")
@Data
public class AsignacionEquipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asignacion")
    private Long idAsignacion;

    // FK: solicitud origen (opcional)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_solicitud")
    private Solicitud solicitud;

    // FK: usuario receptor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    // FK: equipo asignado
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_equipo", nullable = false)
    private Equipo equipo;

    // FK: TI que asigna
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_ti", nullable = false)
    private Usuario usuarioTi;

    @Column(name = "fecha_asignacion", nullable = false)
    private LocalDateTime fechaAsignacion;

    @Column(name = "fecha_devolucion")
    private LocalDateTime fechaDevolucion;

    // Estado (ACTIVA / DEVUELTA)
    @Column(nullable = false, length = 30)
    private String estado = "ACTIVA";

    @Column(columnDefinition = "TEXT")
    private String observaciones;
}
