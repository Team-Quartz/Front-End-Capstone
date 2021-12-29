import react from 'react';

export const Stars = ({ reviewsMeta }) => {
  const ratingClipped = Math.floor(reviewsMeta.averageRating * 4) / 4;
  return <div>{ratingClipped}</div>;
};
