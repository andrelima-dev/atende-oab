"use client";

import { useState, useEffect } from "react";

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
  initialRating?: number;
  size?: "sm" | "md" | "lg";
}

const StarIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

export default function StarRating({
  onRatingChange,
  initialRating = 0,
  size = "md",
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  // Sincroniza quando initialRating mudar no componente pai
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (value: number) => {
    setRating(value);
    onRatingChange(value); // Notifica o componente pai
  };

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`transition-all duration-200 hover:scale-110 ${sizeClasses[size]}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <StarIcon
            className={`transition-colors duration-200 ${sizeClasses[size]} ${
              hoverRating >= star || rating >= star
                ? "text-yellow-400"
                : "text-gray-400 hover:text-yellow-400"
            }`}
            filled={hoverRating >= star || rating >= star}
          />
        </button>
      ))}
    </div>
  );
}
