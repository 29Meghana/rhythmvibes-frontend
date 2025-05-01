import React from 'react';
import '../App.css';
import logo from '../images/logo.png'; // Importing the logo

function Header() {
  return (
    <header className="header">
      {/* Logo section */}
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Rhythmvibes Logo" className="logo" />
        </a>
      </div>

      {/* Navigation menu */}
      <nav className="nav-tabs">
        <a href="/">Home</a>
        <a href="/music">Music</a>
        <a href="/">Your Playlist</a>
        <a href="/">Library</a>
        <a href="/">Premium</a>
        <a href="/about">About</a>
      </nav>

      {/* Search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search your favorite track..." />
        <button>Search</button>
      </div>
    </header>
  );
}

export default Header;
