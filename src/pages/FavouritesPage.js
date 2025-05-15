import React, { useEffect, useState } from 'react';
import '../App.css';

function FavouritesPage({ onSongChange }) {
  const [favourites, setFavourites] = useState([]);
  const [songs, setSongs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/songs');
        const data = await res.json();

        const favIds = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(favIds);

        const favSongs = data.filter(song => favIds.includes(song._id));
        setSongs(favSongs);
      } catch (err) {
        console.error('Error loading favourites:', err);
      }
    };

    fetchSongs();
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(prev => (prev === index ? null : index));
  };

  const removeFromFavourites = (id) => {
    const updated = favourites.filter((favId) => favId !== id);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    setSongs(prev => prev.filter(s => s._id !== id));
  };

  const handleDownload = (audioUrl) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = audioUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const downloaded = JSON.parse(localStorage.getItem('downloads')) || [];
    const updated = [...new Set([...downloaded, audioUrl])];
    localStorage.setItem('downloads', JSON.stringify(updated));
  };

  const handleAddToPlaylist = (id) => {
    const current = JSON.parse(localStorage.getItem('playlist')) || [];
    const updated = [...new Set([...current, id])];
    localStorage.setItem('playlist', JSON.stringify(updated));
    alert('Added to Playlist!');
  };

  return (
    <div className="home-page">
      <h2 className="section-title">Your Favourites ❤️</h2>
      <div className="song-list">
        {songs.length === 0 ? (
          <p style={{ color: '#bbb', textAlign: 'center' }}>
            No songs in your favourites yet!
          </p>
        ) : (
          songs.map((song, idx) => (
            <div key={song._id || idx} className="song-card">
              <img src={song.image} alt={song.title} className="song-image" />
              <p>{song.title}</p>

              <div className="custom-controls">
                <button onClick={() => onSongChange(song, idx)} title="Play">▶️</button>

                <button
                  onClick={() => removeFromFavourites(song._id)}
                  className="like-button"
                  title="Remove from Favourites"
                >
                  💔
                </button>

                <div className="menu-wrapper">
                  <button
                    onClick={() => toggleDropdown(idx)}
                    title="Options"
                    className="menu-button"
                  >
                    ⋮
                  </button>

                  {dropdownOpen === idx && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleDownload(song.audio)}>⬇️ Download</button>
                      <button onClick={() => handleAddToPlaylist(song._id)}>➕ Add to Playlist</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavouritesPage;
