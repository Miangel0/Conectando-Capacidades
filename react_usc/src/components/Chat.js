import React, { useState } from 'react';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, type: 'text' }]);
      setInputMessage('');
    }
  };

  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { text: file.name, type: 'file' }]);
    }
  };

  return (
    <div className="chat-container">
      {/* Barra superior */}
      <div className="chat-header">
        <img src="/assets/images/logo_F.png" alt="Logo" className="chat-logo" />
        <h2 className="chat-title">Conectando Capacidades</h2>
        <div className="chat-header-icons">
          <i className="fas fa-video chat-icon"></i>
          <i className="fas fa-times chat-icon"></i>
        </div>
      </div>

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
