import React, { useEffect, useState } from 'react';
import '../App.css';

function DownloadsPage({ onSongChange }) {
  const [songs, setSongs] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => {
        const downloadedIds = JSON.parse(localStorage.getItem('downloads')) || [];
        const favIds = JSON.parse(localStorage.getItem('favourites')) || [];

        const downloadedSongs = data.filter(song => downloadedIds.includes(song._id));
        setSongs(downloadedSongs);
        setFavourites(favIds);
      })
      .catch(err => console.error("Error fetching songs:", err));
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => (prev === index ? null : index));
  };

  const handleDeleteDownload = (id) => {
    const downloadedIds = JSON.parse(localStorage.getItem('downloads')) || [];
    const updatedIds = downloadedIds.filter(songId => songId !== id);
    localStorage.setItem('downloads', JSON.stringify(updatedIds));
    setSongs(prev => prev.filter(song => song._id !== id));
    setDropdownOpen(null);
  };

  const handleFavourite = (id) => {
    let updated;
    if (favourites.includes(id)) {
      updated = favourites.filter(favId => favId !== id);
    } else {
      updated = [...favourites, id];
    }
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const handleAddToPlaylist = (id) => {
    const current = JSON.parse(localStorage.getItem('playlist')) || [];
    const updated = [...new Set([...current, id])];
    localStorage.setItem('playlist', JSON.stringify(updated));
    alert('Added to Playlist!');
    setDropdownOpen(null);
  };

  return (
    <div className="downloads-page" style={{ padding: '50px 20px', minHeight: '100vh' }}>
      <h2 className="section-title">Available Downloads</h2>

      <div className="song-list">
        {songs.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center' }}>No downloaded songs yet.</p>
        ) : (
          songs.map((song, idx) => (
            <div key={song._id || idx} className="song-card">
              <img src={song.image} alt={song.title} className="song-image" />
              <p>{song.title}</p>

              <div className="custom-controls">
                <button onClick={() => onSongChange(song, idx)} title="Play/Pause">▶️</button>

                <button
                  onClick={() => handleFavourite(song._id)}
                  className="like-button"
                  title="Favourite"
                >
                  {favourites.includes(song._id) ? '❤️' : '🤍'}
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
                      <button onClick={() => handleAddToPlaylist(song._id)}>➕ Add to Playlist</button>
                      <button onClick={() => handleDeleteDownload(song._id)}>🗑️ Delete</button>
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

export default DownloadsPage;
