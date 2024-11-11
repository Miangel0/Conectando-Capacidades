
import React from 'react';
import './Dashboard.css'; 
function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          {/* Aquí puedes agregar el logo de la aplicación */}
          <img src="./assets/images/logo.png" alt="Logo" className="logo-img" />
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="/">INICIO</a></li>
            <li><a href="/nosotros">NOSOTROS</a></li>
            <li><a href="/lenguaje-de-senas">LENGUAJE DE SEÑAS</a></li>
            <li><a href="/blog">BLOG</a></li>
            <li>
              <div className="search-bar">
                <input type="text" placeholder="Buscar..." />
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {/* Cuerpo del dashboard */}
      <div className="dashboard-body">
        <div className="content">
          <h2>Bienvenido al Dashboard</h2>
          <p>Este es el área principal de la aplicación, donde podrás acceder a más información.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <button className="btn-ver-mas">Ver más</button>
      </footer>
    </div>
  );
}

export default Dashboard;
