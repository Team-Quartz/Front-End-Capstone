import { Modal, BodyText } from '../sharedComponents.jsx';
import React, { useState } from 'react';
import ReviewsListItem from './ReviewsListItem.jsx';
import utils from '../../Utils.js';
import {ConstrainedImg} from './PhotoGallery.jsx'


function ReviewsList({ reviews, reviewPage, filters }) {
  const [showImage, setShowImage] = useState(null);
  const reviewRef = React.useRef();


  function forceScroll() {
    if (reviewPage > 1) {
      utils.scrollIntoView(reviewRef);
    }
  }

  React.useEffect(() => {
    if (reviewRef.current) {
      forceScroll();
    }
  }, [reviews]);

  function filterReviews(review) {
    return filters[0] || filters[review.rating];
  }

  if (reviews === null) {
    return <BodyText>LOADING</BodyText>;
  }

  return (
    <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
      {reviews.filter(filterReviews).map((review, i) => {
        return (
          <div ref={(i = reviews.length - 1 ? reviewRef : undefined)} key={review.review_id}>
            <ReviewsListItem setShowImage={setShowImage} review={review} forceScroll={forceScroll} />
          </div>
        );
      })}
      <Modal show={showImage} onClose={() => setShowImage(null)}>
        <ConstrainedImg src={showImage} />
      </Modal>
    </div>
  );
}

export default ReviewsList;
