import react from 'react';

function ReviewsList({ reviews }) {
  return (<div>{
    reviews.map(review => {
      return <div key={review.review_id}>{review.summary}</div>
    })
  }</div>);
};

export default ReviewsList;