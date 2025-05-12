import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ onSearch }) {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ used to detect current route

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert('You’ve been logged out.');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/home">
          <img src={logo} alt="Rhythmvibes Logo" className="logo" />
        </a>
      </div>

      <nav className="nav-tabs">
        <a href="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</a>
        <a href="/playlist" className={location.pathname === '/playlist' ? 'active' : ''}>Your Playlist</a>
        <a href="/downloads" className={location.pathname === '/downloads' ? 'active' : ''}>Downloads</a>
        <a href="/favourites" className={location.pathname === '/favourites' ? 'active' : ''}>Favourites</a>

        {/* 👇 Only show to admin */}
        {user?.email === 'admin@gmail.com' && (
          <a href="/add-music" className={location.pathname === '/add-music' ? 'active' : ''}>Add Music</a>
        )}

        {/* 👇 Always show logout if logged in */}
        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <div className="header-search">
        <input
          type="text"
          placeholder="Search your favorite track..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <button onClick={() => onSearch(search)}>Search</button>
      </div>

      {/* 👇 Welcome user */}
      {user && (
        <div style={{ color: 'white', marginLeft: '20px', fontWeight: '600' }}>
          Welcome, {user.name.split(' ')[0]}!
        </div>
      )}
    </header>
  );
}

export default Header;
