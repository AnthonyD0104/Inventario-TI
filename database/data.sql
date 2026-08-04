-- ===========================================
-- DATOS INICIALES
-- Sistema de Gestión y Préstamo de Equipos TI
-- ===========================================

-- ===========================================
-- ROLES
-- ===========================================

INSERT INTO rol (nombre, activo) VALUES
('Administrador', TRUE),
('Recursos Humanos', TRUE),
('Sistemas', TRUE),
('Empleado', TRUE);

-- ===========================================
-- DEPARTAMENTOS
-- ===========================================

INSERT INTO departamento (nombre, activo) VALUES
('Gerencia', TRUE),
('Recursos Humanos', TRUE),
('Sistemas', TRUE),
('Contabilidad', TRUE),
('Ventas', TRUE);

-- ===========================================
-- CATEGORÍAS DE EQUIPOS
-- ===========================================

INSERT INTO categoria_equipo (nombre, activo) VALUES
('Laptop', TRUE),
('Monitor', TRUE),
('Mouse', TRUE),
('Teclado', TRUE),
('Tablet', TRUE),
('Impresora', TRUE);

-- ===========================================
-- USUARIO ADMINISTRADOR
-- ===========================================

INSERT INTO usuario (
    usuario,
    password,
    correo,
    nombres,
    apellidos,
    cargo,
    activo,
    id_departamento,
    id_rol
)
VALUES (
    'admin',
    'admin123',
    'admin@iti.com',
    'Administrador',
    'Sistema',
    'Administrador General',
    TRUE,
    3,
    1
);