import React from 'react';
import HomePage from './HomePage';

function HomePageWrapper({ onSongChange }) {
  return <HomePage onSongChange={onSongChange} />;
}

export default HomePageWrapper;
