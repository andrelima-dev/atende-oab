"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  maxRating?: number
}

export function StarRating({ rating, onRatingChange, maxRating = 5 }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none transition-colors"
            onClick={() => onRatingChange(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              className={`h-5 w-5 ${
                starValue <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
