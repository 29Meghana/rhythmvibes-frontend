import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
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
  const audioRef = useRef(null);

  const handleSongChange = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
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

  return (
    <Router>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <div className="page-wrapper">
                <HomePageWrapper onSongChange={handleSongChange} />
                <Footer />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/downloads"
          element={
            isLoggedIn ? (
              <>
                <DownloadsPage onSongChange={handleSongChange} />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/favourites"
          element={
            isLoggedIn ? (
              <div className="page-wrapper">
                <FavouritesPage onSongChange={handleSongChange} />
                <Footer />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/playlist"
          element={
            isLoggedIn ? (
              <>
                <PlaylistPage onSongChange={handleSongChange} />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add-music"
          element={
            isLoggedIn ? (
              <>
                <AddMusicPage />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      {/* Global Music Player */}
      {isLoggedIn && (
        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          audioRef={audioRef}
        />
      )}
    </Router>
  );
}

export default App;
