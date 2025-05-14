import React, { useState } from 'react';
import HomePage from './HomePage';

function HomePageWrapper({ onSongChange, currentSong }) {
  const [searchTerm] = useState('');

  return (
    <div className="home-wrapper">
      <HomePage
        searchTerm={searchTerm}
        onSongSelect={onSongChange}
      />

      {currentSong && (
        <div className="now-playing-panel">
          <img src={currentSong.image} alt={currentSong.title} />
          <div>
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePageWrapper;
