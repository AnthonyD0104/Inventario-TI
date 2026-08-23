import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Chip,
  Skeleton,
} from "@mui/material";
import "./Home.css";

import { obtenerMisEquipos, obtenerAsignaciones } from "../api/asignacion";
import { obtenerSolicitudes } from "../api/solicitud";
import { obtenerEquipos } from "../api/equipo";

type UsuarioSesion = {
  nombres: string;
  apellidos: string;
  rol: string;
  usuario: string;
};

type AccesoRapido = {
  label: string;
  to: string;
};

type KpiItem = {
  key: string;
  label: string;
  value: number;
};

type AccionPendiente = {
  key: string;
  label: string;
  count: number;
};

type DashboardResumen = {
  kpis: KpiItem[];
  accionesPendientes: AccionPendiente[];
};

async function cargarSeguro<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

function getUsuarioSesion(): UsuarioSesion | null {
  try {
    const raw = localStorage.getItem("usuario");
    if (!raw) return null;
    return JSON.parse(raw) as UsuarioSesion;
  } catch {
    return null;
  }
}

function getSubtitulo(rol: string): string {
  switch (rol) {
    case "ADMIN":
      return "Administra usuarios, equipos, solicitudes y asignaciones del sistema.";
    case "TI":
      return "Gestiona el inventario, las solicitudes y las asignaciones de equipos.";
    case "RRHH":
      return "Crea y da seguimiento a las solicitudes de equipos para colaboradores.";
    case "EMPLEADO":
      return "Consulta los equipos tecnológicos que tienes asignados.";
    default:
      return "Bienvenido al sistema de inventario TI.";
  }
}

function getAccesosRapidos(rol: string): AccesoRapido[] {
  const accesos: AccesoRapido[] = [];

  const puedeVerMisEquipos =
    rol === "ADMIN" ||
    rol === "TI" ||
    rol === "RRHH" ||
    rol === "EMPLEADO";

  const puedeVerSolicitudes =
    rol === "ADMIN" || rol === "TI" || rol === "RRHH";

  if (puedeVerMisEquipos) {
    accesos.push({ label: "Mis equipos", to: "/mis-equipos" });
  }

  if (puedeVerSolicitudes) {
    accesos.push({ label: "Solicitudes", to: "/solicitudes" });
    accesos.push({ label: "Historial", to: "/historial-solicitudes" });
  }

  if (rol === "ADMIN" || rol === "TI") {
    accesos.push({ label: "Asignaciones", to: "/asignaciones" });
    accesos.push({ label: "Usuarios", to: "/usuarios" });
    accesos.push({ label: "Inventario de equipos", to: "/equipos" });
  }

  return accesos;
}

async function cargarResumen(rol: string): Promise<DashboardResumen> {
  const kpis: KpiItem[] = [];
  const accionesPendientes: AccionPendiente[] = [];

  const esTiOAdmin = rol === "ADMIN" || rol === "TI";
  const veSolicitudes =
    rol === "ADMIN" || rol === "TI" || rol === "RRHH";
  const veMisEquipos =
    rol === "ADMIN" ||
    rol === "TI" ||
    rol === "RRHH" ||
    rol === "EMPLEADO";

  const [misEquipos, solicitudes, equipos, asignaciones] = await Promise.all([
    veMisEquipos ? cargarSeguro(obtenerMisEquipos) : Promise.resolve(null),
    veSolicitudes ? cargarSeguro(obtenerSolicitudes) : Promise.resolve(null),
    esTiOAdmin ? cargarSeguro(obtenerEquipos) : Promise.resolve(null),
    esTiOAdmin ? cargarSeguro(obtenerAsignaciones) : Promise.resolve(null),
  ]);

  if (misEquipos !== null) {
    kpis.push({
      key: "mis-equipos",
      label: "Mis equipos asignados",
      value: misEquipos.length,
    });
  }

  if (solicitudes !== null) {
    const pendientes = solicitudes.filter((s) => s.estado === "PENDIENTE");

    kpis.push({
      key: "solicitudes-pendientes",
      label: "Solicitudes pendientes",
      value: pendientes.length,
    });

    if (rol === "RRHH") {
      kpis.push({
        key: "solicitudes-total",
        label: "Total de solicitudes",
        value: solicitudes.length,
      });
    }

    if (esTiOAdmin) {
      accionesPendientes.push(
        {
          key: "aprobar",
          label: "Por aprobar",
          count: pendientes.length,
        },
        {
          key: "crear-usuario",
          label: "Por crear usuario",
          count: solicitudes.filter((s) => s.estado === "APROBADA").length,
        },
        {
          key: "asignar",
          label: "Por asignar equipo",
          count: solicitudes.filter((s) => s.estado === "PROCESADA").length,
        }
      );
    }
  }

  if (equipos !== null) {
    kpis.push(
      {
        key: "equipos-disponibles",
        label: "Equipos disponibles",
        value: equipos.filter((e) => e.activo && e.estado === "DISPONIBLE")
          .length,
      },
      {
        key: "equipos-asignados",
        label: "Equipos asignados",
        value: equipos.filter((e) => e.activo && e.estado === "ASIGNADO").length,
      }
    );
  }

  if (asignaciones !== null) {
    kpis.push({
      key: "asignaciones-activas",
      label: "Asignaciones activas",
      value: asignaciones.filter((a) => a.estado === "ACTIVA").length,
    });
  }

  return { kpis, accionesPendientes };
}

function HomeKpiSkeleton() {
  return (
    <div className="home-kpi-grid">
      {[1, 2, 3, 4].map((n) => (
        <Skeleton
          key={n}
          variant="rounded"
          height={88}
          className="home-kpi-skeleton"
        />
      ))}
    </div>
  );
}

function Home() {
  const usuario = getUsuarioSesion();
  const rol = usuario?.rol ?? "";
  const accesos = getAccesosRapidos(rol);

  const [cargando, setCargando] = useState(true);
  const [resumen, setResumen] = useState<DashboardResumen>({
    kpis: [],
    accionesPendientes: [],
  });

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      setCargando(true);
      const data = await cargarResumen(rol);
      if (activo) {
        setResumen(data);
        setCargando(false);
      }
    };

    cargar();

    return () => {
      activo = false;
    };
  }, [rol]);

  const esTiOAdmin = rol === "ADMIN" || rol === "TI";

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>
          Bienvenido, {usuario?.nombres} {usuario?.apellidos}
        </h1>

        <div className="home-meta">
          {rol && <Chip label={rol} color="primary" size="small" />}
        </div>

        <p className="home-subtitle">{getSubtitulo(rol)}</p>
      </header>

      <section className="home-section home-card">
        <h2>Resumen</h2>
        {cargando ? (
          <HomeKpiSkeleton />
        ) : resumen.kpis.length === 0 ? (
          <p style={{ margin: 0, color: "#6b7280" }}>
            No hay indicadores disponibles para tu rol.
          </p>
        ) : (
          <div className="home-kpi-grid">
            {resumen.kpis.map((kpi) => (
              <article key={kpi.key} className="home-kpi">
                <p className="home-kpi-label">{kpi.label}</p>
                <p className="home-kpi-value">{kpi.value}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {esTiOAdmin && !cargando && (
        <section className="home-section home-card">
          <h2>Acciones pendientes</h2>
          <ul className="home-pending-list">
            {resumen.accionesPendientes.map((accion) => (
              <li key={accion.key} className="home-pending-item">
                <span className="home-pending-label">{accion.label}</span>
                <Chip
                  label={accion.count}
                  size="small"
                  color={accion.count > 0 ? "warning" : "default"}
                />
                <Button
                  component={Link}
                  to="/solicitudes"
                  size="small"
                  variant="outlined"
                >
                  Ir
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="home-card">
        <h2>Accesos rápidos</h2>
        <div className="home-actions">
          {accesos.map((acceso) => (
            <Button
              key={acceso.to}
              component={Link}
              to={acceso.to}
              variant="outlined"
            >
              {acceso.label}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
