import { Outlet } from "react-router-dom";
import TopBar from "../TopBar";
import Sidebar from "../Sidebar";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="layout">
      <TopBar />

      <div className="layout-body">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;