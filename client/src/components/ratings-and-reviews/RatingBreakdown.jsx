import react from 'react';
import styled from 'styled-components'

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items:stretch;
`;

const BarFrame = styled(FlexDiv)`
  flex-basis: 100%;
  flex-shrink: 100000;
  margin: 1% 0;
`;


function RatingBreakdown({ rating, count, total }) {
  let proportion;
  if (!count) {
    proportion = 0;
  } else {
    proportion = (total / count) * 10;
  }
  return (
    <FlexDiv>
      <div>{rating} stars</div>
      <BarFrame>
        <div
          style={{
            position: 'relative',
            backgroundColor: 'green',
            width: `${proportion}%`,
            height: '100%',
          }}
        ></div>
        <div
          style={{
            position: 'relative',
            backgroundColor: 'grey',
            width: `${100 - proportion}%`,
            height: '100%',
          }}
        ></div>
      </BarFrame>
    </FlexDiv>
  );
}

export default RatingBreakdown;
