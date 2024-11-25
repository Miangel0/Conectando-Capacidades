import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';  // Asegúrate de que la ruta sea correcta
import Dashboard from './components/Dashboard'; // Importa tu Dashboard
import Chat from './components/Chat';  // Importa el Chat

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Ruta para el Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Ruta para el Chat */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
