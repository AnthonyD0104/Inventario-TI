// Layout: marco de la app (topbar, sidebar y contenido)
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Sidebar from "../../components/Sidebar";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="layout">
      <TopBar />

      <div className="layout-body">
        <Sidebar />

        {/* Página activa de la ruta */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;