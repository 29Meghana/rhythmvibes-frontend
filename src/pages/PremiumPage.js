import React from 'react';
import '../App.css';
import axios from 'axios'; // make sure this is at the top

const handleUpgrade = async () => {
  console.log("Upgrade button clicked"); // Just to check if it's working

  try {
    const res = await axios.post('http://localhost:5000/api/payment/create-checkout-session');
    window.location.href = res.data.url; // Stripe checkout URL
  } catch (err) {
    alert('Payment error. Please try again.');
    console.error('Stripe Error:', err);
  }
};

function PremiumPage() {
  return (
    <div className="premium-wrapper">
      <div className="premium-box">
        <h2 className="premium-title">Upgrade to Premium ✨</h2>

        <p className="premium-subtext">
          Enjoy ad-free music, unlimited downloads, offline listening, and exclusive premium tracks.
        </p>

        <div className="benefits-list">
          <h3>Premium Benefits:</h3>
          <ul>
            <li>🎧 Ad-free listening experience</li>
            <li>⬇️ Unlimited downloads</li>
            <li>📲 Offline playback support</li>
            <li>🔥 Early access to new tracks</li>
          </ul>
        </div>

        <button className="premium-button" onClick={handleUpgrade}>
  Upgrade Now
</button>

      </div>
    </div>
  );
}

export default PremiumPage;
