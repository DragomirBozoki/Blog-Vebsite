import React from 'react';
import { useParams, Link } from 'react-router-dom';

function PostPage({ posts }) {
  const { id } = useParams();
  const post = posts[parseInt(id)];

  if (!post) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>Post not found</h2>
        <Link to="/blog" style={backLinkStyle}>← Back to blog</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <Link to="/blog" style={backLinkStyle}>← Back to blog</Link>
      <h1 style={{ marginTop: '1.5rem', fontSize: '2rem', color: '#065f46' }}>{post.title}</h1>
      {post.date && (
        <p style={{ fontStyle: 'italic', color: '#6b7280', marginTop: '0.5rem' }}>
          Posted on {post.date}
        </p>
      )}
      <div
        style={{
          marginTop: '2rem',
          lineHeight: '1.8',
          fontSize: '1.1rem',
          color: '#333',
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

const backLinkStyle = {
  textDecoration: 'none',
  color: '#10b981',
  fontWeight: 'bold',
  fontSize: '0.95rem',
  background: '#ecfdf5',
  padding: '0.4rem 0.8rem',
  borderRadius: '6px',
  display: 'inline-block'
};

export default PostPage;
