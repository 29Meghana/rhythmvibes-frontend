import React, { useEffect, useState } from 'react';
import '../App.css';

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/songs');
        const data = await res.json();

        const saved = localStorage.getItem('favourites');
        const favIds = saved ? JSON.parse(saved) : [];

        setFavourites(favIds);

        const favSongs = data.filter((song) => favIds.includes(song._id));
        setSongs(favSongs);
      } catch (err) {
        console.error('Error loading favourites:', err);
      }
    };

    fetchSongs();
  }, []);

  const removeFromFavourites = (id) => {
    const updated = favourites.filter((favId) => favId !== id);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    setSongs((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="home-page">
      <h2 className="section-title">Your Favourites ❤️</h2>
      <div className="song-list">
        {songs.length === 0 ? (
          <p style={{ color: '#bbb', textAlign: 'center' }}>
            No songs in your favourites yet!
          </p>
        ) : (
          songs.map((song, idx) => (
            <div key={song._id || idx} className="song-card">
              <img src={song.image} alt={song.title} className="song-image" />
              <p>{song.title}</p>
              <button
                onClick={() => removeFromFavourites(song._id)}
                className="like-button"
                title="Remove from Favourites"
              >
                💔
              </button>
              <audio
                controls
                src={song.audio}
                style={{ width: '100%', marginTop: '10px' }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavouritesPage;
