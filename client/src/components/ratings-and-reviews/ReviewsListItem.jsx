import React, { useState } from 'react';
import { Stars, Modal } from '../sharedComponents.jsx';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FlexRow } from '../sharedComponents.jsx';
import utils from '../../Utils.js';
import { ScrollIntoView } from './Index.jsx';

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
  &:hover {
    transform: scale(110%);
  }
`;

const ResponseBox = styled.div`
  background: #ddd;
  padding: 4px;
`;

function Response({ response }) {
  if (response) {
    return (
      <ResponseBox>
        Response:
        <div>{response}</div>
      </ResponseBox>
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

class ReviewsListItem extends React.Component {
  //() {
  constructor(props) {
    super(props);
    this.state = {
      helpful: 0,
      reported: false,
    };

    this.markHelpful = this.markHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
  }

  markHelpful() {
    this.setState({ helpful: 1 });
    utils.markReviewHelpful(this.props.review.review_id);
  }

  reportReview() {
    this.setState({ reported: true });
    utils.markReviewReported(this.props.review.review_id);
  }

  render() {
    const { review, setShowImage, reviewRef } = this.props;
    return (
      <div>
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
          onDoneLoading={() => utils.scrollIntoView(reviewRef)}
          onClickThumbnail={setShowImage}
        />
        {review.recommend ? '✓ I recommend this product' : undefined}
        <Response response={review.response} />
        <FlexRow>
          Helpful?&nbsp;
          <TextButton disabled={this.state.helpful} onClick={this.markHelpful}>
            Yes
          </TextButton>
          &nbsp;({review.helpfulness + this.state.helpful})&nbsp;|&nbsp;
          {/* TODO: confirm report popup */}
          <TextButton disabled={this.state.reported} onClick={this.reportReview}>Report</TextButton>
        </FlexRow>
      </div>
    );
  }
}

export default ReviewsListItem;
