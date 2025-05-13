import React, { useEffect, useState } from 'react';
import '../App.css';

function MusicPlayer({ currentSong, isPlaying, onPlayPause, audioRef }) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

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
    if (!time) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!currentSong) return null;

  return (
    <div className="now-playing-bar">
      <audio ref={audioRef} src={currentSong.audio} autoPlay />

      <div className="now-playing-info">
        <img
          className="now-playing-thumb"
          src={currentSong.image || '/images/default.jpg'}
          alt={currentSong.title}
        />
        <div>
          <strong>{currentSong.title}</strong>
          <small style={{ display: 'block' }}>{currentSong.artist}</small>
        </div>
      </div>

      <div className="player-controls">
        <button onClick={onPlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <div className="progress-bar">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
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
    </div>
  );
}

export default MusicPlayer;
