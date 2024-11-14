import React, { useState } from 'react';
import './Dashboard.css';
import Chat from './Chat';  // Importa el componente Chat

function Dashboard() {
  const [showChat, setShowChat] = useState(false); // Estado para mostrar/ocultar el chat

  const toggleChat = () => {
    setShowChat(!showChat); // Cambia el estado para mostrar/ocultar el chat
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src="/assets/images/logo.png" alt="Logo" className="logo-img" />
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

      <div className="dashboard-body">
        <h2>Bienvenido al Dashboard</h2>
        <p>Aquí puedes interactuar con diferentes funcionalidades.</p>
        
        {/* Mostrar el chat solo si el estado showChat es true */}
        {showChat && <Chat />}  
      </div>

      <footer className="footer">
        {/* Cambiar el texto del botón a "Abrir chat" */}
        <button onClick={toggleChat} className="btn-ver-mas">
          {showChat ? 'Cerrar chat' : 'Abrir chat'}
        </button>
      </footer>
    </div>
  );
}

export default Dashboard;
