import react from 'react';
import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const BarBackground = styled(FlexDiv)`
  flex-basis: 100%;
  flex-shrink: 100000;
  margin: 1% 0;
  background-color: LightGrey;
`;

const Bar = styled.div`
  position: relative;
  height: 100%;
  width: ${(props) => (props.proportion)}%;
  background-color: MediumAquaMarine;
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
      <BarBackground>
        <Bar proportion={proportion}/>
      </BarBackground>
    </FlexDiv>
  );
}

export default RatingBreakdown;
