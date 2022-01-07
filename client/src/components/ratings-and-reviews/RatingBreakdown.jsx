import react from 'react';
import styled from 'styled-components';
import { FlexRow } from '../sharedComponents.jsx';

const FlexCenter = styled(FlexRow)`
  align-items: center;
  &:hover .hover {
    box-shadow: 0 0 8px 0 rgb(0, 0, 0, .2);
  }
  background-color: ${(props) => props.filtered? 'LightBlue' : 'white'}
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

function RatingBreakdown({ rating, count, total, toggleFilter, filter }) {
  let proportion;
  if (!total) {
    proportion = 0;
  } else {
    proportion = (count / total) * 100;
  }
  return (
    <FlexCenter onClick={() => toggleFilter(rating)} filtered={filter}>
      <div>{rating} stars</div>
      <BarBackground className='hover'>
        <Bar proportion={proportion}/>
      </BarBackground>
    </FlexCenter>
  );
}

export default RatingBreakdown;
