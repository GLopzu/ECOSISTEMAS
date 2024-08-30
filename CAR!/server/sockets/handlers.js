
const { conductors, passengers } = require('../models/data');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Registrar Conductor
    socket.on('register-conductor', (data) => {
      const conductor = { id: socket.id, ...data, active: false };
      conductors.push(conductor);
      io.emit('update-conductors', conductors);
    });

    // Actualizar estado del Conductor
    socket.on('toggle-conductor-status', (status) => {
      const conductor = conductors.find((c) => c.id === socket.id);
      if (conductor) {
        conductor.active = status;
        io.emit('update-conductors', conductors);
      }
    });

    // Registrar Passajero
    socket.on('register-passenger', (data) => {
      const passenger = { id: socket.id, ...data };
      passengers.push(passenger);
    });

    // Solicitar Vaje
    socket.on('request-ride', (rideInfo) => {
      io.emit('ride-request', { ...rideInfo, passengerId: socket.id });
    });

    // Conductor acepta el viaje
    socket.on('accept-ride', (rideData) => {
      io.to(rideData.passengerId).emit('ride-accepted', rideData);
    });

    // Manejo de desconexión
    socket.on('disconnect', () => {
      const conductorIndex = conductors.findIndex((c) => c.id === socket.id);
      if (conductorIndex !== -1) {
        conductors.splice(conductorIndex, 1);
        io.emit('update-conductors', conductors);
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
