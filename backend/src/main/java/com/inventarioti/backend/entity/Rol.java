package com.inventarioti.backend.entity;

import jakarta.persistence.*;
import org.aspectj.apache.bcel.generic.RET;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;

    @Column(nullable = false, unique = true, length = 50)
    private String nombre;

    @Column(nullable = false, unique = true, length = 50)
    private Boolean activo = true;

    public Rol() {
    }

    public Rol(Long idRol, String nombre, Boolean activo) {
        this.idRol = idRol;
        this.nombre = nombre;
        this.activo = activo;
    }

    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}

