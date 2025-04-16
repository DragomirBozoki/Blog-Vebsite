import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import UploadContent from './pages/UploadContent';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import 'react-quill/dist/quill.snow.css';
// import LoadingSpinner from './components/LoadingSpinner';
import FloatingNewsletter from './components/FloatingNewsletter';

const BASE_URL = 'https://sofia-backend-9l77.onrender.com';

function App() {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <Link to="/" style={{ textDecoration: 'none', margin: '0 auto' }}>
            <h1 className="title">Out of Reach</h1>
            <span className="subtitle">a place where places meet my thoughts 🌿</span>
          </Link>
        </div>

        <nav className={`nav-right ${menuOpen ? 'show' : ''}`}>
          <Link to="/" className="nav-button" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/blog" className="nav-button" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/about" className="nav-button" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="nav-button" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
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

      {isAdmin && (
        <Link to="/upload">
          <button className="floating-add-button">Upload Post</button>
        </Link>
      )}

      {/* Newsletter samo na homepage */}
      {location.pathname === '/' && <FloatingNewsletter />}
    </div>
  );
}

export default App;
