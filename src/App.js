import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePageWrapper from './pages/HomePageWrapper';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavouritesPage from './pages/FavouritesPage';
import DownloadsPage from './pages/DownloadsPage';
import AddMusicPage from './pages/AddMusicPage';
import PlaylistPage from './pages/PlaylistPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      console.log("🎶 Now playing:", currentSong.title);
    }
  }, [currentSong]);

  useEffect(() => {
    document.body.classList.toggle('song-playing', !!currentSong);
  }, [currentSong]);

  const handleSongChange = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 100);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Router>
      {isLoggedIn && <Header />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={isLoggedIn ? <HomePageWrapper onSongChange={handleSongChange} currentSong={currentSong} /> : <Navigate to="/" />} />
        <Route path="/downloads" element={isLoggedIn ? <DownloadsPage onSongChange={handleSongChange} /> : <Navigate to="/" />} />
        <Route path="/favourites" element={isLoggedIn ? <FavouritesPage onSongChange={handleSongChange} /> : <Navigate to="/" />} />
        <Route path="/playlist" element={isLoggedIn ? <PlaylistPage onSongChange={handleSongChange} /> : <Navigate to="/" />} />
        <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" />} />
      </Routes>

      {isLoggedIn && currentSong && (
        <div className="spotify-player-bar">
          <audio ref={audioRef} src={currentSong.audio} autoPlay />

          <div className="player-left">
            <img src={currentSong.image} alt={currentSong.title} />
            <div>
              <strong>{currentSong.title}</strong>
              <small>{currentSong.artist}</small>
            </div>
          </div>

          <div className="player-center">
            <div className="controls-and-progress">
              <button title="Shuffle"><i className="fas fa-random"></i></button>
              <button title="Previous"><i className="fas fa-step-backward"></i></button>
              <button title="Play/Pause" onClick={handlePlayPause}>
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button title="Next"><i className="fas fa-step-forward"></i></button>
              <button title="Repeat"><i className="fas fa-redo"></i></button>

              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  audioRef.current.currentTime = newTime;
                  setProgress(newTime);
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-right">
            <span><i className="fas fa-headphones"></i></span>
            <span><i className="fas fa-volume-up"></i></span>
          </div>
        </div>
      )}

      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
