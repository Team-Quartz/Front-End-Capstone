import React from 'react';
import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`;
export const rootStyle = `
font-family: Arial, sans-serif;
margin: 4px;
`;

export const AppStyle = styled.div`
  ${rootStyle}
  * {
    margin: inherit;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StarBounds = styled.div`
  width: 1em;
  height: 1em;
  overflow: hidden;
  position: relative;
  margin: 0;
`;
const StarBoundsButton = styled(StarBounds)`
  &:hover {
    cursor: pointer;
  }
`;

const StarImg = styled.img`
  position: absolute;
  top: 0;
  left: -${({ amount }) => amount}em;
  height: 1em;
  width: 5em;
`;

function WrapStarBounds({ clickStar, i, children }) {
  if (clickStar) {
    return <StarBoundsButton onClick={() => clickStar(i)}>{children}</StarBoundsButton>;
  }
  return <StarBounds>{children}</StarBounds>;
}

/**
 *
 * @param {{reviewsMeta: { averageRating: number }, clickStar: function}}} props
 * @param props.reviewsMeta.averageRating value (from 1 to 5, inclusive) for the stars to display
 * @param props.clickStar callback to execute on clicking a star, passes the index of the star that was clicked
 * @returns react component to render
 */
export const Stars = ({ reviewsMeta, clickStar }) => {
  //TODO: test for different returns based on clickStar value
  const ratingClipped = Math.floor(reviewsMeta.averageRating * 4);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <WrapStarBounds key={i} i={i} clickStar={clickStar}>
        <StarImg src='./img/stars.png' amount={Math.max(0, Math.min(4, ratingClipped - i * 4))} />
      </WrapStarBounds>
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
  z-index: 100;
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
    //TODO: test returns for different values of show, test that onClose is properly working
    return (
      <ModalBackground onClick={onClose}>
        <ModalBody onClick={(e) => e.stopPropagation()}>
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
