// client/src/components/ConductorDashboard.jsx
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const ConductorDashboard = () => {
  const socket = useSocket();
  const [active, setActive] = useState(false);
  const [rideRequest, setRideRequest] = useState(null);

  useEffect(() => {
    socket.on('ride-request', (data) => {
      setRideRequest(data);
    });
  }, [socket]);

  const handleToggle = () => {
    setActive((prev) => !prev);
    socket.emit('toggle-conductor-status', !active);
  };

  const handleAcceptRide = () => {
    socket.emit('accept-ride', rideRequest);
    setRideRequest(null);
  };

  return (
    <div>
      <h2>Conductor Dashboard</h2>
      <label>
        Activo:
        <input type="checkbox" checked={active} onChange={handleToggle} />
      </label>
      {rideRequest && (
        <div>
          <h3>Solicitud de Viaje</h3>
          <p>Pasajero: {rideRequest.name}</p>
          <p>Origen: {rideRequest.origin}</p>
          <p>Destino: {rideRequest.destination}</p>
          <button onClick={handleAcceptRide}>Iniciar Viaje</button>
        </div>
      )}
    </div>
  );
};

export default ConductorDashboard;
