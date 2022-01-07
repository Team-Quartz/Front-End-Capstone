import React from "react";
import styled from "styled-components";

export const commonStyle = `
  border-radius: 8px;
  box-shadow: 0 0 8px 0 #00000066;
`;

export const ButtonStyled = styled.button`
  transition-duration: .2s;
  padding: 8px;
  border-radius: 5px;
  background-color: #fefefe;
  box-shadow: -2px -3px 6px 0 inset #00000015;
  border: 1px solid DarkGrey;
  &:hover {
    transition-duration: .1s;
    box-shadow: -3px -5px 12px 0 inset #6e6eff5d,
                1px 2px 8px 0 #00000040;
    background-color: #f6f8ff;
  }
  &:active {
    transition-duration: .05s;
    box-shadow: 2px 3px 12px 0 inset #34348e7d;

  }
`;

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  position: relative;
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
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  margin: 0;
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
  margin: 4px;
`;

const ButtonCloseModal = styled(ButtonStyled)`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 2em;
  width: 2em;
`


/**
 *
 * @param {{ show: boolean, onClose: function }} props react props.
 * @param props.show boolean state, whether or not modal should be displayed.
 * @param props.onClose callback to be run when modal closes, this should change the 'show' state
 * @returns
 */
export function Modal({ show, onClose, children }) {
  const [lastTarget, setLastTarget] = React.useState(null);
  function escListener(e) {
    if (show) {
      if (e.key === "Escape") {
        onClose();
      }
    }
  }
  function onClickBackground(e) {
    if (e.target === lastTarget) {
      onClose();
    }
  }
  React.useEffect(() => {
    window.addEventListener("keydown", escListener);
    return () => {
      window.removeEventListener("keydown", escListener);
    };
  });
  if (show) {
    //TODO: block scrolling of main app, block non-mouse input switching (EG tab) from focusing inputs outside the modal window
    //TODO: test returns for different values of show, test that onClose is properly working
    return (
      <ModalBackground onMouseDown={(e) => setLastTarget(e.target)} onClick={onClickBackground}>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          <ButtonCloseModal onClick={onClose} onKeyDown={(e) => onEsc(e, onClose)}>
          </ButtonCloseModal>
          {children}
        </ModalBody>
      </ModalBackground>
    );
  }
  return "";
}

