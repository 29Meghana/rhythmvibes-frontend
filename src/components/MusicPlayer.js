import React from 'react';
import '../App.css';
 // or MusicPlayer.css if separated

function MusicPlayer({ currentSong }) {
  if (!currentSong) return null;

  return (
    <div className="now-playing-bar">
      <img
        className="now-playing-thumb"
        src={currentSong.image || '/images/default.jpg'}
        alt={currentSong.title}
      />

      <div className="now-playing-info">
        <strong>{currentSong.title}</strong>
        <small>{currentSong.artist}</small>
      </div>

      <div className="player-controls">
        <button title="Previous">⏮️</button>
        <button title="Play/Pause">⏯️</button>
        <button title="Next">⏭️</button>
      </div>
    </div>
  );
}

export default MusicPlayer;
