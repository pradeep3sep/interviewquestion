// StarRating.js
import React, { useState } from 'react';
import './style.css';

const smileys = ['😢', '😞', '😐', '😀', '😎'];

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseOver = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  const getSmiley = () => {
    const index = Math.ceil((smileys.length * rating) / 5) - 1;
    return smileys[index] || '';
  };

  return (
    <div className="container text-center">
      <div className="star-container">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            className={`star ${i < (hoverIndex >= 0 ? hoverIndex : rating) ? 'star-filled' : 'star-empty'}`}
            onMouseOver={() => handleMouseOver(i + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i + 1)}
          />
        ))}
      </div>
      <div className="info">Click to set the rating</div>
      <div className="smiley-container">{getSmiley()}</div>
    </div>
  );
};

export default StarRating;
