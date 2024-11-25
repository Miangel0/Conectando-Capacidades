import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Burbuja_chat.css';

const Burbuja_chat = () => {
  const [isLightBackground, setIsLightBackground] = useState(false);

  // Función para calcular el brillo de un color en formato RGB
  const getBrightness = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number); // Extraemos los valores RGB
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Fórmula para calcular el brillo
  };

  // Función para detectar si el fondo es claro u oscuro
  const checkBackgroundColor = () => {
    const bubble = document.querySelector('.floating-chat-bubble');
    if (bubble) {
      const backgroundColor = window.getComputedStyle(bubble.parentElement).backgroundColor; // Obtener el fondo del contenedor de la burbuja

      const brightness = getBrightness(backgroundColor); // Calcular el brillo

      if (brightness > 128) {
        setIsLightBackground(true);  // Si el fondo es claro, poner `light-background`
      } else {
        setIsLightBackground(false); // Si el fondo es oscuro, mantener el fondo azul
      }
    }
  };

  useEffect(() => {
    checkBackgroundColor();  // Comprobar el fondo cuando el componente se monta

    // Opcionalmente, podríamos comprobar el color periódicamente, pero en la mayoría de casos con un solo cálculo es suficiente
    const interval = setInterval(checkBackgroundColor, 500); // Recalcular cada medio segundo (opcional)

    return () => clearInterval(interval); // Limpiar intervalo cuando se desmonte el componente
  }, []);

  return (
    <Link to="/chat">
      <div className={`floating-chat-bubble ${isLightBackground ? 'light-background' : ''}`}>
        Traductor Lenguaje de Señas
      </div>
    </Link>
  );
};

export default Burbuja_chat;
