import react from 'react';
import { Stars } from '../sharedComponents.jsx';

function ReviewsList({ reviews }) {
  return (<div>{
    reviews.map(review => {
      return <div key={review.review_id}>
        <Stars reviewsMeta={{ averageRating: review.rating }}/>
        {review.summary}
      </div>
    })
  }</div>);
};

export default ReviewsList;