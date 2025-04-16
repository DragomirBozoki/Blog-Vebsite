import React, { useState } from 'react';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'sofiarusu' && password === 'sofiabozoki2001') {
      onLoginSuccess();
    } else {
      alert('Incorrect credentials!');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              marginBottom: '1.5rem',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

  