import React, { useState } from 'react';
import HomePage from './HomePage';

function HomePageWrapper({ onSongChange, onListReady, currentSong }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <HomePage
      searchTerm={searchTerm}
      onSongSelect={onSongChange}
      onListReady={onListReady}
      currentSong={currentSong}
    />
  );
}

export default HomePageWrapper;
