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
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 className="title">Out of Reach</h1>
              <span className="subtitle">a place where places meet my thoughts 🌿</span>
            </div>
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
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>No posts yet.</p>
              ) : (
                posts.map((post, idx) => (
                  <Link
                    to={`/post/${idx}`}
                    key={idx}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <h2 style={{ fontSize: '1.6rem', color: '#065f46' }}>{post.title}</h2>
                      {post.date && (
                        <p style={{ fontStyle: 'italic', color: '#6b7280', marginTop: '0.3rem' }}>
                          Posted on {post.date}
                        </p>
                      )}
                      {post.previewImage && (
                        <img
                          src={post.previewImage}
                          alt="Preview"
                          style={{
                            width: '100%',
                            maxHeight: '220px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginTop: '1rem',
                          }}
                        />
                      )}
                      {post.summary && (
                        <p style={{ marginTop: '1rem', color: '#444', lineHeight: '1.6' }}>
                          {post.summary}
                        </p>
                      )}
                    </div>
                  </Link>
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

      {isAdmin && (
        <Link to="/upload">
          <button className="floating-add-button">Upload Post</button>
        </Link>
      )}

      <FloatingNewsletter />
    </div>
  );
}

export default App;
