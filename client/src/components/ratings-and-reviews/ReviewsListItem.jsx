import React, { useState } from 'react';
import {
  Stars,
  Modal,
  ButtonStyled,
  BodyText,
  ResponseText,
  Clickable,
  Feedback,
  Details,
} from '../sharedComponents.jsx';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FlexRow } from '../sharedComponents.jsx';
import utils from '../../Utils.js';
import { ScrollIntoView } from './Index.jsx';
import { PhotoGallery } from './PhotoGallery.jsx';

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
    return <ResponseText>{body}</ResponseText>;
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
    <ResponseText style={{ maxWidth: '600px' }}>
      {body}
      <Clickable onClick={() => setExpanded(!expanded)}>{buttonText}</Clickable>
    </ResponseText>
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
        <FlexRow style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Stars reviewsMeta={{ averageRating: review.rating }} />
          <Feedback>
            <FlexRow>
              <b>
                Helpful?&nbsp;
                <Clickable disabled={!!this.state.helpful} onClick={this.markHelpful}>
                  Yes
                </Clickable>
              </b>
              &nbsp;({review.helpfulness + this.state.helpful})&nbsp;|&nbsp;
              <Modal
                show={this.state.reportConfirmation}
                onClose={() => this.openReportModal(true)}
              >
                Are you sure you want to report this review?
                <ButtonStyled onClick={this.reportReview.bind(this)}>Yes</ButtonStyled> &nbsp;{' '}
                <ButtonStyled onClick={() => this.openReportModal(false)}>Cancel</ButtonStyled>
              </Modal>
              <Clickable
                disabled={!!this.state.reported}
                onClick={() => this.setState({ reportConfirmation: true })}
              >
                {this.state.reported ? 'Reported' : 'Report'}
              </Clickable>
            </FlexRow>
          </Feedback>
        </FlexRow>
        <BodyText>{review.summary}</BodyText>
        <ReviewBody body={review.body} />
        <PhotoGallery
          photos={review.photos}
          onDoneLoading={forceScroll}
          onClickThumbnail={setShowImage}
        />

        <Details>
          by {`${review.reviewer_name}, `}
          {dayjs(review.date).format('MMMM DD, YYYY')}
        </Details>
        <ResponseText>{review.recommend ? '✓ I recommend this product' : undefined}</ResponseText>
        <Response response={review.response} />
      </div>
    );
  }
}

export default ReviewsListItem;
