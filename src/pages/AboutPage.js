import React from 'react';

function AboutPage() {
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
        About Sofia 🌺
      </h2>

      <p
        style={{
          textAlign: 'center',
          color: '#555',
          fontSize: '1.1rem',
          marginBottom: '2.5rem',
        }}
      >
        Hi! I’m Sofia — a travel enthusiast, lover of sunshine, and passionate storyteller.
      </p>

      <div style={{ lineHeight: '1.9', fontSize: '1.1rem', color: '#333' }}>
        <p style={{ marginBottom: '1.2rem' }}>
          This blog is my little corner of the internet where I share memories from my adventures,
          thoughts about life, and the little moments that make everything worthwhile.
        </p>
        <p style={{ marginBottom: '1.2rem' }}>
          Currently exploring the beautiful island of Bali, I enjoy mornings with coconut coffee, beach sunsets, and learning about local culture and people. Through this blog, I hope to inspire you to embrace life fully and maybe even pack your bags for your own adventure!
        </p>
        <p style={{ marginBottom: '1.2rem' }}>
          I believe in authenticity, connection, and capturing emotions through words and visuals.
          From city guides to personal stories, every post you see here is a piece of my journey.
        </p>
        <p
          style={{
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#065f46',
            marginTop: '2rem',
            fontWeight: '500',
          }}
        >
          Thank you for being here. Stay curious, stay kind — and enjoy the ride. 🌍✨
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
