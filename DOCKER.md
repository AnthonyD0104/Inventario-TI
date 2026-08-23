# Docker — Inventario TI

Guía breve para levantar el sistema con contenedores (útil para demo y defensa).

## Arquitectura

```
Browser → Frontend (nginx :80)
              │
              ├── archivos React (HTML/JS/CSS)
              └── /api/*  ──proxy──▶  Backend (Spring Boot :8080)
                                           │
                                           └── MySQL (:3306)
```

Tres servicios:

| Servicio   | Contenedor                 | Rol                                      |
|------------|----------------------------|------------------------------------------|
| `db`       | `inventario-ti-db`         | Base de datos MySQL + scripts iniciales  |
| `backend`  | `inventario-ti-backend`    | API REST Spring Boot + JWT               |
| `frontend` | `inventario-ti-frontend`   | React empaquetado + nginx (proxy `/api`) |

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución
- Puertos libres: **80**, **8080**, **3306** (o cámbialos en `.env`)

## Cómo levantar

Desde la **raíz** del proyecto:

```bash
# (Opcional) copiar variables de entorno
cp .env.example .env

# Construir imágenes y arrancar los 3 servicios
docker compose up --build
```

Primera vez puede tardar varios minutos (descarga de imágenes + build Maven/npm).

Cuando termine:

- **Aplicación:** http://localhost  
- **API (directa):** http://localhost:8080/api  
- **Login demo:** `admin` / `123456`

Para detener:

```bash
docker compose down
```

Para borrar también los datos de MySQL (volumen):

```bash
docker compose down -v
```

## Archivos importantes

| Archivo | Para qué sirve |
|---------|----------------|
| `docker-compose.yml` | Orquesta MySQL + backend + frontend |
| `backend/Dockerfile` | Compila el JAR Spring Boot y lo ejecuta |
| `frontend/Dockerfile` | Build de Vite + sirve con nginx |
| `frontend/nginx.conf` | Sirve el SPA y hace proxy de `/api` al backend |
| `.env.example` | Plantilla de contraseñas y puertos |
| `database/schema.sql` / `data.sql` | Se cargan al crear el volumen MySQL por primera vez |

## Cómo se conectan (para explicar en la defensa)

1. **MySQL** arranca y ejecuta `schema.sql` + `data.sql` (roles, departamentos, equipos de ejemplo).
2. **Backend** espera a que MySQL esté saludable (`healthcheck`) y se conecta con la URL `jdbc:mysql://db:3306/...` (`db` es el nombre del servicio en la red interna de Docker).
3. **Frontend** se construye con `VITE_API_URL=/api`. El navegador llama a `/api/...` en el mismo origen (`http://localhost`); **nginx** reenvía esas peticiones al contenedor `backend:8080`.
4. `DataInitializer` crea el usuario `admin` si aún no existe.

## Desarrollo local vs Docker

| Modo | Front | API |
|------|-------|-----|
| `npm run dev` | http://localhost:5173 | `http://localhost:8080/api` (axios por defecto) |
| Docker | http://localhost | `/api` (proxy nginx, sin CORS) |

## Problemas comunes

- **Puerto 80 ocupado:** cambia `FRONTEND_PORT=3000` en `.env` y abre http://localhost:3000  
- **Datos viejos / seed no aplica:** `docker compose down -v` y vuelve a `up --build` (el init SQL solo corre en volumen nuevo)  
- **Backend no conecta a MySQL:** espera el healthcheck; revisa logs con `docker compose logs backend`
