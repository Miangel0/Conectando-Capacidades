import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const navigate = useNavigate();
  const [videoVisible, setVideoVisible] = useState(false); // Video está inicialmente oculto

  // Función para abrir el video
  const handleOpenVideo = () => setVideoVisible(true);

  // Función para cerrar el video
  const handleCloseVideo = () => setVideoVisible(false);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/assets/images/logo_F.png" alt="Logo" className="chat-logo" />
        <h2 className="chat-title">Conectando Capacidades</h2>
        <div className="chat-header-icons">
          <i className="fas fa-video chat-icon" onClick={handleOpenVideo}></i>
          <i className="fas fa-times chat-icon" onClick={() => navigate('/dashboard')}></i>
        </div>
      </div>

      {/* Mostrar el video cuando 'videoVisible' sea verdadero */}
      {videoVisible && (
        <div className="video-container">
          <img src="http://localhost:3000/video_feed" alt="Video Feed" />
          <button className="video-close-btn" onClick={handleCloseVideo}>X</button>
        </div>
      )}

      
    </div>
  );
}

export default Chat;
