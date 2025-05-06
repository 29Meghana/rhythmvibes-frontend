import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function DownloadsPage() {
  const [songs, setSongs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => {
        const saved = localStorage.getItem('downloads');
        const downloadedIds = saved ? JSON.parse(saved) : [];
        const downloadedSongs = data.filter(song => downloadedIds.includes(song._id));
        setSongs(downloadedSongs);
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
    setDropdownOpen((prev) => (prev === index ? null : index));
  };

  const handleDeleteDownload = (id) => {
    const saved = localStorage.getItem('downloads');
    const downloadedIds = saved ? JSON.parse(saved) : [];

    const updatedIds = downloadedIds.filter(songId => songId !== id);
    localStorage.setItem('downloads', JSON.stringify(updatedIds));

    setSongs(prev => prev.filter(song => song._id !== id));
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
                      <button>➕ Add to Playlist</button>
                      <button>❤️ Favourite</button>
                      <button onClick={() => handleDeleteDownload(song._id)}>🗑️ Delete </button>
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
