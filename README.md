# Sistema Web Distribuido para la Gestión y Asignación de Equipos Tecnológicos

Stack: **Spring Boot** (API REST + JWT) · **React + TypeScript** · **MySQL**

## Levantar con Docker

Requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) en ejecución.

```bash
docker compose up --build
```

Luego abre **http://localhost** e inicia sesión con `admin` / `123456`.

Detalle completo (arquitectura, puertos, troubleshooting): ver [DOCKER.md](./DOCKER.md).

## Desarrollo local (sin Docker)

1. MySQL con la BD `inventario_ti` (scripts en `database/`)
2. Backend: `cd backend` → `./mvnw spring-boot:run` (puerto 8080)
3. Frontend: `cd frontend` → `npm install` → `npm run dev` (puerto 5173)
