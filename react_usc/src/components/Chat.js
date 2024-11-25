import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const navigate = useNavigate(); // Inicializa navigate
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [videoVisible, setVideoVisible] = useState(false); // Inicia con video oculto
  const [videoStarted, setVideoStarted] = useState(false); // Controla si el video ha sido iniciado
  const videoRef = useRef(null); // Referencia al elemento video
  const streamRef = useRef(null); // Referencia al stream de la cámara

  // Función para solicitar acceso a la cámara solo cuando el video se hace visible
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,  // Solo video, si quieres también audio pon { video: true, audio: true }
      });

      // Asignar el stream de video al elemento <video>
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream; // Guardar el stream para poder detenerlo después
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  // Función para detener el video cuando el usuario lo cierre
  const stopVideo = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop()); // Detener todas las pistas del stream
    }
    streamRef.current = null; // Limpiar la referencia del stream
  };

  // Cuando videoVisible cambia, controlamos la solicitud de la cámara
  useEffect(() => {
    if (videoVisible && !videoStarted) {
      startVideo(); // Iniciar video cuando se hace visible
      setVideoStarted(true); // Marcar que el video ha comenzado
    } else if (!videoVisible && videoStarted) {
      stopVideo(); // Detener video cuando se oculta
      setVideoStarted(false); // Marcar que el video ha terminado
    }
  }, [videoVisible, videoStarted]); // Solo ejecutar cuando videoVisible cambie

  // Maneja el cambio en el input de texto
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // Función para enviar mensaje
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, type: 'text' }]);
      setInputMessage('');
    }
  };

  // Función para manejar el evento de presionar "Enter"
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      e.preventDefault(); // Prevenir que el input se envíe como un formulario (si está dentro de un formulario)
      handleSendMessage(); // Llamar a la función para enviar el mensaje
    }
  };

  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { text: file.name, type: 'file' }]);
    }
  };

  // Función para cerrar el chat y redirigir al Dashboard
  const handleCloseChat = () => {
    navigate('/dashboard'); // Redirige a /dashboard
  };

  // Función para cerrar el video
  const handleCloseVideo = () => {
    setVideoVisible(false); // Ocultar el video cuando el usuario haga clic en la "X"
  };

  // Función para abrir el video
  const handleOpenVideo = () => {
    setVideoVisible(true); // Mostrar el video cuando se haga clic en el ícono de la cámara
  };

  return (
    <div className="chat-container">
      {/* Barra superior */}
      <div className="chat-header">
        <img src="/assets/images/logo_F.png" alt="Logo" className="chat-logo" />
        <h2 className="chat-title">Conectando Capacidades</h2>
        <div className="chat-header-icons">
          {/* Ícono de la cámara que abre el video */}
          <i className="fas fa-video chat-icon" onClick={handleOpenVideo}></i>

          {/* Ícono de cerrar el chat */}
          <i className="fas fa-times chat-icon" onClick={handleCloseChat}></i>
        </div>
      </div>

      {/* Contenedor de la cámara con la "X" para cerrar */}
      {videoVisible && (
        <div className="video-container">
          <video ref={videoRef} autoPlay muted className="video-element" />
          <button className="video-close-btn" onClick={handleCloseVideo}>X</button>
        </div>
      )}

      {/* Espacio para los mensajes */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.type === 'text' ? (
              <p>{msg.text}</p>
            ) : (
              <span>{msg.text} (Archivo adjunto)</span>
            )}
          </div>
        ))}
      </div>

      {/* Barra inferior para enviar mensajes */}
      <div className="chat-footer">
        <label htmlFor="file-upload" className="file-upload">
          <i className="fas fa-paperclip"></i>
          <input
            id="file-upload"
            type="file"
            onChange={handleAttachFile}
            style={{ display: 'none' }}
          />
        </label>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Escuchar la tecla Enter
          className="chat-input"
        />
        <button className="chat-send" onClick={handleSendMessage}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default Chat;
