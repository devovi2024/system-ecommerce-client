import React from "react";

const RatingStars = ({ rating, size = 24 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={i <= Math.floor(rating) ? "gold" : "none"}
        stroke="gold"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="inline-block"
      >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
      </svg>
    );
  }

  return <div>{stars}</div>;
};

export default RatingStars;
