import React from 'react';
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

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <div className="page-wrapper">
                <HomePageWrapper />
                <MusicPlayer />
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
                <Header />
                <DownloadsPage />
                <MusicPlayer />
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
                <Header />
                <FavouritesPage />
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
                <Header />
                <PlaylistPage />
                <MusicPlayer />
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
                <Header />
                <AddMusicPage />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
