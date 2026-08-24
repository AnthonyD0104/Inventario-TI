package com.inventarioti.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

// Entidad: solicitud de equipo o usuario
@Entity
@Table(name = "solicitud")
@Data
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud")
    private Long idSolicitud;

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(nullable = false, length = 100)
    private String correo;

    @Column(nullable = false, length = 100)
    private String cargo;

    // Estado del flujo (PENDIENTE, EN_PROCESO, etc.)
    @Column(nullable = false, length = 30)
    private String estado;

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDateTime fechaSolicitud;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    // FK: departamento destino
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    // FK: RRHH que registra
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_rrhh", nullable = false)
    private Usuario usuarioRrhh;

    // FK: TI que atiende (opcional)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_ti")
    private Usuario usuarioTi;

    // FK: usuario creado a partir de la solicitud
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_creado")
    private Usuario usuarioCreado;
}
