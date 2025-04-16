import React, { useState } from 'react';
import baliImg from './images/bali.webp';

const BASE_URL = 'http://localhost:4000'; // promeni ako deployuješ

function HomePage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('Successfully subscribed! 💌');
        setEmail('');
      } else {
        setMessage('Error while subscribing. Try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setMessage('Server error. Try again later.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '4rem auto',
        padding: '3rem 2rem',
        backgroundColor: '#fffef8',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Playfair Display', serif",
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          color: '#065f46',
          marginBottom: '1.5rem',
        }}
      >
        Welcome to Sofia’s Life 🌴
      </h1>

      <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Follow Sofia’s journey as she explores the beauty, food, people, and daily adventures on the island of Bali.
      </p>

      <div
        style={{
          overflow: 'hidden',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <img
          src={baliImg}
          alt="Bali"
          style={{
            width: '100%',
            height: 'auto',
            transition: 'transform 0.6s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      <p
        style={{
          marginTop: '2rem',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          color: '#374151',
        }}
      >
        “Collect moments, not things.” ✨
      </p>

      <p style={{ marginTop: '1.5rem', color: '#444', fontSize: '1rem' }}>
        Click on the <strong>Blog</strong> tab to read posts and see photos from Sofia’s travels.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #ddd' }} />

      {message && (
        <p style={{ marginTop: '0.8rem', color: '#444', fontWeight: '500' }}>{message}</p>
      )}
    </div>
  );
}

export default HomePage;
