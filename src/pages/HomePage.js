import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function HomePage({ searchTerm }) {
  const [songs, setSongs] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => {
        setSongs(data);
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(savedFavourites);
      })
      .catch(err => console.error("Failed to fetch songs:", err));
  }, []);

  const toggleFavourite = (id) => {
    let updated;
    if (favourites.includes(id)) {
      updated = favourites.filter(favId => favId !== id);
    } else {
      updated = [...favourites, id];
    }

    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

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

  const handleDownload = (id) => {
    const saved = localStorage.getItem('downloads');
    const downloaded = saved ? JSON.parse(saved) : [];

    if (!downloaded.includes(id)) {
      downloaded.push(id);
      localStorage.setItem('downloads', JSON.stringify(downloaded));
    }
    setDropdownOpen(null);
  };

  const handleAddToPlaylist = (id) => {
    const saved = localStorage.getItem('playlist');
    const playlist = saved ? JSON.parse(saved) : [];

    if (!playlist.includes(id)) {
      playlist.push(id);
      localStorage.setItem('playlist', JSON.stringify(playlist));
    }
    setDropdownOpen(null);
  };

  return (
    <div className="home-page">
     

      <div className="song-list">
        {songs
          .filter(song =>
            !searchTerm ||
            song.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((song, index) => (
            <div key={song._id} className="song-card">
              <img src={song.image} alt={song.title} className="song-image" />
              <p>{song.title}</p>

              <audio ref={(el) => (audioRefs.current[index] = el)} src={song.audio} />

              <div className="custom-controls">
                <button onClick={() => togglePlay(index)}>{playingIndex === index ? '⏸' : '▶️'}</button>
                <button onClick={() => toggleMute(index)}>
                  {audioRefs.current[index]?.muted ? '🔇' : '🔊'}
                </button>
                <button onClick={() => toggleFavourite(song._id)} className="like-button" title="Favourite">
                  {favourites.includes(song._id) ? '❤️' : '🤍'}
                </button>

                <div className="menu-wrapper">
                  <button onClick={() => toggleDropdown(index)} title="Options" className="menu-button">
                    ⋮
                  </button>
                  {dropdownOpen === index && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleAddToPlaylist(song._id)}>➕ Add to Playlist</button>
                      <button onClick={() => handleDownload(song._id)}>⬇️ Download</button>
                      {/* Optional delete */}
                      {/* <button onClick={() => handleDelete(song._id)}>🗑️ Delete</button> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
