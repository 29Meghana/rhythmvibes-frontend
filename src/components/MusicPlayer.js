import React from 'react';
import '../App.css';


function MusicPlayer() {
  return (
    <div className="music-player">
  <div className="controls">
    <button>⏮️</button>
    <button>⏯️</button>
    <button>⏭️</button>
  </div>
  <div className="now-playing">
    Now Playing: <strong>Sample Song Name</strong>
  </div>
</div>
  );
}

export default MusicPlayer;
