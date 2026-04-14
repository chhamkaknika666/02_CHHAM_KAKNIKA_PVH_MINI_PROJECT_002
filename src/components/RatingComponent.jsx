"use client";

import { useState, useEffect } from "react";

export default function RatingComponent({ productId }) {
  const storageKey = `rating_${productId}`;
  const [rating,   setRating]   = useState(0);
  const [hovered,  setHovered]  = useState(0);
  const [total,    setTotal]    = useState(0);

  useEffect(() => {
    if (!productId) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { rating: r, total: t } = JSON.parse(saved);
        setRating(r);
        setTotal(t);
      }
    } catch {}
  }, [productId, storageKey]);

  const handleRate = (star) => {
    const newTotal = total === 0 ? 1 : rating === 0 ? total + 1 : total;
    setRating(star);
    setTotal(newTotal);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ rating: star, total: newTotal })
      );
    } catch {}
  };

  const display = hovered || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-xl leading-none transition-transform hover:scale-110"
          aria-label={`Rate ${star} star`}
        >
          <span
            style={{
              color: star <= display ? "#facc15" : "#d1d5db",
              transition: "color 0.15s",
            }}
          >
            ★
          </span>
        </button>
      ))}
      {total > 0 && (
        <span className="text-sm text-gray-400 ml-1">{total}</span>
      )}
    </div>
  );
}