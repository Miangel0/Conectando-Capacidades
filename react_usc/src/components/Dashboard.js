import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';
import Burbuja_chat from './Burbuja_chat';

function Dashboard() {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  // Estado para controlar si se ha hecho clic en "Ver más"
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true); // Al hacer clic, muestra la nueva sección
  };

  return (
    <div className="dashboard-container">
      {/* Barra de navegación */}
      <header className="header">
        <img src="/assets/images/logo_F.png" alt="Logo" className="logo-img" />
        <nav className="navbar">
          <ul>
            <li><a href="#">INICIO</a></li>
            <li><a href="#">NOSOTROS</a></li>
            <li><a href="#">LENGUAJE DE SEÑAS</a></li>
            <li><a href="#">BLOG</a></li>
          </ul>
          <input className="search-bar" placeholder="Buscar..." />
        </nav>
      </header>

      {/* Cuerpo del Dashboard */}
      <div className={`dashboard-body ${showMore ? 'slide-up' : ''}`}>
        <div className="dashboard-content">
          {/* Sección inicial: CONECTANDO CAPACIDADES */}
          {!showMore && (
            <div className="main-content">
              <h2>CONECTANDO CAPACIDADES</h2>
              <p>
                Este es el contenido de la primera sección, con fondo y todo.
                {/* Puedes agregar más contenido aquí */}
              </p>
            </div>
          )}

          {/* Nueva sección: Nuestra Historia */}
          {showMore && (
            <div className="extra-content">
              <h3>NUESTRA HISTORIA</h3>
              <p>
                Conectando Capacidades es un proyecto innovador que se enfoca en el diseño y desarrollo de una aplicación web para apoyar a personas con discapacidad auditiva...
                {/* Continúa con tu contenido aquí */}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {!isChatPage && (
        <footer className="footer">
          <button className="btn-ver-mas" onClick={handleShowMore}>
            Ver más
          </button>
        </footer>
      )}

      {/* Burbuja de chat */}
      {!isChatPage && <Burbuja_chat />}
    </div>
  );
}

export default Dashboard;
