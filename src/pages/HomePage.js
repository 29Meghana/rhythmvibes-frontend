import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function HomePage({ searchTerm }) {
  const [songs, setSongs] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });
  const [playingIndex, setPlayingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error('Error fetching songs:', err));
  }, []);

  const toggleFavourite = (song) => {
    let updated;
    if (favourites.includes(song._id)) {
      updated = favourites.filter(id => id !== song._id);
    } else {
      updated = [...favourites, song._id];
    }
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    setDropdownOpen(null);
  };

  const addToPlaylist = (title) => {
    const current = JSON.parse(localStorage.getItem('playlist')) || [];
    const updated = [...new Set([...current, title])];
    localStorage.setItem('playlist', JSON.stringify(updated));
    alert(`${title} added to your playlist!`);
    setDropdownOpen(null);
  };

  const togglePlay = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      setCurrentSong(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      audio.play();
      setPlayingIndex(index);
      setCurrentSong(songs[index]);
    }
  };

  const toggleMute = (index) => {
    const audio = audioRefs.current[index];
    if (audio) audio.muted = !audio.muted;
  };

  return (
    <>
      <div className="home-page">
        <h2 className="section-title">All Songs</h2>

        <div className="song-list">
          {songs
            .filter(song =>
              song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.artist.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((song, idx) => (
              <div
                key={song._id}
                className={`song-card ${favourites.includes(song._id) ? 'liked' : ''}`}
              >
                <img src={song.image} alt={song.title} className="song-image" />
                <p>{song.title}</p>

                <audio
                  ref={(el) => (audioRefs.current[idx] = el)}
                  src={song.audio}
                />

                <div className="custom-controls">
                  <button onClick={() => togglePlay(idx)} title="Play/Pause">
                    {playingIndex === idx ? '⏸' : '▶️'}
                  </button>

                  <button onClick={() => toggleMute(idx)} title="Mute/Unmute">
                    {audioRefs.current[idx]?.muted ? '🔇' : '🔊'}
                  </button>

                  <div className="menu-wrapper">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === idx ? null : idx)}
                      title="Options"
                      className="menu-button"
                    >
                      ⋮
                    </button>

                    {dropdownOpen === idx && (
                      <div className="dropdown-menu">
                        <button onClick={() => toggleFavourite(song)}>❤️ Favourite</button>
                        <button
                          onClick={() => {
                              // trigger actual browser download
                              const link = document.createElement('a');
                              link.href = song.audio;
                              link.download = song.audio.split('/').pop(); // filename
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);

                              // track the download in localStorage
                              const downloaded = JSON.parse(localStorage.getItem('downloads')) || [];
                              const updated = [...new Set([...downloaded, song._id])];
                              localStorage.setItem('downloads', JSON.stringify(updated));
                                }}>
                              ⬇️ Download
                            </button>


                        <button onClick={() => addToPlaylist(song.title)}>➕ Add to Playlist</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {currentSong && (
        <div className="now-playing-bar">
          <img
            className="now-playing-thumb"
            src={currentSong.image}
            alt={currentSong.title}
          />
          <div className="now-playing-info">
            <strong>{currentSong.title}</strong>
            <small>{currentSong.artist}</small>
          </div>
          <div className="player-controls">
            <button onClick={() => togglePlay(playingIndex)} title="Play/Pause">
              {playingIndex !== null ? '⏸' : '▶️'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
