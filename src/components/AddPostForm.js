import React, { useState } from 'react';

function AddPostForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      image: imagePreview || null,
    };

    onAdd(newPost);

    setTitle('');
    setContent('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Descriptiom"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '100%', maxWidth: '300px', marginTop: '1rem' }}
        />
      )}
      <br />
      <button type="submit">Objavi post</button>
    </form>
  );
}

export default AddPostForm;
