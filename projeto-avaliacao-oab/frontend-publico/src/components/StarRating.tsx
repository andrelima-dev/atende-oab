// src/components/StarRating.tsx
import { useState } from 'react';
import './StarRating.css';

// TypeScript: Definindo os tipos das props que o componente vai receber
type StarRatingProps = {
  onRatingChange: (rating: number) => void;
};

const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    onRatingChange(ratingValue);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            className={ratingValue <= (hover || rating) ? "on" : "off"}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;