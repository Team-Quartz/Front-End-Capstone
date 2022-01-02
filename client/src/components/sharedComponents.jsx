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
        <StarImg src='./img/stars.png' amount={Math.max(0, Math.min(4, ratingClipped - i))} />
      </StarBounds>
    );
  }
  return <FlexRow>{stars}</FlexRow>;
};


const ModalMain = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  position: fixed;
  width: auto;
  height: auto;
  background: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
`;

export function Modal({ show, onClose, children }) {
  if (show) {
    return (
      <ModalMain>
        <ModalBody>
          <button onClick={onClose}>X</button>
          {children}
        </ModalBody>
      </ModalMain>
    );
  }
  return '';
}
