import React, { useState } from 'react';
import './style.css';

const StarRatingSlide = () => {
  const starCount = 5;
  const initialValue = 2.3;
  const [rating, setRating] = useState(initialValue);

  const handleRangeInput = (e) => {
    setRating(+e.target.value);
  };

  const renderStars = () => {
    return Array.from({ length: starCount }, (_, i) => {
      const isFilled = i < Math.floor(rating);
      const isPartial = i === Math.floor(rating) && rating % 1 !== 0;
      const partialWidth = `${((rating % 1) * 100).toFixed(2)}%`;

      return (
        <span key={i} className={`star ${isFilled ? 'star-filled' : ''}`}>
          ☆
          {isPartial && (
            <span
              className="star-partial"
              style={{ width: partialWidth }}
            >
              ★
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="container text-center">
      <div id="starContainer" className="star-container">
        {renderStars()}
      </div>
      <output id="starRating">{rating}</output>
      <div>
        <input
          type="range"
          id="range"
          min="0"
          max={starCount}
          step="0.1"
          value={rating}
          onChange={handleRangeInput}
        />
      </div>
    </div>
  );
};

export default StarRatingSlide;
