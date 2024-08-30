
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === 'conductor') {
      navigate('/conductor');
    } else {
      navigate('/pasajero');
    }
  };

  return (
    <div>
      <h1>Selecciona tu rol</h1>
      <button onClick={() => handleSelectRole('conductor')}>Conductor</button>
      <button onClick={() => handleSelectRole('pasajero')}>Pasajero</button>
    </div>
  );
};

export default RoleSelection;
