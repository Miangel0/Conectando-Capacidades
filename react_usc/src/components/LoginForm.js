import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [imageSrc, setImageSrc] = useState('/assets/images/login_a.jpg');
  const [formType, setFormType] = useState('login'); // 'login', 'recuperar', 'registrar'
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [facultad, setFacultad] = useState('');
  const [carrera, setCarrera] = useState('');
  const [discapacidad, setDiscapacidad] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate(); // Redirección al dashboard

  // Función para limpiar los mensajes al cambiar de formulario
  const resetMessages = () => {
    setMessage('');
    setMessageType('');
  };

  // Función para manejar el cambio de imagen
  const handleMouseEnter = () => {
    setImageSrc('/assets/images/login_b.jpg');
  };

  const handleMouseLeave = () => {
    setImageSrc('/assets/images/login_a.jpg');
  };

  // Función para manejar el submit del login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@usc\.edu\.co$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un correo válido con el dominio @usc.edu.co.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/login', {
        correo: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/json' } // Asegúrate de enviar el contenido como JSON
      });
  
      if (response.status === 200) {
        setError('');
        // Redirigir al dashboard o cambiar el estado para indicar que el login fue exitoso
        navigate('/dashboard');
      } else {
        setError(response.data.error || 'Error al iniciar sesión.');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error de conexión al servidor.');
    }
  };

  // Función para manejar el submit de recuperar contraseña
  const handleSubmitRecuperar = (e) => {
    e.preventDefault();
    setMessage('Te hemos enviado un correo para recuperar tu contraseña');
    setMessageType('success');
  };

  // Función para manejar el submit de registro
  const handleSubmitRegistro = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/add_user', {
        nombres,
        apellidos,
        correo,
        rol,
        facultad,
        discapacidad,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' } // Encabezado correcto
      });
  
      if (response.status === 201) { // Cambia 201 si el servidor responde con 200
        setMessage('Usuario registrado con éxito');
        setMessageType('success');
        setFormType('login'); // Redirigir al login
      } else {
        setMessage(response.data.message || 'Error al registrar usuario.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error de conexión al servidor.');
      setMessageType('error');
    }
  };
  

  return (
    <div className="login-container">
      <div className="left-side"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
        <img src={imageSrc} alt="Login background" className="login-image" />
      </div>

      <div className="right-side">
        <div className="login-form-container">
          {/* Formulario de Login */}
          {formType === 'login' && (
            <>
              <div className="logo-and-title">
                <img src="assets/images/logo_F.png" alt="Logo de la app" className="app-logo" />
                <h2>Iniciar sesión</h2>
              </div>
              <form onSubmit={handleSubmitLogin} className="login-form">
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
                  <label htmlFor="password" className="password-label">
                    Contraseña
                    {error && (
                      <a 
                        href="#"
                        onClick={() => setFormType('recuperar')}
                        className="forgot-password-link"
                      >
                        Recuperar contraseña
                      </a>
                    )}
                  </label>
                  <div className="password-container">
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
                </div>
                <button type="submit">Iniciar sesión</button>
              </form>
              <div className="auth-links">
                <span>No tengo una cuenta, </span>
                <a 
                  href="#"
                  onClick={() => {
                    setFormType('registrar');
                    resetMessages(); // Limpiar los mensajes al cambiar de formulario
                  }}
                  className="register-link"
                >
                  Registrarme
                </a>
              </div>
            </>
          )}

          {/* Formulario para recuperar contraseña */}
          {formType === 'recuperar' && (
            <div className="auth-container">
              <div className="logo-and-title">
                <img src="/assets/images/logo_F.png" alt="Logo de la app" className="app-logo" />
                <h2>Recuperar contraseña</h2>
              </div>
              <form onSubmit={handleSubmitRecuperar} className="login-form">
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
                <button type="submit">Recuperar contraseña</button>
              </form>
              {message && <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>{message}</div>}
              <div className="button-back">
                <button onClick={() => {
                  setFormType('login');
                  resetMessages(); // Limpiar los mensajes al cambiar de formulario
                }}>
                  Volver al login
                </button>
              </div>
            </div>
          )}

          {/* Formulario para registrar cuenta nueva */}
          {formType === 'registrar' && (
            <div className="auth-container">
              <div className="logo-and-title">
                <img src="/assets/images/logo_F.png" alt="Logo de la app" className="app-logo" />
                <h2>Crear cuenta nueva</h2>
              </div>
              <form onSubmit={handleSubmitRegistro} className="login-form">
                <div className="two-column-form">
                  <div className="form-group">
                    <label htmlFor="nombres">Nombres</label>
                    <input
                      type="text"
                      id="nombres"
                      placeholder="Nombres"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                      type="text"
                      id="apellidos"
                      placeholder="Apellidos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="correo">Correo institucional</label>
                    <input
                      type="email"
                      id="correo"
                      placeholder="Correo institucional"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rol">Rol</label>
                    <select
                      id="rol"
                      value={rol}
                      onChange={(e) => setRol(e.target.value)}
                      required
                    >
                      <option value="">Selecciona un rol</option>
                      <option value="profesor">Profesor</option>
                      <option value="estudiante">Estudiante</option>
                    </select>
                  </div>
                  {rol === 'estudiante' && (
                    <>
                      <div className="form-group">
                        <label htmlFor="facultad">Facultad</label>
                        <input
                          type="text"
                          id="facultad"
                          placeholder="Facultad"
                          value={facultad}
                          onChange={(e) => setFacultad(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="carrera">Carrera</label>
                        <input
                          type="text"
                          id="carrera"
                          placeholder="Carrera"
                          value={carrera}
                          onChange={(e) => setCarrera(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label htmlFor="discapacidad">Discapacidad</label>
                    <select
                      id="discapacidad"
                      value={discapacidad}
                      onChange={(e) => setDiscapacidad(e.target.value)}
                      required
                    >
                      <option value="">Selecciona un tipo de discapacidad</option>
                      <option value="auditiva">Auditiva</option>
                    </select>
                  </div>
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit">Crear cuenta</button>
              </form>

              {message && (
                <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                  {message}
                </div>
              )}
              <div className="button-back">
                <button onClick={() => {
                  setFormType('login');
                  resetMessages(); // Limpiar los mensajes al cambiar de formulario
                }}>
                  Volver
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
