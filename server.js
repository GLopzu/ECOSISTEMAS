import express from 'express';
const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

app.post('/registro', (req, res) => {
  console.log('Solicitud POST recibida en /registro');
  console.log('Datos recibidos:', req.body);
  res.send('¡Usuario registrado exitosamente!');
});

app.post('/inicio-sesion', (req, res) => {
  console.log('Solicitud POST recibida en /inicio-sesion');
  res.send('Ruta de inicio de sesión');
});

app.get('/usuarios', (req, res) => {
  console.log('Solicitud GET recibida en /usuarios');
  res.send('Ruta de consulta de usuarios');
});

app.post('/mensajes', (req, res) => {
  console.log('Solicitud POST recibida en /mensajes');
  res.send('Ruta de dejado de mensajes');
});

app.get('/mensajes-pendientes', (req, res) => {
  console.log('Solicitud GET recibida en /mensajes-pendientes');
  res.send('Ruta de consulta de mensajes pendientes');
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
