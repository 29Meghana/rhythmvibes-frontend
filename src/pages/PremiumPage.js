import React from 'react';
import '../App.css';

function PremiumPage() {
  return (
    <div className="premium-page" style={{ padding: '50px 20px', minHeight: '100vh' }}>
      <h2 className="section-title">Upgrade to Premium ✨</h2>
      <p style={{ color: '#ccc', maxWidth: '600px' }}>
        Enjoy ad-free music, unlimited downloads, offline listening, and exclusive premium tracks.
      </p>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: 'gold' }}>Premium Benefits:</h3>
        <ul style={{ color: 'white', lineHeight: '1.8' }}>
          <li>🎧 Ad-free listening experience</li>
          <li>⬇️ Unlimited downloads</li>
          <li>📲 Offline playback support</li>
          <li>🔥 Early access to new tracks</li>
        </ul>

        <button style={{
          marginTop: '20px',
          padding: '12px 30px',
          fontSize: '18px',
          backgroundColor: '#ff80ab',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

export default PremiumPage;
