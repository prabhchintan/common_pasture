import React from 'react';
import './Description.css';

export default function Description() {
  return (
    <div className="description">
      <h1>Welcome to the Common Pasture Game!</h1>
      <p>In this game, you are a sheep farmer sharing a common pasture with your neighbor.</p>
      <p>Each day, you can choose to graze your sheep at your own farm or at the common pasture.</p>
      <p>If you both choose to graze at your own farms, both of you will be happier by 10 happiness points as the pasture will have time to regrow.</p>
      <p>If you choose to graze at your farm but your neighbor chooses to graze at the pasture, your happiness decreases by 1 point and your neighbor's happiness increases by 11 points as they get the benefit of your responsible choice.</p>
      <p>If you both choose to graze at the pasture, neither of you gain any happiness points as the pasture will be overgrazed and will need time to recover.</p>
      <p>And finally, if you choose to graze at the pasture but your neighbor chooses to graze at their farm, your happiness increases by 11 points but your neighbor's happiness decreases by 1 point as you get the benefit of their responsible choice.</p>
      <p>The game lasts for 5 days. Make your choices wisely!</p>
    </div>
  );
}
