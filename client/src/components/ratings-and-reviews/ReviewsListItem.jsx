import React, { useState } from 'react';
import { Stars, Modal, ButtonStyled, BodyText, ResponseText, Clickable } from '../sharedComponents.jsx';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FlexRow } from '../sharedComponents.jsx';
import utils from '../../Utils.js';
import { ScrollIntoView } from './Index.jsx';
import { PhotoGallery } from './PhotoGallery.jsx';

// const TextButton = styled.button`
//   border: none;
//   text-decoration: underline;
//   background: none;
//   font-size: 1em;
//   padding: 0;
//   margin: 0;
// `;

const ResponseBox = styled.div`
  background: #ddd;
  padding: 4px;
`;

function Response({ response }) {
  if (response) {
    return (
      <ResponseBox>
        <BodyText>Response:</BodyText>
        <ResponseText>{response}</ResponseText>
      </ResponseBox>
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
    <BodyText style={{ maxWidth: '600px' }}>
      {body}
      <Clickable onClick={() => setExpanded(!expanded)}>{buttonText}</Clickable>
    </BodyText>
  );
}

class ReviewsListItem extends React.Component {
  //() {
  constructor(props) {
    super(props);
    this.state = {
      helpful: 0,
      reported: false,
      reportConfirmation: false,
    };

    this.markHelpful = this.markHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
  }

  markHelpful() {
    this.setState({ helpful: 1 });
    utils.markReviewHelpful(this.props.review.review_id);
  }

  reportReview() {
    utils.markReviewReported(this.props.review.review_id);
    this.setState({ reported: true, reportConfirmation: false });
  }

  openReportModal(open) {
    this.setState({ reportConfirmation: open });
  }

  render() {
    const { review, setShowImage, forceScroll } = this.props;
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
          onDoneLoading={forceScroll}
          onClickThumbnail={setShowImage}
        />
        {review.recommend ? '✓ I recommend this product' : undefined}
        <Response response={review.response} />
        <FlexRow>
          <BodyText>
            Helpful?&nbsp;
            <Clickable disabled={this.state.helpful} onClick={this.markHelpful}>
              Yes
            </Clickable>
          </BodyText>
          &nbsp;({review.helpfulness + this.state.helpful})&nbsp;|&nbsp;
          {/* TODO: confirm report popup */}
          <Modal show={this.state.reportConfirmation} onClose={() => this.openReportModal(true)}>
            Are you sure you want to report this review?
            <ButtonStyled onClick={this.reportReview.bind(this)}>Yes</ButtonStyled> &nbsp;{' '}
            <ButtonStyled onClick={() => this.openReportModal(false)}>Cancel</ButtonStyled>
          </Modal>
          <Clickable
            disabled={this.state.reported}
            onClick={() => this.setState({ reportConfirmation: true })}
          >
            {this.state.reported ? 'Reported' : 'Report'}
          </Clickable>
        </FlexRow>
      </div>
    );
  }
}

export default ReviewsListItem;
