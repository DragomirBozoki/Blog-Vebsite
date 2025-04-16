import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import UploadContent from './pages/UploadContent';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from './components/LoadingSpinner';
import FloatingNewsletter from './components/FloatingNewsletter';

const BASE_URL = 'https://sofia-backend-9l77.onrender.com';

function App() {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error loading posts:', err));
  }, []);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (index) => {
    fetch(`${BASE_URL}/posts/${index}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updated = [...posts];
        updated.splice(index, 1);
        setPosts(updated);
      })
      .catch((err) => console.error('Failed to delete post:', err));
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    navigate('/blog');
  };

  return (
    <div className="app-container">
      <header className="custom-header">
        <div className="header-left">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className="title">Out of Reach</h1>
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/blog" className="nav-button">Blog</Link>
          <Link to="/about" className="nav-button">About</Link>
          <Link to="/contact" className="nav-button">Contact</Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog"
          element={
            <main className="main">
              {posts.length === 0 ? (
                <p>No posts yet.</p>
              ) : (
                posts.map((post, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      padding: '1rem',
                      margin: '1rem 0',
                      borderRadius: '8px',
                      position: 'relative',
                    }}
                  >
                    <Link to={`/post/${idx}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <h2>{post.title}</h2>
                      {post.date && (
                        <p style={{ fontStyle: 'italic', color: 'gray', marginTop: '-0.5rem' }}>
                          Posted on {post.date}
                        </p>
                      )}
                      {post.previewImage && (
                        <img
                          src={post.previewImage}
                          alt="Preview"
                          style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                      )}
                      {post.summary && <p>{post.summary}</p>}
                    </Link>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeletePost(idx)}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              )}
            </main>
          }
        />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {isAdmin && <Route path="/upload" element={<UploadContent onAdd={handleAddPost} />} />}
        <Route path="/post/:id" element={<PostPage posts={posts} />} />
      </Routes>

      {!isAdmin && window.location.pathname === '/' && <FloatingNewsletter />}

      {isAdmin && (
        <Link to="/upload">
          <button className="floating-add-button">Upload Post</button>
        </Link>
      )}
    </div>
  );
}

export default App;
