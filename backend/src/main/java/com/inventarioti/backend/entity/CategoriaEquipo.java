package com.inventarioti.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Entidad: categoría de equipo
@Entity
@Table(name = "categoria_equipo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaEquipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long idCategoria;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre;

    // Soft-delete / habilitación
    @Column(nullable = false)
    private Boolean activo = true;
}
