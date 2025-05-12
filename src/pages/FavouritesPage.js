import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/songs');
        const data = await res.json();

        const saved = localStorage.getItem('favourites');
        const favIds = saved ? JSON.parse(saved) : [];

        setFavourites(favIds);
        const favSongs = data.filter(song => favIds.includes(song._id));
        setSongs(favSongs);
      } catch (err) {
        console.error('Error loading favourites:', err);
      }
    };

    fetchSongs();
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

              <audio ref={(el) => (audioRefs.current[idx] = el)} src={song.audio} />

              <div className="custom-controls">
                <button onClick={() => togglePlay(idx)} title="Play/Pause">
                  {playingIndex === idx ? '⏸' : '▶️'}
                </button>

                <button onClick={() => toggleMute(idx)} title="Mute/Unmute">
                  {audioRefs.current[idx]?.muted ? '🔇' : '🔊'}
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

                <button
                  onClick={() => removeFromFavourites(song._id)}
                  className="like-button"
                  title="Remove from Favourites"
                >
                  💔
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavouritesPage;
