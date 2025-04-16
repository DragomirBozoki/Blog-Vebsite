import React from 'react';

function ContactPage() {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '4rem auto',
        padding: '3rem 2rem',
        backgroundColor: '#fffef8',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <h2
        style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          color: '#065f46',
          marginBottom: '1.5rem',
          fontWeight: '600',
        }}
      >
        Let's Connect ✨
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: '#555',
          fontSize: '1.1rem',
          marginBottom: '2.5rem',
        }}
      >
        Whether it’s a message, a hello, or a business idea — I’d love to hear from you 💌
      </p>
      <div style={{ textAlign: 'center', lineHeight: '2.2', fontSize: '1.15rem' }}>
        <p>
          <strong>Instagram:</strong>{' '}
          <a
            href="https://www.instagram.com/sofia_rly/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#047857', textDecoration: 'none' }}
          >
            @sofia_rly
          </a>{' '}
          💫
        </p>
        <p>
          <strong>TikTok:</strong>{' '}
          <a
            href="https://tiktok.com/@sofia_rly"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#047857', textDecoration: 'none' }}
          >
            @sofia_rly
          </a>{' '}
          🎥
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:sofiasof205@gmail.com"
            style={{ color: '#047857', textDecoration: 'none' }}
          >
            sofiasof205@gmail.com
          </a>{' '}
          ✉️
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
