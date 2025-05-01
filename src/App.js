import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>

        {/* Login Page - Default Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Home Page after login */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <HomePage />
              <MusicPlayer />
              <Footer />
            </>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
