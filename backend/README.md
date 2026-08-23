# Backend — Inventario TI

API REST del sistema de gestión y asignación de equipos tecnológicos.

> Documentación general del proyecto: [README principal](../README.md)  
> Despliegue con contenedores: [DOCKER.md](../DOCKER.md)

## Stack

- Java 21
- Spring Boot 4.1
- Spring Security + JWT
- Spring Data JPA / Hibernate
- MySQL 8

## Estructura

```
backend/src/main/java/com/inventarioti/backend/
├── config/         # Seguridad, CORS, inicialización de datos
├── controller/     # Endpoints REST
├── dto/            # Request / Response
├── entity/         # Entidades JPA
├── repository/     # Acceso a datos
├── service/        # Lógica de negocio
├── security/       # JWT (filtro, servicio)
└── exception/      # Manejo de errores
```

## Ejecutar en local

**Requisitos:** MySQL con la BD `inventario_ti` (ver `../database/`).

```bash
# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

- API base: http://localhost:8080/api
- Configuración: `src/main/resources/application.properties`

### Variables relevantes (local)

| Propiedad | Valor por defecto |
|-----------|-------------------|
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/inventario_ti` |
| `spring.datasource.username` | `root` |
| `spring.datasource.password` | `admin` |
| `server.port` | `8080` |

En Docker, `SPRING_DATASOURCE_*` se sobreescriben desde `docker-compose.yml`.

## Autenticación

```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "123456"
}
```

Respuesta incluye `token` JWT. En peticiones siguientes:

```http
Authorization: Bearer <token>
```

## Controladores

| Controlador | Ruta base |
|-------------|-----------|
| `AuthController` | `/api/auth` |
| `EquipoController` | `/api/equipos` |
| `UsuarioController` | `/api/usuarios` |
| `SolicitudController` | `/api/solicitudes` |
| `AsignacionEquipoController` | `/api/asignaciones` |
| `HistorialSolicitudController` | `/api/historial-solicitudes` |
| `DepartamentoController` | `/api/departamentos` |
| `RolController` | `/api/roles` |
| `CategoriaEquipoController` | `/api/categorias` |

## Datos iniciales

Al arrancar, `DataInitializer` crea el usuario **admin** (`123456`) si no existe, siempre que existan el rol ADMIN y el departamento Administrador (provistos por `database/data.sql`).

## Build

```bash
./mvnw -DskipTests package
```

JAR generado en `target/`.

## Tests

```bash
./mvnw test
```

Incluye un smoke test de contexto Spring (`BackendApplicationTests`).
