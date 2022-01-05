import react from 'react';
import styled from 'styled-components';
import { FlexRow } from '../sharedComponents.jsx';

const FlexCenter = styled(FlexRow)`
  align-items: center;
`;

const BarBackground = styled(FlexRow)`
  flex: 1;
  margin: 0;
  height: .5em;
  background-color: LightGrey;
`;

const Bar = styled.div`
  position: relative;
  height: 100%;
  width: ${(props) => (props.proportion)}%;
  background-color: MediumAquaMarine;
`;

function RatingBreakdown({ rating, count, total, toggleFilter }) {
  let proportion;
  if (!total) {
    proportion = 0;
  } else {
    proportion = (count / total) * 100;
  }
  return (
    <FlexCenter onClick={() => toggleFilter(rating)}>
      <div>{rating} stars</div>
      <BarBackground>
        <Bar proportion={proportion}/>
      </BarBackground>
    </FlexCenter>
  );
}

export default RatingBreakdown;
