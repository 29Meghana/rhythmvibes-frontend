import React, { useState } from 'react';
import Header from '../components/Header';
import HomePage from './HomePage';

function HomePageWrapper() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <HomePage searchTerm={searchTerm} />
    </>
  );
}

export default HomePageWrapper;
