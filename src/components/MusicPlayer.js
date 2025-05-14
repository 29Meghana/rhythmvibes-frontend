import React, { useEffect, useState } from 'react';
import '../App.css';

function MusicPlayer({ currentSong, isPlaying, onPlayPause, audioRef }) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [currentSong, audioRef]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!currentSong) return null;

  return (
    <div className="now-playing-bar">
      <audio ref={audioRef} src={currentSong.audio} autoPlay />

      {/* Left Section */}
      <div className="now-playing-left">
        <img
          src={currentSong.image || '/images/default.jpg'}
          alt={currentSong.title}
          className="now-playing-thumb"
        />
        <div className="now-playing-details">
          <strong>{currentSong.title}</strong>
          <small>{currentSong.artist}</small>
        </div>
      </div>

      {/* Center Section */}
      <div className="now-playing-center">
        <div className="player-controls">
          <button title="Previous" disabled>⏮️</button>
          <button onClick={onPlayPause} title="Play/Pause">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button title="Next" disabled>⏭️</button>
        </div>
        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            className="progress-bar"
            value={progress}
            max={duration || 0}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              setProgress(e.target.value);
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="now-playing-right">
        <span className="device-indicator">🎧 RhythmVibes</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
