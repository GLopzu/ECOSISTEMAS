import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post('http://localhost:4000/register', { email, username, password });
      alert('Usuario registrado correctamente');
      onRegisterSuccess();
    } catch (error) {
      console.error(error);
      alert('Error al registrarse');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Registrarse</button>
    </div>
  );
};

export default Register;
