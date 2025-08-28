"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  onRatingChange: (rating: number) => void
  initialRating?: number
  size?: "sm" | "md" | "lg"
}

export default function StarRating({ onRatingChange, initialRating = 0, size = "md" }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (value: number) => {
    setRating(value)
    onRatingChange(value)
  }

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={cn("transition-all duration-200 hover:scale-110", sizeClasses[size])}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={cn(
              "transition-colors duration-200",
              sizeClasses[size],
              hoverRating >= star || rating >= star
                ? "fill-accent text-accent"
                : "text-muted-foreground hover:text-accent",
            )}
          />
        </button>
      ))}
    </div>
  )
}
