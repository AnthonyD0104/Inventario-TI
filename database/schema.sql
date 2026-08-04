-- ===========================================
-- BASE DE DATOS
-- Sistema de Gestión y Préstamo de Equipos TI
-- ===========================================

CREATE DATABASE IF NOT EXISTS inventario_ti
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE inventario_ti;

-- ===========================================
-- TABLA: DEPARTAMENTO
-- ===========================================

CREATE TABLE departamento (
    id_departamento BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- ===========================================
-- TABLA: ROL
-- ===========================================

CREATE TABLE rol (
    id_rol BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- ===========================================
-- TABLA: CATEGORIA EQUIPO
-- ===========================================

CREATE TABLE categoria_equipo (
    id_categoria BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- ===========================================
-- TABLA: USUARIO
-- ===========================================

CREATE TABLE usuario (

    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    id_departamento BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    CONSTRAINT fk_usuario_departamento
        FOREIGN KEY (id_departamento)
        REFERENCES departamento(id_departamento),

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (id_rol)
        REFERENCES rol(id_rol)
);

-- ===========================================
-- TABLA: EQUIPO
-- ===========================================

CREATE TABLE equipo (

    id_equipo BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_activo VARCHAR(50) NOT NULL UNIQUE,
    numero_serie VARCHAR(100) NOT NULL UNIQUE,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fecha_compra DATE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    id_categoria BIGINT NOT NULL,
        CONSTRAINT fk_equipo_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria_equipo(id_categoria)
);

-- ===========================================
-- TABLA: SOLICITUD
-- ===========================================

CREATE TABLE solicitud (

    id_solicitud BIGINT AUTO_INCREMENT PRIMARY KEY,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        correo VARCHAR(100) NOT NULL,
        cargo VARCHAR(100) NOT NULL,
        estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
        fecha_solicitud DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        observaciones TEXT,
        id_departamento BIGINT NOT NULL,
        id_usuario_rrhh BIGINT NOT NULL,
        id_usuario_ti BIGINT NULL,
        id_usuario_creado BIGINT NULL,
        CONSTRAINT fk_solicitud_departamento
            FOREIGN KEY (id_departamento)
            REFERENCES departamento(id_departamento),

        CONSTRAINT fk_solicitud_rrhh
            FOREIGN KEY (id_usuario_rrhh)
            REFERENCES usuario(id_usuario),

        CONSTRAINT fk_solicitud_ti
            FOREIGN KEY (id_usuario_ti)
            REFERENCES usuario(id_usuario),

        CONSTRAINT fk_solicitud_usuario_creado
            FOREIGN KEY (id_usuario_creado)
            REFERENCES usuario(id_usuario)
);

-- ===========================================
-- TABLA: ASIGNACION EQUIPO
-- ===========================================

CREATE TABLE asignacion_equipo (

    id_asignacion BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_solicitud BIGINT NOT NULL,
    id_usuario BIGINT NOT NULL,
    id_equipo BIGINT NOT NULL,
    id_usuario_ti BIGINT NOT NULL,
    fecha_asignacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion DATETIME NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVA',
    observaciones TEXT,
    CONSTRAINT fk_asignacion_solicitud
        FOREIGN KEY (id_solicitud)
        REFERENCES solicitud(id_solicitud),

    CONSTRAINT fk_asignacion_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario),

    CONSTRAINT fk_asignacion_equipo
        FOREIGN KEY (id_equipo)
        REFERENCES equipo(id_equipo),

    CONSTRAINT fk_asignacion_ti
        FOREIGN KEY (id_usuario_ti)
        REFERENCES usuario(id_usuario)
);

-- ===========================================
-- TABLA: HISTORIAL SOLICITUD
-- ===========================================

CREATE TABLE historial_solicitud (
    id_historial BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_solicitud BIGINT NOT NULL,
    id_usuario BIGINT NOT NULL,
    estado_anterior VARCHAR(30),
    estado_nuevo VARCHAR(30) NOT NULL,
    comentario TEXT,
    fecha_cambio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historial_solicitud
        FOREIGN KEY (id_solicitud)
        REFERENCES solicitud(id_solicitud),

    CONSTRAINT fk_historial_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);