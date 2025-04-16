import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://sofia-backend-9l77.onrender.com';

export default function UploadContent({ onAdd }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
      title,
      summary,
      content,
      date: new Date().toLocaleDateString('en-GB'),
      previewImage
    };

    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        const savedPost = await res.json();
        onAdd(savedPost);
        navigate('/blog');
      } else {
        alert('Error uploading post');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Server error.');
    }
  };

  return (
    <div className="main">
      <h2>Upload New Blog Post</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Short Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your blog content here..."
        />
        <button type="submit" className="floating-add-button" style={{ marginTop: '1rem' }}>
          Post
        </button>
      </form>
    </div>
  );
}
