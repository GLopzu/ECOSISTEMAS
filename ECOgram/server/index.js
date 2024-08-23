const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express(); // Inicializa Express

// Configuración de middleware
app.use(express.json()); // Para manejar datos JSON
app.use(cors()); // Habilitar CORS

// Configuración de Multer para subir archivos
const upload = multer({ dest: 'uploads/' });
 // Carpeta donde se guardarán las imágenes

// Simulación de una base de datos en memoria
const posts = [];

// Ruta para registrar un usuario
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    // Aquí agregarías lógica para guardar el usuario en la base de datos
    res.status(201).send({ message: 'Usuario registrado correctamente' });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí agregarías lógica para autenticar al usuario
    res.status(200).send({ message: 'Inicio de sesión exitoso' });
});

// Ruta para crear una publicación
app.post('/create-post', upload.single('image'), (req, res) => {
    try {
        const { title, message, username } = req.body;
        
        // Verifica si el archivo se subió correctamente
        if (!req.file) {
            return res.status(400).send({ error: 'No se ha subido ninguna imagen' });
        }

        const imagePath = req.file.path;

        // Validar que todos los campos están presentes
        if (!title || !message || !username) {
            return res.status(400).send({ error: 'Faltan datos requeridos (título, mensaje o nombre de usuario)' });
        }

        const newPost = { username, title, message, image: imagePath };
        posts.push(newPost);

        res.status(201).send({ message: 'Publicación creada', post: newPost });
    } catch (error) {
        console.error('Error al crear la publicación:', error); // Imprime el error en la consola del servidor
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});


// Ruta para obtener todas las publicaciones
app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

// Servir imágenes desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// Inicia el servidor
app.listen(4000, () => {
    console.log('Servidor ejecutándose en http://localhost:4000');
});
