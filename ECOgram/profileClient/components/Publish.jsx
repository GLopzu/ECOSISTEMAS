import React, { useState } from 'react';
import axios from 'axios';

const Publish = ({ username }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const publishPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('username', username); // Usa el nombre de usuario proporcionado
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Publicación creada:', response.data);
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  return (
    <div>
      <h2>Crear una publicación</h2>
      <form onSubmit={publishPost}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default Publish;
