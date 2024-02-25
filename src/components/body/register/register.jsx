import React, { useState } from 'react';

function Register() {
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5173/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identificador, contrasena })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
      } else {
        console.error('Error al registrar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
