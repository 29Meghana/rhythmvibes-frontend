import React from 'react';
import '../App.css';

// Dummy data for music categories (can be replaced later with dynamic content from backend)
const musicCategories = [
  {
    name: "Rock n Roll",
    songs: [
      { title: "Song 1", image: "path/to/rock1.jpg" },
      { title: "Song 2", image: "path/to/rock2.jpg" },
      { title: "Song 3", image: "path/to/rock3.jpg" },
    ]
  },
  {
    name: "Hip Hop",
    songs: [
      { title: "Song 1", image: "path/to/hiphop1.jpg" },
      { title: "Song 2", image: "path/to/hiphop2.jpg" },
      { title: "Song 3", image: "path/to/hiphop3.jpg" },
    ]
  },
  {
    name: "Love Romantic Songs",
    songs: [
      { title: "Song 1", image: "path/to/love1.jpg" },
      { title: "Song 2", image: "path/to/love2.jpg" },
      { title: "Song 3", image: "path/to/love3.jpg" },
    ]
  },
  {
    name: "Sad Songs",
    songs: [
      { title: "Song 1", image: "path/to/sad1.jpg" },
      { title: "Song 2", image: "path/to/sad2.jpg" },
      { title: "Song 3", image: "path/to/sad3.jpg" },
    ]
  }
];
function HomePage() {
    return (
      <div className="home-page">
        {/* Music Categories */}
        <div className="categories">
          {musicCategories.map((category, index) => (
            <div key={index} className="category">
              <h2>{category.name}</h2>
              <div className="song-list">
                {category.songs.map((song, idx) => (
                  <div key={idx} className="song-card">
                    <img src={song.image} alt={song.title} className="song-image" />
                    <p>{song.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default HomePage;
