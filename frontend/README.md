# Frontend — Inventario TI

Interfaz web del sistema de gestión y asignación de equipos tecnológicos.

> Documentación general del proyecto: [README principal](../README.md)  
> Despliegue con contenedores: [DOCKER.md](../DOCKER.md)

## Stack

- React 19 + TypeScript
- Vite 8
- Material UI (MUI)
- React Router 7
- Axios
- React Hook Form + Yup
- SweetAlert2

## Estructura

```
frontend/src/
├── api/            # Clientes HTTP (axios)
├── components/     # Sidebar, TopBar
├── layouts/        # MainLayout
├── pages/          # Pantallas por módulo
├── routes/         # Rutas y ProtectedRoute
├── schemas/        # Validación Yup
└── types/          # Tipos TypeScript
```

## Pantallas

| Ruta | Módulo | Roles típicos |
|------|--------|---------------|
| `/login` | Inicio de sesión | Todos |
| `/` | Home (dashboard) | Todos |
| `/mis-equipos` | Equipos asignados al usuario | Todos |
| `/solicitudes` | Flujo de solicitudes | ADMIN, TI, RRHH |
| `/historial-solicitudes` | Auditoría | ADMIN, TI, RRHH |
| `/asignaciones` | Gestión de asignaciones | ADMIN, TI |
| `/usuarios` | CRUD usuarios | ADMIN, TI |
| `/equipos` | Inventario | ADMIN, TI |

## Ejecutar en local

```bash
npm install
npm run dev
```

- App: http://localhost:5173
- API por defecto: http://localhost:8080/api (ver `src/api/axios.ts`)

El backend debe estar en ejecución y MySQL configurada (ver [README principal](../README.md)).

## Variables de entorno

Opcional. Crea `frontend/.env` si necesitas cambiar la URL de la API:

```env
VITE_API_URL=http://localhost:8080/api
```

En Docker, el build usa `VITE_API_URL=/api` (proxy nginx hacia el backend).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila para producción (`dist/`) |
| `npm run preview` | Previsualiza el build local |
| `npm run lint` | ESLint |

## Build de producción

```bash
npm run build
```

Artefactos en `frontend/dist/`. En Docker, nginx sirve esa carpeta (ver `frontend/Dockerfile` y `nginx.conf`).

## Autenticación en el cliente

Tras el login, se guardan en `localStorage`:

- `token` — JWT enviado en cada petición (interceptor axios)
- `usuario` — `{ nombres, apellidos, rol, usuario }` para UI y menú

## Desarrollo vs Docker

| Modo | Comando | URL app | API |
|------|---------|---------|-----|
| Desarrollo | `npm run dev` | :5173 | `localhost:8080/api` |
| Docker | `docker compose up` | :80 | `/api` (proxy nginx) |

Para desarrollo diario se recomienda `npm run dev`; Docker es ideal para demo y despliegue reproducible.
