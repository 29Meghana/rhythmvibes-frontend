import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../images/logo.png';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Header({ onSearch }) {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        <Link to="/home">
          <img src={logo} alt="Rhythmvibes Logo" className="logo" />
        </Link>
      </div>

      <nav className="nav-tabs">
        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
        <Link to="/playlist" className={location.pathname === '/playlist' ? 'active' : ''}>Your Playlist</Link>
        <Link to="/downloads" className={location.pathname === '/downloads' ? 'active' : ''}>Downloads</Link>
        <Link to="/favourites" className={location.pathname === '/favourites' ? 'active' : ''}>Favourites</Link>
        {user?.email === 'admin@gmail.com' && (
          <Link to="/add-music" className={location.pathname === '/add-music' ? 'active' : ''}>Add Music</Link>
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

      {/* Welcome Message */}
      {user && (
        <div style={{ color: 'white', marginLeft: '15px', fontWeight: '600' }}>
          Welcome, {user.name.split(' ')[0]}!
        </div>
      )}

      {/* Profile Dropdown */}
      {user && (
        <div className="profile-menu">
          <button className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
            {user.name.charAt(0).toUpperCase()}
          </button>

          {showDropdown && (
            <div className="dropdown-panel">
              <Link to="/account">Account</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/premium">Upgrade to Premium</Link>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
