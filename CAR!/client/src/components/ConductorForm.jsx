// client/src/components/ConductorForm.jsx
import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

const ConductorForm = ({ onRegister }) => {
  const socket = useSocket();
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState({ plate: '', model: '', color: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('register-conductor', { name, vehicle });
    onRegister();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Conductor</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Placa"
        value={vehicle.plate}
        onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })}
      />
      <input
        type="text"
        placeholder="Modelo"
        value={vehicle.model}
        onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
      />
      <input
        type="text"
        placeholder="Color"
        value={vehicle.color}
        onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default ConductorForm;
