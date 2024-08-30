// client/src/pages/PassengerPage.jsx
import PassengerForm from '../components/PassengerForm';
import PassengerDashboard from '../components/PassengerDasboard';
import { useState } from 'react';

const PassengerPage = () => {
  const [registered, setRegistered] = useState(false);

  return (
    <div>
      {!registered ? (
        <PassengerForm onRegister={() => setRegistered(true)} />
      ) : (
        <PassengerDashboard />
      )}
    </div>
  );
};

export default PassengerPage;
