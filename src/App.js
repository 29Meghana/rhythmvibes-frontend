import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import HomePageWrapper from './pages/HomePageWrapper';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavouritesPage from './pages/FavouritesPage';
import DownloadsPage from './pages/DownloadsPage';
import AddMusicPage from './pages/AddMusicPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PlaylistPage from './pages/PlaylistPage';



function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <div className="page-wrapper">
              <HomePageWrapper />
              <MusicPlayer />
              <Footer />
            </div>
          }
        />

        {/* Downloads Page */}
        <Route
          path="/downloads"
          element={
            <>
              <Header />
              <DownloadsPage />
              <MusicPlayer />
              <Footer />
            </>
          }
        />

        {/* Favourites Page */}
        <Route
          path="/favourites"
          element={
            <div className="page-wrapper">
              <Header />
              <FavouritesPage />
              <Footer />
            </div>
          }
        />
        {/* Playlist page */}
        <Route path="/playlist" element={<PlaylistPage />} />
        {/* Admin Page: Add New Music */}
        <Route
          path="/add-music"
          element={
            <>
              <Header />
              <AddMusicPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
