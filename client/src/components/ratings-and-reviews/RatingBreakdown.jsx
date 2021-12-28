import react from 'react';
import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const BarFrame = styled(FlexDiv)`
  flex-basis: 100%;
  flex-shrink: 100000;
  margin: 1% 0;
`;

const Bar = styled.div`
  position: relative;
  height: 100%;
  width: ${(props) => (props.background ? 100 - props.proportion : props.proportion)}%;
  background-color: ${(props) => (props.background ? 'LightGrey' : 'SpringGreen')};
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
        <Bar proportion={proportion} background={false} />
        <Bar proportion={proportion} background={true} />
      </BarFrame>
    </FlexDiv>
  );
}

export default RatingBreakdown;
