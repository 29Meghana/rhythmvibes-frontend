import React, { useState } from 'react';
import HomePage from './HomePage';

function HomePageWrapper({ onSongChange, onListReady }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <HomePage
      searchTerm={searchTerm}
      onSongSelect={onSongChange}
      onListReady={onListReady}
    />
  );
}

export default HomePageWrapper;
