import React, { useState } from 'react';

function Login() {
  // Estados para almacenar los datos del formulario
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    try {
      // Enviar los datos del formulario al servidor para el inicio de sesión
      const response = await fetch('http://localhost:3001/inicio-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identificador, contrasena })
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identificador">Identificador único:</label>
          <input
            type="text"
            id="identificador"
            value={identificador}
            onChange={(event) => setIdentificador(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
