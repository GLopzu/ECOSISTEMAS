import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error al obtener publicaciones', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Cliente Post</h1>
      <h2>Publicaciones:</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>{post.username}</strong>
            <h3>{post.title}</h3>
            <p>{post.message}</p>
            {post.image && (
              <div>
                <img
                  src={`http://localhost:4000/${post.image}`}
                  alt={post.title}
                  width="200"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
