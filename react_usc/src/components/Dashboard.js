import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Burbuja_chat from './Burbuja_chat';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname === '/chat';

  // Estado para manejar el cambio de sección
  const [activeSection, setActiveSection] = useState('conectando-capacidades'); 
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú hamburguesa

  // Función para manejar el cambio de sección
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMenuOpen(false); // Cierra el menú después de seleccionar una opción
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    navigate('/'); // Redirige al login
  };

  // Función para alternar la visibilidad del menú hamburguesa
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna el estado del menú hamburguesa
  };

  return (
    <div className="dashboard-container">
      {/* Barra de navegación */}
      <header className="header">
        <div className="logo-title-container">
          <img src="/assets/images/logo_F.png" alt="Logo" className="logo-img" />
          <h2 className="title">Conectando Capacidades</h2>
        </div>
        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a href="#" onClick={() => handleSectionChange('conectando-capacidades')}>
                INICIO
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSectionChange('nuestra-historia')}>
                NOSOTROS
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSectionChange('lenguaje-de-senas')}>
                LENGUAJE DE SEÑAS
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSectionChange('blog')}>
                BLOG
              </a>
            </li>
            
          </ul>
          {/* Menú hamburguesa */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <input className="search-bar" placeholder="Buscar..." />
          
          {/* Ícono de Cerrar sesión */}
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </nav>
        
        
      </header>

      {/* Cuerpo del Dashboard */}
      <div className="dashboard-body">
        <div className="dashboard-content">
          {/* Sección: CONECTANDO CAPACIDADES */}
          {activeSection === 'conectando-capacidades' && (
            <div className="main-content">
              <h2>CONECTANDO CAPACIDADES</h2>
              <p>
                Comprometidos con la inclusión y el desarrollo de nuevas tecnologías
                {/* Puedes agregar más contenido aquí */}
              </p>
            </div>
          )}

          {/* Sección: Nuestra Historia */}
          {activeSection === 'nuestra-historia' && (
            <div className="extra-content">
              <div className="history-container">
                <div className="text-section">
                  <h3>NUESTRA HISTORIA</h3>
                  <p>
                    Conectando Capacidades es un proyecto innovador que se enfoca en el diseño
                    y desarrollo de una aplicación web para apoyar a personas con discapacidad auditiva.
                    Nuestra aplicación proporciona foros de participación, informes detallados sobre actividades relevantes,
                    tutoriales de lengua de señas y otros recursos valiosos. Estamos comprometidos en mejorar la accesibilidad
                    y calidad de vida de las personas con discapacidad auditiva a través de la tecnología y la inclusión.
                  </p>
                </div>
                <div className="image-section">
                  <img 
                    src="assets/images/N_historia.png" 
                    alt="Imagen de Nuestra Historia" 
                    className="history-image" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección: Lenguaje de Señas (3 Videos de YouTube) */}
          {activeSection === 'lenguaje-de-senas' && (
            <div className="sign-language-section">
              <h3>LENGUAJE DE SEÑAS</h3>
              <div className="video-gallery">
                <div className="video-item">
                  <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/vaZLqh8CsOk" 
                    title="KathleenG Video"
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="video-item">
                  <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/s2irphDQZ4g" 
                    title="CulturaColectiva Video"
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="video-item">
                  <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/6DNm31s_9gs" 
                    title="Universidad Santiago de Cali (USC) Video"
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Sección: Blog */}
          {activeSection === 'blog' && (
            <div className="blog-section">
              <h1>Blog</h1>
              <h2>VUELVE PRONTO</h2>
              <div className="blog-container">
                <p>Una vez que se publiquen entradas, las verás aquí.</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Burbuja de chat */}
      {!isChatPage && <Burbuja_chat />}
    </div>
  );
}

export default Dashboard;
