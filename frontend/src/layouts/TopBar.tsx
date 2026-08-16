
function TopBar() {
    const raw = localStorage.getItem("usuario");
    const usuario = raw ? JSON.parse(raw) : null;
    
    return (
      <header className="topbar">
        <div className="topbar-logo">
          Inventario TI
        </div>
  
        <div className="topbar-user">
          {usuario?.usuario}
        </div>
      </header>
    );
  }
  
  export default TopBar;