// client/src/components/PassengerForm.jsx
import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

const PassengerForm = ({ onRegister }) => {
  const socket = useSocket();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('register-passenger', { name });
    onRegister();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Pasajero</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default PassengerForm;
