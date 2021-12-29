import react from 'react';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StarBounds = styled.div`
  width: 1em;
  height: 1em;
  overflow: hidden;
  position: relative;
`;

const StarImg = styled.img`
  position: absolute;
  top: 0;
  left: -${({ amount }) => amount}em;
  height: 1em;
  width: 5em;
`;

export const Stars = ({ reviewsMeta }) => {
  const ratingClipped = Math.floor(reviewsMeta.averageRating * 4);
  const stars = [];
  for (let i = 0; i < 20; i += 4) {
    stars.push(
      <StarBounds key={i}>
        <StarImg src='./img/stars.png' amount={Math.max(0, Math.min(4, ratingClipped - i))}/>
      </StarBounds>
    );
  }
  return <FlexRow>{stars}</FlexRow>;
};
