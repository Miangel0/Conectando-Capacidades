import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [imageSrc, setImageSrc] = useState('/assets/images/login_a.jpg'); // Ruta desde public

  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  // Función para manejar el cambio de imagen
  const handleMouseEnter = () => {
    setImageSrc('/assets/images/login_b.jpg'); // Imagen cuando el cursor entra
  };

  const handleMouseLeave = () => {
    setImageSrc('/assets/images/login_a.jpg'); // Imagen original
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    const emailRegex = /^[a-zA-Z0-9._%+-]+@usc\.edu\.co$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un correo válido con el dominio @usc.edu.co.');
      return;
    }

    if (password !== '12345') {
      setError('La contraseña es incorrecta.');
      return;
    }

    // Si la validación es exitosa, redirigir al Dashboard
    setError(''); // Limpiar el mensaje de error
    navigate('/dashboard');  // Redirecciona a la página del Dashboard
  };

  return (
    <div className="login-container">
      {/* Sección izquierda (imagen y título) */}
      <div className="left-side"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
        <h1 className="app-title">CONECTANDO CAPACIDADES</h1>
        <img src={imageSrc} alt="Login background" className="login-image" />
      </div>

      {/* Sección derecha (formulario de login) */}
      <div className="right-side">
        <div className="login-form-container">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
