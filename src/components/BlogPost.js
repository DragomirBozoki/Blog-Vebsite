import React from 'react';

function BlogPost({ post, onDelete, onEdit, isAdmin }) {
  if (!post) return null;

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', marginTop: '1rem' }}>
      <h2>{post.title}</h2>

      {post.date && (
        <p style={{ fontStyle: 'italic', color: 'gray', marginTop: '-0.5rem' }}>
          Posted on {post.date}
        </p>
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          style={{ width: '100%', maxWidth: '300px', marginTop: '1rem' }}
        />
      )}

      {isAdmin && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete} style={{ marginLeft: '1rem' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogPost;



