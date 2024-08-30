// client/src/pages/ConductorPage.jsx
import ConductorForm from '../components/ConductorForm';
import ConductorDashboard from '../components/ConductorDashboard';
import { useState } from 'react';

const ConductorPage = () => {
  const [registered, setRegistered] = useState(false);

  return (
    <div>
      {!registered ? (
        <ConductorForm onRegister={() => setRegistered(true)} />
      ) : (
        <ConductorDashboard />
      )}
    </div>
  );
};

export default ConductorPage;
