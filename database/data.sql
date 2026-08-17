-- ===========================================
-- DATOS INICIALES
-- Sistema de Gestión y Préstamo de Equipos TI
-- ===========================================

USE inventario_ti;

-- ===========================================
-- ROLES
-- ===========================================

INSERT INTO rol (id_rol, nombre, activo)
VALUES
    (1, 'ADMIN', TRUE),
    (2, 'TI', TRUE),
    (3, 'RRHH', TRUE),
    (4, 'EMPLEADO', TRUE);


-- ===========================================
-- DEPARTAMENTOS
-- ===========================================

INSERT INTO departamento (id_departamento, nombre, activo)
VALUES
    (1, 'Administrador', TRUE),
    (2, 'Recursos Humanos', TRUE),
    (3, 'Sistemas', TRUE),
    (4, 'Contabilidad', TRUE),
    (5, 'Ventas', TRUE),
    (6, 'Marketing', TRUE),
    (7, 'Gerencia', TRUE);


-- ===========================================
-- CATEGORIAS DE EQUIPO
-- ===========================================

INSERT INTO categoria_equipo (id_categoria, nombre, activo)
VALUES
    (1, 'Laptop', TRUE),
    (2, 'Monitor', TRUE),
    (3, 'Teclado', TRUE),
    (4, 'Mouse', TRUE),
    (5, 'Tablet', TRUE);


-- ===========================================
-- EQUIPOS
-- ===========================================

INSERT INTO equipo (
    id_equipo,
    codigo_activo,
    numero_serie,
    marca,
    modelo,
    estado,
    fecha_compra,
    activo,
    id_categoria
)
VALUES
    (
        1,
        'LAP-001',
        'SN-LAP-001',
        'Dell',
        'Latitude 5440',
        'DISPONIBLE',
        '2026-01-15',
        TRUE,
        1
    ),
    (
        2,
        'LAP-002',
        'SN-LAP-002',
        'HP',
        'ProBook 450 G10',
        'DISPONIBLE',
        '2026-01-20',
        TRUE,
        1
    ),
    (
        3,
        'MON-001',
        'SN-MON-001',
        'LG',
        '24MP400',
        'DISPONIBLE',
        '2026-02-10',
        TRUE,
        2
    ),
    (
        4,
        'TEC-001',
        'SN-TEC-001',
        'Logitech',
        'K120',
        'DISPONIBLE',
        '2026-02-15',
        TRUE,
        3
    ),
    (
        5,
        'MOU-001',
        'SN-MOU-001',
        'Logitech',
        'M185',
        'DISPONIBLE',
        '2026-02-15',
        TRUE,
        4
    );