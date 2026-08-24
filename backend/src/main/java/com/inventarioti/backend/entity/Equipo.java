package com.inventarioti.backend.entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

// Entidad: equipo del inventario
@Entity
@Table(name = "equipo")
@Data
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipo")
    private Long idEquipo;

    @Column(name = "codigo_activo", nullable = false, unique = true, length = 50)
    private String codigoActivo;

    @Column(name = "numero_serie", nullable = false, unique = true, length = 100)
    private String numeroSerie;

    @Column(nullable = false, length = 100)
    private String marca;

    @Column(nullable = false, length = 100)
    private String modelo;

    // Estado operativo (DISPONIBLE, ASIGNADO, etc.)
    @Column(nullable = false, length = 30)
    private String estado;

    @Column(name = "fecha_compra")
    private LocalDate fechaCompra;

    // Soft-delete: false = dado de baja
    @Column(nullable = false)
    private Boolean activo;

    // FK: categoría del equipo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private CategoriaEquipo categoria;
}

