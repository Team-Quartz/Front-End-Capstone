import react from 'react';
import { Stars } from '../sharedComponents.jsx';
import styled from 'styled-components';

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

function ReviewsList({ reviews }) {
  return (
    <div>
      {reviews.map((review) => {
        return (
          <div key={review.review_id}>
            <SpreadRow>
              <Stars reviewsMeta={{ averageRating: review.rating }} />
              <div>
                {review.reviewer_name},{review.date}
              </div>
            </SpreadRow>
            <h3>{review.summary}</h3>
            <div>{review.body}</div>
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
