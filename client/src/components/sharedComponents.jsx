import React from 'react';
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

const ModalBackground = styled.div`
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

function onEsc(e, cb) {}

/**
 *
 * @param {{ show: boolean, onClose: function }} props react props.
 * @param props.show boolean state, whether or not modal should be displayed.
 * @param props.onClose callback to be run when modal closes, this should change the 'show' state
 * @returns
 */
export function Modal({ show, onClose, children }) {
  function escListener(e) {
    if (show) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', escListener);
    return () => {
      window.removeEventListener('keydown', escListener);
    };
  });
  if (show) {
    //TODO: block scrolling of main app, block non-mouse input switching (EG tab) from focusing inputs outside the modal window
    return (
      <ModalBackground>
        <ModalBody>
          <button onClick={onClose} onKeyDown={(e) => onEsc(e, onClose)}>
            X
          </button>
          {children}
        </ModalBody>
      </ModalBackground>
    );
  }
  return '';
}
