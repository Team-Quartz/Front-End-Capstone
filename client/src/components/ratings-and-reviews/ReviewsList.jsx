import React, { useState } from 'react';
import { Stars, Modal } from '../sharedComponents.jsx';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FlexRow } from '../sharedComponents.jsx';

const TextButton = styled.button`
  border: none;
  text-decoration: underline;
  background: none;
  font-size: 1em;
  padding: 0;
  margin: 0;
`;

const ImageThumbnail = styled.img`
  width: 5em;
  height: auto;
  max-height: 10em;
`;

function Response({ response }) {
  if (response) {
    return (
      <div>
        Response:
        <div>{response}</div>
      </div>
    );
  }
  return '';
}

function PhotoGallery({ photos, onDoneLoading, onClickThumbnail }) {
  if (photos) {
    return (
      <div>
        {photos.map((photo) => (
          //TODO: on click, open photo in window
          <ImageThumbnail
            src={photo.url}
            key={photo.id}
            onLoad={onDoneLoading}
            onError={onDoneLoading}
            onClick={() => onClickThumbnail(photo.url)}
          />
        ))}
      </div>
    );
  }
  return '';
}

function ReviewBody(props) {
  const [expanded, setExpanded] = useState(false);

  let body = props.body;
  if (body.length < 250) {
    return <div>{body}</div>;
  }

  let buttonText = 'hide';
  if (!expanded) {
    buttonText = 'show more';
    const splitIndex = body.lastIndexOf(' ', 250);
    if (splitIndex >= 0) {
      body = `${body.substring(0, splitIndex)}...`;
    } else {
      body = body.substring(0, 250);
    }
  }
  return (
    <div style={{ maxWidth: '600px' }}>
      {body}
      <TextButton onClick={() => setExpanded(!expanded)}>{buttonText}</TextButton>
    </div>
  );
}

function ReviewsList({ reviews, scrollIntoView }) {
  const [showImage, setShowImage] = useState(null);
  const reviewRef = React.useRef();

  React.useEffect(() => {
    if (reviewRef.current) {
      scrollIntoView(reviewRef);
    }
  }, [reviews]);

  if (reviews === null) {
    return <div>LOADING</div>;
  }

  return (
    <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
      {reviews.map((review, i) => {
        return (
          <div key={review.review_id} ref={(i = reviews.length - 1 ? reviewRef : undefined)}>
            <FlexRow style={{ justifyContent: 'space-between' }}>
              <Stars reviewsMeta={{ averageRating: review.rating }} />
              <div>
                {`${review.reviewer_name}, `}
                {dayjs(review.date).format('MMMM DD, YYYY')}
              </div>
            </FlexRow>
            <h3>{review.summary}</h3>
            <ReviewBody body={review.body} />
            <PhotoGallery
              photos={review.photos}
              onDoneLoading={() => scrollIntoView(reviewRef)}
              onClickThumbnail={setShowImage}
            />
            {review.recommend ? '✓ I recommend this product' : undefined}
            <Response response={review.response} />
            <FlexRow>
              Helpful?&nbsp;
              <TextButton>Yes</TextButton>
              &nbsp;({review.helpfulness})&nbsp;|&nbsp;
              <TextButton>Report</TextButton>
            </FlexRow>
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
