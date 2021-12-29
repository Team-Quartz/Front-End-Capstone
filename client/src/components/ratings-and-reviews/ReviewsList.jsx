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

function renderResponse(response) {
  if (response) {
    return (
      <div>
        Response:
        <div>{response}</div>
      </div>
    )
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
            <div>{review.body}</div>
            {review.recommend ? 'I recommend this product' : undefined}
            {renderResponse(review.response)}
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
