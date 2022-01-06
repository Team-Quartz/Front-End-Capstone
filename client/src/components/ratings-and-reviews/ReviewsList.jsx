import { Modal } from '../sharedComponents.jsx';
import React, { useState } from 'react';
import ReviewsListItem from './ReviewsListItem.jsx';
import utils from '../../Utils.js';


function ReviewsList({ reviews, reviewPage, filters }) {
  const [showImage, setShowImage] = useState(null);
  const reviewRef = React.useRef();


  React.useEffect(() => {
    if (reviewPage > 1 && reviewRef.current) {
      utils.scrollIntoView(reviewRef);
    }
  }, [reviews]);

  function filterReviews(review) {
    return filters[0] || filters[review.rating];
  }

  if (reviews === null) {
    return <div>LOADING</div>;
  }

  return (
    <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
      {reviews.filter(filterReviews).map((review, i) => {
        return (
          <div ref={(i = reviews.length - 1 ? reviewRef : undefined)} key={review.review_id}>
            <ReviewsListItem setShowImage={setShowImage} review={review} reviewRef={reviewRef} />
          </div>
        );
      })}
      <Modal show={showImage} onClose={() => setShowImage(null)}>
        <img src={showImage} />
      </Modal>
    </div>
  );
}

export default ReviewsList;
