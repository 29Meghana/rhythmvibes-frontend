// src/pages/AddMusicPage.js
import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function AddMusicPage() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    image: '',
    audio: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.audio) {
      alert('Song title and audio path are required!');
      return;
    }

    const payload = {
      ...formData,
      image: formData.image || '/images/default.jpg' // Set default image
    };

    try {
      await axios.post('http://localhost:5000/api/songs', payload);
      alert('Song added successfully!');
      setFormData({
        title: '',
        artist: '',
        genre: '',
        image: '',
        audio: ''
      });
    } catch (err) {
      alert('Failed to add song.');
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Add New Song 🎵</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Song Title *"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="audio"
            placeholder="/songs/filename.mp3 *"
            value={formData.audio}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="/images/filename.jpg (optional)"
            value={formData.image}
            onChange={handleChange}
          />
          <button type="submit">Add Song</button>
        </form>
      </div>
    </div>
  );
}

export default AddMusicPage;
