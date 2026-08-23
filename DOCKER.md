# Docker — Inventario TI

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