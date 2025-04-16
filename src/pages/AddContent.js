import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function AddContent({ onAdd }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [content, setContent] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const quillRef = useRef();
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (location.state) {
      setTitle(location.state.title || '');
      setSummary(location.state.summary || '');
      setPreviewImage(location.state.previewImage || '');
      setContent(location.state.content || '');
      const idx = location.state.index;
      if (typeof idx === 'number') {
        setEditingIndex(idx);
      }
    }
  }, [location]);

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  }), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const post = {
      title,
      summary,
      previewImage,
      content,
      date: dateStr,
    };

    if (editingIndex !== null) {
      fetch(`${BASE_URL}/posts/${editingIndex}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })
        .then(() => navigate('/'))
        .catch((err) => console.error('Failed to update post:', err));
    } else {
      fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })
        .then((res) => {
          if (res.ok) {
            onAdd(post);
            navigate('/');
          } else {
            throw new Error('Failed to publish post');
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong while publishing the post.');
        });
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{editingIndex !== null ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          placeholder="Short description (summary)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          placeholder="Paste image URL for preview"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          style={{ height: '300px', marginBottom: '2rem' }}
        />
        <button type="submit" style={{ padding: '0.7rem 1.5rem' }}>
          {editingIndex !== null ? 'Update' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

export default AddContent;
