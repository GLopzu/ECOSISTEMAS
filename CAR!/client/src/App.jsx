// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import RoleSelection from './pages/RoleSelection';
import ConductorPage from './pages/ConductorPage';
import PassengerPage from './pages/PassengerPage';

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/conductor" element={<ConductorPage />} />
          <Route path="/pasajero" element={<PassengerPage />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
