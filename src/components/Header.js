import React, { useState } from 'react';
import '../App.css';
import logo from '../images/logo.png';

function Header({ onSearch }) {
  const [search, setSearch] = useState('');

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Rhythmvibes Logo" className="logo" />
        </a>
      </div>

      <nav className="nav-tabs">
        <a href="/home">Home</a>
        <a href="/">Your Playlist</a>
        <a href="/downloads">Downloads</a>
        <a href="/">Premium</a>
        <a href="/favourites">Favourites</a>
      </nav>

      <div className="header-search">
        <input
          type="text"
          placeholder="Search your favorite track..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value); // live filtering
          }}
        />
        <button onClick={() => onSearch(search)}>Search</button>
      </div>
    </header>
  );
}

export default Header;
