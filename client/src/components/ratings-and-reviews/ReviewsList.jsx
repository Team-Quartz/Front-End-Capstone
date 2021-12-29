import react from 'react';
import { Stars } from '../sharedComponents.jsx';
import styled from 'styled-components';
import dayjs from 'dayjs';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const SpreadRow = styled(FlexRow)`
  justify-content: space-between;
`;

const TextButton = styled.button`
  border: none;
  text-decoration: underline;
  background: none;
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

function PhotoGallery({ photos }) {
  if (photos) {
    return (
      <div>
        {photos.map((photo) => (
          //TODO: on click, open photo in window
          <img src={photo.url} key={photo.id} />
        ))}
      </div>
    );
  }
  return '';
}

class Body extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  render() {
    let body = this.props.body;
    if (body.length < 250) {
      return <div>{body}</div>;
    }

    let buttonText = 'hide';
    if (!this.state.expanded) {
      buttonText = 'show more';
      const splitIndex = body.lastIndexOf(' ', 250);
      if (splitIndex >= 0) {
        body = `${body.substring(0, splitIndex)}...`;
      } else {
        body = body.substring(0, 250);
      }
    }
    return (
      <div>
        {body}
        <TextButton onClick={() => this.setState({ expanded: !this.state.expanded })}>
          {buttonText}
        </TextButton>
      </div>
    );
  }
}

function ReviewsList({ reviews }) {
  return (
    <div>
      {reviews.map((review) => {
        return (
          <div key={review.review_id}>
            <SpreadRow>
              <Stars reviewsMeta={{ averageRating: review.rating }} />
              <div>
                {`${review.reviewer_name}, `}
                {dayjs(review.date).format('MMMM DD, YYYY')}
              </div>
            </SpreadRow>
            <h3>{review.summary}</h3>
            <Body body={review.body} />
            <PhotoGallery photos={review.photos} />
            {review.recommend ? 'I recommend this product' : undefined}
            <Response response={review.response} />
            <FlexRow>
              Helpful?
              <TextButton>Yes</TextButton>
              {`(${review.helpfulness}) | `}
              <TextButton>Report</TextButton>
            </FlexRow>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewsList;
