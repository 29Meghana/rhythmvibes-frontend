import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function PlaylistPage() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const audioRefs = useRef([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => {
        const playlistIds = JSON.parse(localStorage.getItem('playlist')) || [];
        const favIds = JSON.parse(localStorage.getItem('favourites')) || [];

        const playlist = data.filter(song => playlistIds.includes(song._id));
        setPlaylistSongs(playlist);
        setFavourites(favIds);
      })
      .catch(err => console.error("Error fetching songs:", err));
  }, []);

  const togglePlay = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      audio.play();
      setPlayingIndex(index);
    }
  };

  const toggleMute = (index) => {
    const audio = audioRefs.current[index];
    if (audio) audio.muted = !audio.muted;
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(prev => (prev === index ? null : index));
  };

  const handleRemoveFromPlaylist = (id) => {
    const playlistIds = JSON.parse(localStorage.getItem('playlist')) || [];
    const updatedIds = playlistIds.filter(songId => songId !== id);
    localStorage.setItem('playlist', JSON.stringify(updatedIds));
    setPlaylistSongs(prev => prev.filter(song => song._id !== id));
    setDropdownOpen(null);
  };

  const handleDownload = (id) => {
    const downloaded = JSON.parse(localStorage.getItem('downloads')) || [];
    if (!downloaded.includes(id)) {
      downloaded.push(id);
      localStorage.setItem('downloads', JSON.stringify(downloaded));
    }
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

  return (
    <div className="downloads-page" style={{ padding: '50px 20px', minHeight: '100vh' }}>
      <h2 className="section-title">Your Playlist</h2>

      <div className="song-list">
        {playlistSongs.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center' }}>Your playlist is empty.</p>
        ) : (
          playlistSongs.map((song, idx) => (
            <div key={song._id || idx} className="song-card">
              <img src={song.image} alt={song.title} className="song-image" />
              <p>{song.title}</p>

              <audio ref={(el) => (audioRefs.current[idx] = el)} src={song.audio} />

              <div className="custom-controls">
                <button onClick={() => togglePlay(idx)} title="Play/Pause">
                  {playingIndex === idx ? '⏸' : '▶️'}
                </button>

                <button onClick={() => toggleMute(idx)} title="Mute/Unmute">
                  {audioRefs.current[idx]?.muted ? '🔇' : '🔊'}
                </button>

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
                      <button onClick={() => handleDownload(song._id)}>⬇️ Download</button>
                      <button onClick={() => handleRemoveFromPlaylist(song._id)}>🗑️ Remove</button>
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

export default PlaylistPage;
