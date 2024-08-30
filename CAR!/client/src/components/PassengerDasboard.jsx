// client/src/components/PassengerDashboard.jsx
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const PassengerDashboard = () => {
  const socket = useSocket();
  const [conductors, setConductors] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    // Escuchar los conductores actualizados desde el servidor y filtrar los que están activos
    socket.on('update-conductors', (data) => {
      setConductors(data.filter((c) => c.active));
    });

    // Limpiar el listener al desmontar el componente
    return () => {
      socket.off('update-conductors');
    };
  }, [socket]);

  // Manejar la solicitud de viaje al conductor seleccionado
  const handleRequestRide = (conductor) => {
    socket.emit('request-ride', { 
      name: conductor.name, 
      vehicle: conductor.vehicle, 
      origin, 
      destination 
    });
  };

  return (
    <div>
      <h2>Pasajero Dashboard</h2>
      <input
        type="text"
        placeholder="Origen"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <h3>Conductores Disponibles</h3>
      {conductors.length > 0 ? (
        conductors.map((conductor) => (
          <div key={conductor.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Nombre:</strong> {conductor.name}</p>
            <p><strong>Placa:</strong> {conductor.vehicle.plate}</p>
            <p><strong>Modelo:</strong> {conductor.vehicle.model}</p>
            <p><strong>Color:</strong> {conductor.vehicle.color}</p>
            <button onClick={() => handleRequestRide(conductor)}>
              Solicitar Viaje
            </button>
          </div>
        ))
      ) : (
        <p>No hay conductores disponibles</p>
      )}
    </div>
  );
};

export default PassengerDashboard;
