import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, setNewPost] = useState({ name: '', title: '', body: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch posts and users from the API
  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const postsResponse = await fetch("http://localhost:3004/posts");
      const usersResponse = await fetch("http://localhost:3004/users");

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const postsData = await postsResponse.json();
      const usersData = await usersResponse.json();

      setPosts(postsData);
      setUsers(usersData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to match post userId with the user's ID from users data
  const getUsernameByUserId = (userId) => {
    const user = users.find(user => user.id === userId.toString());
    return user ? user.username : 'Unknown User';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const newCard = {
      userId: newId,
      id: newId,
      title: newPost.title,
      body: newPost.body,
      name: newPost.name || 'Unknown User'
    };

    setPosts([...posts, newCard]);
    setNewPost({ name: '', title: '', body: '' });
  };

  // Handle deleting a post
  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Render posts with usernames
  const renderData = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Failed to load data</p>;
    }

    return posts.length > 0 ? (
      posts.map(post => (
        <div key={post.id} className="card">
          <h2>
            User: {getUsernameByUserId(post.userId) !== 'Unknown User' ? getUsernameByUserId(post.userId) : post.name}
          </h2>
          <h3>Post ID: {post.id}</h3>
          <h4>Title: {post.title}</h4>
          <p>{post.body}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))
    ) : (
      <p>No data available</p>
    );
  };

  return (
    <div className="App">
      <button id="fetch-button" onClick={fetchData}>Fetch Data</button>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={newPost.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={newPost.body}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Post</button>
      </form>

      <div id="data-container">
        {renderData()}
      </div>
    </div>
  );
}

export default App;
