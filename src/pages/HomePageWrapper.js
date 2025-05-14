import React, { useState } from 'react';
import HomePage from './HomePage';

function HomePageWrapper({ onSongChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <HomePage
      searchTerm={searchTerm}
      onSongSelect={onSongChange}
    />
  );
}

export default HomePageWrapper;
