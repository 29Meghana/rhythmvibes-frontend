import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import PremiumPage from './pages/PremiumPage'; // ✅ NEW
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [songList, setSongList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(null);

  const handleSongChange = (song, index = -1) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (index !== -1) setCurrentIndex(index);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 100);
  };

  const handleNext = useCallback(() => {
    if (songList.length === 0) return;

    let nextIndex;
    if (isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songList.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = (currentIndex + 1) % songList.length;
    }

    handleSongChange(songList[nextIndex], nextIndex);
  }, [songList, isShuffle, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.volume = volume;

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, isRepeat, handleNext, volume]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (songList.length === 0) return;
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    handleSongChange(songList[prevIndex], prevIndex);
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

      <div className="main-content-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={isLoggedIn ? <HomePageWrapper onSongChange={handleSongChange} onListReady={setSongList} currentSong={currentSong} /> : <Navigate to="/" />} />
          <Route path="/downloads" element={isLoggedIn ? <DownloadsPage onSongChange={handleSongChange} /> : <Navigate to="/" />} />
          <Route path="/favourites" element={isLoggedIn ? <FavouritesPage onSongChange={handleSongChange} /> : <Navigate to="/" />} />
          <Route path="/playlist" element={isLoggedIn ? <PlaylistPage onSongChange={handleSongChange} /> : <Navigate to="/" />} />
          <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" />} />
          <Route path="/premium" element={isLoggedIn ? <PremiumPage /> : <Navigate to="/" />} /> {/* ✅ New Premium Route */}
        </Routes>
      </div>

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
              <button title="Shuffle" onClick={() => setIsShuffle(!isShuffle)}>
                <i className={`fas fa-random ${isShuffle ? 'active-icon' : ''}`}></i>
              </button>
              <button title="Previous" onClick={handlePrevious}>
                <i className="fas fa-step-backward"></i>
              </button>
              <button title="Play/Pause" onClick={handlePlayPause}>
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button title="Next" onClick={handleNext}>
                <i className="fas fa-step-forward"></i>
              </button>
              <button title="Repeat" onClick={() => setIsRepeat(!isRepeat)}>
                <i className={`fas fa-redo ${isRepeat ? 'active-icon' : ''}`}></i>
              </button>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-volume-up"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ width: '80px' }}
              />
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
