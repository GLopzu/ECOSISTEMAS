import React, { useState } from 'react';
import Register from '../components/Register';
import Login from '../components/Login';
import Publish from '../components/Publish';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');

  const handleRegisterSuccess = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = (user) => {
    setUsername(user);
    setCurrentPage('publish');
  };

  return (
    <div>
      {currentPage === 'home' && (
        <div>
          <h1>Bienvenido</h1>
          <button onClick={() => setCurrentPage('register')}>Registrarse</button>
          <button onClick={() => setCurrentPage('login')}>Iniciar Sesión</button>
        </div>
      )}

      {currentPage === 'register' && (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      )}

      {currentPage === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {currentPage === 'publish' && (
        <Publish username={username} />
      )}
    </div>
  );
};

export default App;
