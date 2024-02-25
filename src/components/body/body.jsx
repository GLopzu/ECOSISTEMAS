import React, { useState } from 'react';
import Login from './login/login';
import Register from './register/register';

function Body() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? <Login /> : <Register />}
      <button onClick={handleToggleForm}>
        {showLogin ? 'Ir a Registro' : 'Ir a Inicio de Sesión'}
      </button>
    </div>
  );
}

export default Body;
